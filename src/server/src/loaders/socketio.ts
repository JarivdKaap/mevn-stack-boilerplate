import http from 'http';
import socketio from 'socket.io';

export default ({ server }: { server: http.Server }) => {
  let io = socketio.listen(server);

  io.on("connection", function(socket: socketio.Socket) {
    console.log("a user connected");
    socket.on('sendMessage', (message) => {
      io.emit('chatMessage', message);
    })
  });
};