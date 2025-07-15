/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const { Message } = require("discord.js");
const { DateTime } = require("luxon");
const timeFormat = "yyyy/LL/dd-h:mm:ss.SSS-a";
require("dotenv").config();

module.exports = {
	name: "commands",
	cooldown: 5,
	prefix: "mention",
	async execute(message, args, prefix, commandName, globalclient) {
		if (message == null || message.guild == null
		|| message.channel.id == null) return console.log(`[${DateTime.utc().toFormat(timeFormat)}][command.commands.js] Interaction returned null or undefined.`);
		// Context
		const { RegisterCommands } = require("../../tools/core.js");
		const { Utils, DevCheck, TextFileReader } = require("../../tools/utils.js");
		const botMaster = await DevCheck.forBotMaster(message.author.id);
		const botMasterRole = await DevCheck.forBotMasterRole(message.author.id);
		const botChannel = await DevCheck.forBotChannel(message.channel.id);
		const langError = require(`../../../data/lang/${process.env.BOTLANG}/error.json`);

		// Main body
		if (!botMasterRole || !botMaster) Utils.messageReply(message, { content: langError.permission.admin });
		if (!botChannel) Utils.messageReply(message, { content: langError.channel.wrong });

		// Help
		if (args[0] === "help") {
			const data_out = await TextFileReader.read("paragraph", "commandHelp", `data/lang/${process.env.BOTLANG}`, "commands");
			Utils.messageReply(message, { content: data_out });
		}
		// Register SlashCommands
		if (args[0] === "register") {
			if (args[2] === "global") RegisterCommands.registerGlobal(message, globalclient);
			if (args[2] === "local") RegisterCommands.registerLocal(message, globalclient);
		}
		// Unregister SlashCommands
		if (args[0] === "unregister") {
			if (args[2] === "global") RegisterCommands.unregisterGlobal(message, globalclient);
			if (args[2] === "local") RegisterCommands.unregisterLocal(message, globalclient);
		}
	}
};