var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  io.emit('chat message', 'a user connected');
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    io.emit('chat message', 'user disconnected');
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
