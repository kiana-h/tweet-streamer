// module.exports = (io) => {
//   const app = require("express");
//   const router = app.Router();

//   // io.on("connection", (socket) => {
//   //   socket.on("chat message", (msg) => {
//   //     console.log(msg);
//   //     io.emit("chat message", msg);
//   //   });
//   //   socket.on("disconnect", () => {
//   //     console.log("user disconnected");
//   //   });
//   // });

//   io.on("connection", (socket) => {
//     socket.on("tweet", (tweet) => {
//       console.log(msg);
//       io.emit("tweet", tweet);
//     });
//     socket.on("disconnect", () => {
//       console.log("user disconnected");
//     });
//   });

//   return router;
// };
