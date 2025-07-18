/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-inner-declarations */
// Require and set
// eslint-disable-next-line no-unused-vars
const { Message } = require("discord.js");
const { DateTime } = require("luxon");
const timeFormat = "yyyy/LL/dd-h:mm:ss.SSS-a";
require("dotenv").config();

module.exports = {
	name: "captcha",
	cooldown: 5,
	prefix: "mention",
	async execute(message, args, prefix, commandName, globalclient) {
		if (message.guild == null) return;
		if (message == null || message.channel.id == null || message.guild == null
		|| message.guild.id == null) return console.log(`[${DateTime.utc().toFormat(timeFormat)}][command.captch.js] Interaction returned null or undefined.`);
		// Imports
		const { Utils, DevCheck } = require("../../tools/utils.js");
		const { TextFileReader } = require("../../tools/functions/txtReader");
		const { Get, Set, Del } = require("../../tools/db.js");
		const { LanguageConvert } = require("../../tools/functions/languageConvert.js");
		const getGuildID = `${message.guild.id}`;
		const botMaster = await DevCheck.forBotMaster(message.author.id);
		const botMasterRole = await DevCheck.forBotMasterRole(message.author.id);
		const botChannel = await DevCheck.forBotChannel(message.channel.id);
		const logChannel = await DevCheck.forLogChannel(getGuildID);
		const lang = require(`../../../data/lang/${process.env.BOTLANG}/${process.env.BOTLANG}.json`);
		const langError = require(`../../../data/lang/${process.env.BOTLANG}/error.json`);
		const langCaptcha = lang.cmd.admin.captcha;

		// Main Body
		if (!botMasterRole || !botMaster) return Utils.messageReply(message, { content: langError.permission.admin });
		if (!botChannel) return Utils.messageReply(message, { content: langError.channel.wrong });
		// @Bot captcha help
		// @Bot captcha reaction set message <messageID>
		// @Bot captcha reaction set emoji <emoji>
		// @Bot captcha reaction set role <role>
		// @Bot captcha reaction set failure <ban|kick>
		// @Bot captcha reaction set attempts <amount>
		// @Bot captcha reaction send message ```<message>``` [emojis]
		// @Bot captcha reaction edit message ```<message>``` [emojis]
		// @Bot captcha reaction edit emojis <emojis>
		// @Bot captcha reaction edit attempts <amount>
		// @Bot captcha reaction remove
		const setValue = args[3];
		let setData = "";
		if (args[0] === "help") {
			const data_out = await TextFileReader.read("paragraph", "commandHelp", `data/lang/${process.env.BOTLANG}`, "captcha");
			Utils.messageReply(message, { content: data_out, ephemeral: true });
		}
		if (args[0] === "reaction") {
			const captchaChannel = process.env.CAPTCHA_CHANNEL;
			const guild = await message.client.guilds.fetch(getGuildID);
			const getModerationID = `${guild.id}-${guild.shard.id}-ReactCaptcha`;
			let dataAutoMod = Get.moderationByIDAndType("moderation", getModerationID, "ReactCaptcha");
			if (args[1] === "set") {
				if (dataAutoMod == null) dataAutoMod = { ModerationID: getModerationID, GuildID: guild.id, Type: "ReactCaptcha", Extra: "undefined-undefined-undefined", Object: "undefined-undefined" };
				const arrayExtra = dataAutoMod.Extra.split("-");
				const arrayObject = dataAutoMod.Object.split("-");
				const emoji = setValue.replace(/<.*?(.*?)>/gi, "$1");
				const emojiID = emoji.replace(":", "");
				const roleID = setValue.replace(/<@&.*?(.*?)>/gi, "$1");

				// -----------------------------------  setText, guild, getModerationID, msgID, faile, attempts, roleID, emojis
				if (args[2] === "message") setCaptcha(langCaptcha.setmessage, guild, getModerationID, setValue, arrayExtra[1], arrayExtra[2], arrayObject[0], arrayObject[1]);
				if (args[2] === "emoji") setCaptcha(langCaptcha.setemoji, guild, getModerationID, arrayExtra[0], arrayExtra[1], arrayExtra[2], arrayObject[0], emojiID);
				if (args[2] === "role") setCaptcha(langCaptcha.setrole, guild, getModerationID, arrayExtra[0], arrayExtra[1], arrayExtra[2], roleID, arrayObject[1]);
				if (args[2] === "failure") setCaptcha(langCaptcha.setfailure, guild, getModerationID, arrayExtra[0], setValue, arrayExtra[2], arrayObject[0], arrayObject[1]);
				if (args[2] === "attempts") setCaptcha(langCaptcha.setattempts, guild, getModerationID, arrayExtra[0], arrayExtra[1], setValue, arrayObject[0], arrayObject[1]);
			}
			if (args[1] === "send" && args[2].startsWith("message")) {
				const msgContent = message.content + " ";
				const extractMsg = msgContent.split("\n```\n");
				let eMsg = extractMsg[2];
				if (extractMsg[2] == null) eMsg = " ";
				const arrayEmojis = eMsg.split(" ");

				globalclient.channels.cache.get(captchaChannel).send({ content: `${extractMsg[1]}`, ephemeral: true }).then(msg => {
					reactEmojis(arrayEmojis, msg);
				});
			}
			if (args[1] === "edit") {
				const data = dataAutoMod.Extra.split("-");
				if (args[2].startsWith("message")) {
					const data = dataAutoMod.Extra.split("-");
					const extractMsg = message.content.split("\n```\n");
					const rMsg = extractMsg[1].replace("\n```", "");
					let eMsg = extractMsg[2];
					if (extractMsg[2] == null) eMsg = " ";
					const arrayEmojis = eMsg.split(" ");
					const msg = await globalclient.channels.cache.get(captchaChannel).messages.fetch(data[0]);
					msg.edit({ content: `${rMsg}`, ephemeral: true }).then(msg => {
						reactEmojis(arrayEmojis, msg);
					});
				}
				if (args[2].startsWith("emojis")) {
					const extractMsg = message.content.replace("reaction edit emojis ", "");
					const arrayEmojis = extractMsg.split(" ");
					const msg = await globalclient.channels.cache.get(captchaChannel).messages.fetch(data[0]);
					msg.reactions.removeAll().then(msg => {
						reactEmojis(arrayEmojis, msg);
					});
				}
				if (args[2].startsWith("attempts")) {
					const arrayExtra = dataAutoMod.Extra.split("-");
					const arrayObject = dataAutoMod.Object.split("-");
					setCaptcha(langCaptcha.setattempts, guild, getModerationID, arrayExtra[0], arrayExtra[1], setValue, arrayObject[0], arrayObject[1]);
				}
			}
			if (args[1] === "remove") {
				globalclient.channels.cache.get(logChannel).send({ content: langCaptcha.removereact, ephemeral: true });
				Del.moderationByIDAndType("moderation", getModerationID, "ReactCaptcha");
				return;
			}
		}
		// Functions
		function reactEmojis(emojis, msg) {
			const ae = emojis;
			if (ae[0] != null) if (ae[0].length !== 0) msg.react(ae[0]);
			if (ae[1] != null) if (ae[1].length !== 0) msg.react(ae[1]);
			if (ae[2] != null) if (ae[2].length !== 0) msg.react(ae[2]);
			if (ae[3] != null) if (ae[3].length !== 0) msg.react(ae[3]);
			if (ae[4] != null) if (ae[4].length !== 0) msg.react(ae[4]);
			if (ae[5] != null) if (ae[5].length !== 0) msg.react(ae[5]);
			if (ae[6] != null) if (ae[6].length !== 0) msg.react(ae[6]);
			if (ae[7] != null) if (ae[7].length !== 0) msg.react(ae[7]);
			if (ae[8] != null) if (ae[8].length !== 0) msg.react(ae[8]);
			if (ae[9] != null) if (ae[9].length !== 0) msg.react(ae[9]);
		}
		function setCaptcha(setText, guild, getModerationID, msgID, faile, attempts, roleID, emojis) {
			setData = { ModerationID: getModerationID, GuildID: guild.id, Type: "ReactCaptcha", Extra: `${msgID}-${faile}-${attempts}`, Object: `${roleID}-${emojis}` };
			globalclient.channels.cache.get(logChannel).send({ content: LanguageConvert.lang(langCaptcha.setcaptcha, setText), ephemeral: true });
			Set.moderationByData("moderation", setData);
			return;
		}
	}
};