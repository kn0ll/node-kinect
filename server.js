var Connect = require('connect'),
    http_serv = Connect.createServer(),
    io = require('socket.io').listen(http_serv),
    osc = require('omgosc'),
    dgram = require('dgram'),
    osc_serv = new osc.UdpReceiver(8000);

http_serv.use(Connect.static(__dirname + '/webroot'));
http_serv.listen(8080);

io.sockets.on('connection', function (socket) {

    osc_serv.on('', function(msg) {
        socket.emit('osc', msg);
    });

});