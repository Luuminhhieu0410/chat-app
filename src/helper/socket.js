import express from 'express';
import http from 'http';
import {Server} from 'socket.io';
const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: '*',
      },
});

export {app,io,server};

io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);

  
    io.emit('user-connect', socket.id);
  

  socket.on("send-room", (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room: ${roomId}`);
  });

  socket.on("send-message", (data) => { 
      console.log(data);
      socket.to(data.roomId).emit("receive", data.message);
  });
  
  socket.on("disconnect", () => {
      console.log("User disconnected: " + socket.id);
  });
});