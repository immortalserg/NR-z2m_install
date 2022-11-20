module.exports = {
// создать пароль node-red admin hash-pw
    flowFile: 'flows.json',
    flowFilePretty: true,
    adminAuth: {
        type: "credentials",
        users: [{
            username: "admin",
            password: "$2b$08$I48A8LbtIdDs.dFKCzwb/uSLDJqS1N7ZiyEb0mgUdF5nOuyBEJcf6",
            permissions: "*"
        }]
    },
    httpNodeAuth: {user:"user",pass:"$2b$08$I48A8LbtIdDs.dFKCzwb/uSLDJqS1N7ZiyEb0mgUdF5nOuyBEJcf6"},
    //httpStaticAuth: {user:"user",pass:"$2a$08$zZWtXTja0fB1pzD4sHCMyOCMYz2Z6dNbM6tl8sJogENOMcxWV9DN."},

    uiPort: process.env.PORT || 1880,
    //uiHost: "127.0.0.1",
    //apiMaxLength: '5mb',
    //httpServerOptions: { },
    //httpAdminRoot: '/admin',
    // httpAdminMiddleware: function(req,res,next) {
    //    // Set the X-Frame-Options header to limit where the editor
    //    // can be embedded
    //    //res.set('X-Frame-Options', 'sameorigin');
    //    next();
    // },
    //httpNodeRoot: '/red-nodes',
    //httpNodeCors: {
    //    origin: "*",
    //    methods: "GET,PUT,POST,DELETE"
    //},
    //httpNodeMiddleware: function(req,res,next) {
    //    // Handle/reject the request, or pass it on to the http in node by calling next();
    //    // Optionally skip our rawBodyParser by setting this to true;
    //    //req.skipRawBodyParser = true;
    //    next();
    //},
    //httpStatic: '/home/nol/node-red-static/',
     // lang: "de",

     logging: {
         /** Only console logging is currently supported */
         console: {
             /** Level of logging to be recorded. Options are:
              * fatal - only those errors which make the application unusable should be recorded
              * error - record errors which are deemed fatal for a particular request + fatal errors
              * warn - record problems which are non fatal + errors + fatal errors
              * info - record information about the general running of the application + warn + error + fatal errors
              * debug - record information which is more verbose than info + info + warn + error + fatal errors
              * trace - record very detailed logging + debug + info + warn + error + fatal errors
              * off - turn off all logging (doesn't affect metrics or audit)
              */
             level: "info",
             metrics: false,
             audit: false
         }
     },
    contextStorage: {
	default: "memoryOnly",
	memoryOnly: { module: 'memory' },
	file: { module: 'localfilesystem' }
    },
     exportGlobalContextKeys: false,
     externalModules: {
         // autoInstall: false,   /** Whether the runtime will attempt to automatically install missing modules */
         // autoInstallRetry: 30, /** Interval, in seconds, between reinstall attempts */
         // palette: {              /** Configuration for the Palette Manager */
         //     allowInstall: true, /** Enable the Palette Manager in the editor */
         //     allowUpload: true,  /** Allow module tgz files to be uploaded and installed */
         //     allowList: [],
         //     denyList: []
         // },
         // modules: {              /** Configuration for node-specified modules */
         //     allowInstall: true,
         //     allowList: [],
         //     denyList: []
         // }
     },
    //disableEditor: false,
    editorTheme: {
        //theme: "",
        palette: {
            //categories: ['subflows', 'common', 'function', 'network', 'sequence', 'parser', 'storage'],
        },
        projects: {
            enabled: false,
            workflow: {
                mode: "manual"
            }
        },
        codeEditor: {
            lib: "ace",
            options: {
                theme: "vs",
                //fontSize: 14,
                //fontFamily: "Cascadia Code, Fira Code, Consolas, 'Courier New', monospace",
                //fontLigatures: true,
            }
        }
    },
    functionExternalModules: true,
    functionGlobalContext: {
        // os:require('os'),
    },
    //nodeMessageBufferMaxLength: 0,
    //ui: { path: "ui" },
    //debugUseColors: true,
    debugMaxLength: 1000,
    //execMaxBufferSize: 10000000,
    //httpRequestTimeout: 120000,
    mqttReconnectTime: 15000,
    serialReconnectTime: 15000,
    //socketReconnectTime: 10000,
    //socketTimeout: 120000,
    //tcpMsgQueueSize: 2000,
    //inboundWebSocketTimeout: 5000,
    //tlsConfigDisableLocalFiles: true,
    //webSocketNodeVerifyClient: function(info) {
    //    /** 'info' has three properties:
    //    *   - origin : the value in the Origin header
    //    *   - req : the HTTP request
    //    *   - secure : true if req.connection.authorized or req.connection.encrypted is set
    //    *
    //    * The function should return true if the connection should be accepted, false otherwise.
    //    *
    //    * Alternatively, if this function is defined to accept a second argument, callback,
    //    * it can be used to verify the client asynchronously.
    //    * The callback takes three arguments:
    //    *   - result : boolean, whether to accept the connection or not
    //    *   - code : if result is false, the HTTP error status to return
    //    *   - reason: if result is false, the HTTP reason string to return
    //    */
    //},
}
