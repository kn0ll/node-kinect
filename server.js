var Connect = require('connect'),
    http_serv = Connect.createServer(),
    io = require('socket.io').listen(http_serv),
    // osc = require('osc-min'),
    dgram = require('dgram'),
    osc_serv = dgram.createSocket('udp4');

http_serv.use(Connect.static(__dirname + '/webroot'));
http_serv.listen(8080);
osc_serv.bind(8000);

io.sockets.on('connection', function (socket) {

	osc_serv.on('message', function (msg) {
		console.log(msg);
		/*
	    console.log(osc.fromBuffer(msg));
	    socket.emit('message', msg);
        */
	});
    
    setInterval(function() {
        socket.emit('change:left', {
            x: Math.random() * 200,
            y: Math.random() * 200,
            z: Math.random() * 200
        });
    }, 1000);
    
});