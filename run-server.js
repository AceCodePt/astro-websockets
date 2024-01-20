import express from "express";
import http from "http";

const app = express();

const server = http.createServer(app);

const base = "/";
app.use(base, express.static("dist/client/"));
//@vite-ignore
const path = "./dist/server/entry.mjs";
import(path).then((res) => {
  app.use(res.handler);
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log("Listening on port: " + port);
});

export default server;
