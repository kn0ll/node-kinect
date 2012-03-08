var Connect = require('connect'),
	server = Connect.createServer(),
    io = require('socket.io').listen(server),
    osc = require('osc4node'),
    osc_server = new osc.Server(8000, '127.0.0.1');

server.use(Connect.static(__dirname + '/webroot'));
server.listen(8080);

// todo: is this working? set up osc from outside
osc_server.on('oscmessage', function(msg, rinfo) {
    console.log(msg);
    console.log(rinfo);
});

io.sockets.on('connection', function (socket) {

	setInterval(function() {

		socket.emit('change:left', {
			x: Math.random() * 200,
			y: Math.random() * 200,
			z: Math.random() * 200
		});

		socket.emit('change:right', {
			x: Math.random() * 10,
			y: Math.random() * 10,
			z: Math.random() * 10
		});

	}, 1000);
	
});