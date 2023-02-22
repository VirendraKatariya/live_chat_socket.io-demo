const app = require("express")();

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
	cors: {
		origin: "*"
	}
});

io.on("connection", (socket) => {
	// console.log(`My Socket is `, socket);

	socket.on("chat", (payload) => {
		console.log(`payload is `, payload);
		io.emit("chat", payload);
	});
});

server.listen(8000, console.log(`server is active and running on http://localhost:8000/`));
