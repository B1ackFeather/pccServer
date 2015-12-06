var log4js = require('log4js');  
log4js.configure({  
    appenders: [  
        {  
            type: 'console',  
            category: "console"  
        }, //控制台输出  
        {  
            category:"log_file",  
            type: "file",  
            filename: "logs/access.log",  
            maxLogSize: 104800,  
            backups: 100  
        },
        {  
            type: "dateFile",  
            filename: 'logs/access.log',  
            pattern: "_yyyy-MM-dd",  
            alwaysIncludePattern: false,  
            category: 'dateFileLog'  
        }//日期文件格式  
    ],  
    replaceConsole: true,   //替换console.log  
    levels:{  
        dateFileLog: 'ALL',
        log_file: 'ALL',  
        console: 'ALL',  
    }  
});  
  
var logger = log4js.getLogger('log_file');  
  
exports.logger = logger;  
  
exports.use = function(app) {  
    //页面请求日志,用auto的话,默认级别是WARN  
    app.use(log4js.connectLogger(logger, {level:'auto', format:':method :url :status :remote-addr'}));  
    // app.use(log4js.connectLogger(dateFileLog, {level:'debug', format:':method :url'}));  
} 