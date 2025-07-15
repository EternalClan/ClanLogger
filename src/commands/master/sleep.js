/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const { Message } = require("discord.js");
const { DateTime } = require("luxon");
const timeFormat = "yyyy/LL/dd-h:mm:ss.SSS-a";
require("dotenv").config();

module.exports = {
	name: "sleep",
	cooldown: 5,
	prefix: "mention",
	// eslint-disable-next-line no-unused-vars
	async execute(message, args, prefix, commandName, globalclient) {
		if (message == null || message.guild == null
		|| message.channel.id == null) return console.log(`[${DateTime.utc().toFormat(timeFormat)}][command.sleep.js] Interaction returned null or undefined.`);
		// Context
		const { Utils, DevCheck } = require("../../tools/utils.js");
		const botMaster = await DevCheck.forBotMaster(message.author.id);
		const botMasterRole = await DevCheck.forBotMasterRole(message.author.id);
		const botChannel = await DevCheck.forBotChannel(message.channel.id);
		const lang = require(`../../../data/lang/${process.env.BOTLANG}/${process.env.BOTLANG}.json`);
		const langError = require(`../../../data/lang/${process.env.BOTLANG}/error.json`);
		const langSleep = lang.cmd.admin.sleep;

		// Main body
		if (!botMasterRole || !botMaster) Utils.messageReply(message, { content: langError.permission.admin });
		if (!botChannel) Utils.messageReply(message, { content: langError.channel.wrong });
		console.log(`[${DateTime.utc().toFormat(timeFormat)}][command.sleep.js] Shutting down.`);
		Utils.messageReply(message, langSleep.stopping);
		process.emit("STOP", "STOP");
		// globalclient.destroy();
	}
};