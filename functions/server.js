// functions/socket.js
import { Server } from 'socket.io';
import http from 'http';

let io;

export const handler = async (event, context) => {
  if (!io) {
    const httpServer = http.createServer();
    io = new Server(httpServer);

    io.on('connection', (socket) => {
      console.log('A user connected');

      socket.on('disconnect', () => {
        console.log('User disconnected');
      });

      socket.on('sendMessage', (msg) => {
        io.emit('newMessage', msg);
      });
    });

    httpServer.listen(0, () => {
      const port = httpServer.address().port;
      console.log(`Socket.io server listening on port ${port}`);
    });
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Socket.io server is running' }),
  };
};
