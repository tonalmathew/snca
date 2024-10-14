// server.js
import express from 'express';
import { Server } from 'socket.io';

const app = express();
const httpServer = app.listen(3000);

const io = new Server(httpServer, {
  cors: {
   origin: '*',
  },
});

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('sendMessage', (msg) => {
    io.emit('newMessage', msg);
  });
});

console.log('Server running on port 3000');
