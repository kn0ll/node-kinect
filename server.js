var Connect = require('connect'),
	server = Connect.createServer(),
    io = require('socket.io').listen(server);

server.use(Connect.static(__dirname + '/webroot'));
server.listen(8080);

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