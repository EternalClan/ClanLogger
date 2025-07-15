/* eslint-disable no-console */
const { Application } = require("./src/tools/core.js");
const date = new Date;

// Application Start
Application.init();
Application.start();

// Application stop
process.on("SIGINT", (signal) => Application.stop(signal));
process.on("SIGTERM", (signal) => Application.stop(signal));
process.on("STOP", (signal) => Application.stop(signal));
// process.on("exit", (signal) => Application.stop(signal));

// Error listener
process.on("shardError", (err) => {
	console.error(`[main.js][ERROR] A Websocket connection encountered errors: \n${err.stack}`);
});
process.on("unhandledRejection", (err, p) => {
	console.error(`[main.js][ERROR] Unhandled promise rejections: \n${p}\n${err}\n${err.stack}`);
});
process.on("uncaughtException", (err, src) => {
	console.error(`[main.js][ERROR] Uncaught error: \n${src}\n${err.stack}`);
	// mandatory (as per the Node.js docs)
	console.log(`[${date.toUTCString()}][main.js]\n > ▪ ▪ ▪  ERROR Exit 1  ▪ ▪ ▪ < `);
	process.exit(1);
});
process.on("warning", (warn) => {
	console.warn(`Warning: ${warn.name} - ${warn.message}`);
	console.warn(warn.stack);
});
// --------END-------- //
