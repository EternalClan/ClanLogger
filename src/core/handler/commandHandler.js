/* eslint-disable no-console */
const { readdirSync } = require("fs");
const { DateTime } = require("luxon");
const timeFormat = "LL" + "/" + "dd" + "/" + "yyyy" + "-" + "h" + ":" + "mm" + ":" + "ss" + "-" + "a";

module.exports = (globalclient) => {
	const client = globalclient;
	const enabledCommandsSplit = process.env.ENABLE_COMMANDS.split(/,+/);
	const enabledCommandsTrim = enabledCommandsSplit.map(obj => {return obj.trim();});
	// Getting Directory name from list and filter out .js filesin to a string.
	const load_dir = (dirs) =>{
		// Grabs files out of the string, one by one (for loop) and Sets Command in the Collection.
		const commandFiles = readdirSync(`./src/commands/${dirs}`).filter(files => files.endsWith(".js") && !files.startsWith("#"));
		for (const file of commandFiles) {
			const command = require(`../../commands/${dirs}/${file}`);
			const enabledCommands = enabledCommandsTrim.filter(m => m === command.name).toString();
			if (command == null || command.name == null || command.name !== enabledCommands) continue;
			if (command.name) client.commands.set(command.name, command);
		}
	};
	// Directory name array list.
	const dirs = readdirSync("./src/commands");
	dirs.forEach(c => load_dir(c));
	console.log(`[${DateTime.utc().toFormat(timeFormat)}][core.commandHandler.js] Command Handler loaded`);
};