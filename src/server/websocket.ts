import kleur from "kleur";
import { Server } from "socket.io";

let ioServer: Server;

if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
  ioServer = new Server(5001, {
    cors: {
      origin: "*",
    },
  });
  console.log("dev websocket server");
} else {
  const expressServer = await import("../../run-server.js").then(
    (mod) => mod.default
  );
  ioServer = new Server(expressServer);
  console.log("prod websocket server");
}

console.log("doing this again");

const sequenceNumberByClient = new Map();

ioServer.on("connection", (socket) => {
  console.info(kleur.yellow(`Client connected [id=${socket.id}]`));

  sequenceNumberByClient.set(socket, 1);

  socket.on("disconnect", () => {
    sequenceNumberByClient.delete(socket);
    console.info(`Client gone [id=${socket.id}]`);
  });
});

setInterval(() => {
  for (const [client, sequenceNumber] of sequenceNumberByClient.entries()) {
    client.emit("seq-num", sequenceNumber);
    sequenceNumberByClient.set(client, sequenceNumber + 1);

    console.log(kleur.green(`Sending \`seq-num\`: ${sequenceNumber}…`));
  }
}, 2000);
