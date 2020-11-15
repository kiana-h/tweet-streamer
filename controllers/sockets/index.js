module.exports = (io) => {
  var app = require("express");
  var router = app.Router();

  io.on("connection", (socket) => {
    socket.on("chat message", (msg) => {
      console.log(msg);
      io.emit("chat message", msg);
    });
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

  return router;
};
