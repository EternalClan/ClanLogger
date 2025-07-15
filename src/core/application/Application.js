/* eslint-disable max-len */
/* eslint-disable no-console */
const path = require("node:path");
const { existsSync, mkdirSync } = require("node:fs");
require("dotenv").config();

class Application {

	/**
	 * @param {NodeJS.Signals|String|Number} signal The Signal Identifier
	 * @returns {void}
	 */
	static stop(signal) {
		const date = new Date;
		if (signal === "SIGINT") { console.log(`[${date.toUTCString()}][core.Application.js]\n > ▪ ▪ ▪  SIGINT Exit 0  ▪ ▪ ▪ < `); process.exit(0); }
		if (signal === "SIGTERM") { console.log(`[${date.toUTCString()}][core.Application.js]\n > ▪ ▪ ▪  SIGTERM Exit 0  ▪ ▪ ▪ < `); process.exit(0); }
		// eslint-disable-next-line no-undef
		if (signal === "STOP") globalclient.destroy().then(console.log(`[${date.toUTCString()}][core.Application.js]\n > ▪ ▪ ▪  Shutdown  ▪ ▪ ▪ < `));
		// if (!isNaN(signal)) { console.log(`[${date.toUTCString()}]\n > ▪ ▪ ▪  exit Exit 0  ▪ ▪ ▪ < `); process.exit(0); }
	}

	/**
	 * @returns {void}
	 */
	static init() {
		// Array of Packages/Dependencies.
		const packJSON = require("../../../data/config/application.json");
		const packArray = packJSON.packages;
		const newPath = path.resolve("main.js");
		let pack = "%s";
		let newDirPath = "%s";
		// Loops throu the array.
		packArray.forEach(obj => {
			if (!existsSync(`./node_modules/${obj}`)) {
				pack += `%e${obj}`;
				const dirPath = path.resolve(`node_modules/${obj}`);
				newDirPath += `%e'${dirPath}\\'`;
			}
		});
		if (pack !== "%s" || newDirPath !== "%s") {
			pack = pack.replace(/%s%e/gi, "");
			pack = pack.replace(/%e/gi, ", ");
			newDirPath = newDirPath.replace(/%s%e/gi, "");
			newDirPath = newDirPath.replace(/%e/gi, ",\n	");
			process.exitCode = 5;
			return process.stderr.write(`${newPath}\n\n\nFATAL ERROR: Dependencies not installed - Missing '${pack}': ` +
				`\nENOENT: no such files or directorys, open '${pack}'.` +
				"\n  errno: -2" +
				"\n  code: 'ENOENT'" +
				"\n  syscall: 'open'" +
				`\n  path: ${newDirPath}` +
				"\n" +
				"\n")
				.then(process.exit());
		}
	}

	/**
	 * @returns {void}
	 */
	static database() {
		if (!existsSync("./data/sqlite")) mkdirSync("./data/sqlite");
		require("../../tools/functions/sql/tables.js")();
	}

	/**
	 * @returns {void}
	 */
	static start() {
		if (process.env.SHARDING === "true") {
			require("./Shard.js");
		}
		if (process.env.SHARDING === "false") {
			require("./Bot.js");
		}
	}

	/**
	 * @returns {Object} Embed colors
	 */
	static colors() {
		const colors = {
			logEmbedColor: {
				ban: "DarkRed",
				unban: "DarkGreen",
				create: "Green",
				update: "Yellow",
				delete: "Red",
				guildupdate: "Orange",
				messagedelete: "Yellow"
			}
		};
		return colors;
	}
}

exports.Application = Application;