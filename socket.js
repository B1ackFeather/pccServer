var socketio = require('socket.io');
var users = {};
exports.create = function(port){
   return socketio.listen(port).on('connection', function (socket) {
	    //连接上
	    console.log('connection!!!');
		users[socket.id]=socket;

		socket.on('disconnect' , function(reason){
			//断开链接
			delete users[socket.id];
		});

		socket.on('message', function (msg) {
			//收到消息
			console.log(msg);
		});

	});
};