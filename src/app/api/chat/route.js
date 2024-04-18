import { Server } from "socket.io";

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    console.log(`user connected ${socket.id}`);
    socket.on("send-message", (message) => {
      console.log(message);
      io.emit("receive-message", message);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

  console.log("Setting up socket");
  res.end();
}
