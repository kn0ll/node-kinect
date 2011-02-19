var connect = require('connect'),
  fs = require('fs'),
  socketIO = require('./lib/Socket.IO-node/lib/socket.io'),
  jspack = require('./lib/node-jspack/jspack').jspack
  
// handle regular http stuff
var server = connect.createServer(
  
  // static assets
  connect.staticProvider(__dirname + '/static'),
  
  // routes
  connect.router(function(app){
    
    // serve index page
    app.get('/', function(req, res, next){
      
      res.writeHead(200, { 'Content-Type': 'text/html' })
      fs.readFile('./views/index.html', 'utf8', function (err, html) {
        res.end(html)
      })
      
    })
    
  })
  
).listen(8080)

// socket.io, I choose you
socketIO.listen(server).on('connection', function(client) {

  // prepare listening socket
  var dgram = require('dgram'),
    osc_serv = dgram.createSocket('udp4')

  // parse the message from bionic dj
  // not really doing any determination via OSC spec
  // just dumb-parsing the buffer
  osc_serv.on('message', function (msg, a) {
    // send a simple "osc" object to client
    // { path: '/kinect/left_x', value: 0.453235 }
    client.send(JSON.stringify({
      // first 16 are path string /kinect/left_x etc
      path: msg.slice(0, 16).toString(),
      // unpack ieee double from last 4
      value: jspack.Unpack('>f', msg.slice(20))[0]
    }))
  })

  // listen for incoming messages from bionic dj
  osc_serv.bind(8000, '127.0.0.1')

});