var Connect = require('connect'),
    http_serv = Connect.createServer(),
    io = require('socket.io').listen(http_serv),
    osc_serv = require(__dirname + '/node_modules/socket.osc');

http_serv.use(Connect.static(__dirname + '/webroot'));
http_serv.listen(8080);
osc_serv.listen(io, 8000);