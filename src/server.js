import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

//http 서버와 webSocket 서버를 같이 돌리지 않아도 괜찮음. 필요에 따라 ws만 사용
//이렇게 하면 localhost는 동일한 포트에서 http, ws 두 개의 protocol 사용 가능
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);
  console.log("Connected to Browser!");
  socket.on("close", () => console.log("Disconnected from the Browser"));
  socket.on("message", (message) => {
    //console에서 message가 buffer가 뜰 경우 .toString("utf-8") 꼭 넣어줄 것
    console.log(message.toString("utf-8"));
    socket.forEach((aSocket) => aSocket.send(message.toString("utf-8")));
  });
});

server.listen(3000, handleListen);
