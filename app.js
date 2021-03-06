var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Database
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/parentcoco",{native_parser:true});

var routes = require('./routes/index');
var users = require('./routes/users');
var parent = require('./routes/parent');
var teacher = require('./routes/teacher');
var assment = require('./routes/assment');
var schedule = require('./routes/schedule');
var activity = require('./routes/activity');
var app = express();

//log
var log = require('./log_start');  
log.use(app);  
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use('/pc', routes);
app.use('/users', users);
app.use('/parent', parent);
app.use('/teacher', teacher);
app.use('/assignment', assment);
app.use('/schedule', schedule);
app.use('/activity', activity);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var usermap = {}
var http = require('http').Server(app);
var io = require('socket.io')(http);
io.on('connection', function (socket) {
    console.log('a user connected  ' + socket.id);
    //online
    socket.on('online', function (data){
        socket.name = data.user;
        if (!usermap[data.user]) {
            usermap[data.user] = socket;
            console.log('userid: ' + usermap[data.user].name);
        }
    });
    //off-line
    socket.on('disconnect', function(){
        if (usermap[socket.name]) {
            console.log('delete user: ' + socket.name);
            delete usermap[socket.name];
        }
        console.log('a user disconnect  ' + socket.id);
    });
    //receive a message
    socket.on('send',function(data){
        if (data.to == 'all') {
            console.log("data.to: " + data.to)
            socket.broadcast.emit('receive', data);
            console.log('msg: ' + data.toString());
        } 
        else{
            console.log('send to' + usermap[data.to].name);
            if (usermap[data.to]) {
                usermap[data.to].emit('receive', data);
            }
        }
    })

});

http.listen(3030, function(){
    console.log('server listen on 3030');
});

//var server1 = require('./socket');
//server1.create(3030);

// //chat server
// var users = {}
// var www = require('./bin/www')
// var io = require('socket.io').listen(www.server);
// io.sockets.on('connection', function (socket) {
//   console.log('a user connected');
//   //有人上线
//   socket.on('online', function (data) {
//     //将上线的用户名存储为 socket 对象的属性，以区分每个 socket 对象，方便后面使用
//     socket.name = data.user;
//     //users 对象中不存在该用户名则插入该用户名
//     if (!users[data.user]) {
//       users[data.user] = data.user;
//     }
//     //向所有用户广播该用户上线信息
//     io.sockets.emit('online', {users: users, user: data.user});
//   });

//   //有人发话
//   socket.on('say', function (data) {
//     if (data.to == 'all') {
//       //向其他所有用户广播该用户发话信息
//       socket.broadcast.emit('say', data);
//     } else {
//       //向特定用户发送该用户发话信息
//       //clients 为存储所有连接对象的数组
//       var clients = io.sockets.clients();
//       //遍历找到该用户
//       clients.forEach(function (client) {
//         if (client.name == data.to) {
//           //触发该用户客户端的 say 事件
//           client.emit('say', data);
//         }
//       });
//     }
//   });

//   //有人下线
//   socket.on('disconnect', function() {
//     //若 users 对象中保存了该用户名
//     if (users[socket.name]) {
//       //从 users 对象中删除该用户名
//       delete users[socket.name];
//       //向其他所有用户广播该用户下线信息
//       socket.broadcast.emit('offline', {users: users, user: socket.name});
//     }
//   });

//   socket.on('test', function(data){  
//     console.log(data);
//   });
// });


module.exports = app;
