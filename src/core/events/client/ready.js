/* eslint-disable no-undef */
/* eslint-disable no-console */
const { ActivityType, Events } = require("discord.js");
const { DateTime } = require("luxon");
const timeFormat = "LL" + "/" + "dd" + "/" + "yyyy" + "-" + "h" + ":" + "mm" + ":" + "ss" + "-" + "a";
require("dotenv").config();

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		const { Application } = require("../../../tools/core.js");
		// Set Client (Bot) Activity.
		client.user.setActivity("everyone", { type: ActivityType.Watching });
		console.log(`[${DateTime.utc().toFormat(timeFormat)}][core.ready.js] logged in as ${client.user.tag}.`);
		const guildInvites = new Map();
		client.guilds.cache.forEach(guild => {
			guild.invites.fetch()
				.then(invites => {
					const codeUses = new Map();
					invites.each(inv => codeUses.set(inv.code, inv.uses));
					guildInvites.set(guild.id, codeUses);
				})
				.catch(err => {
					console.log(`[${DateTime.utc().toFormat(timeFormat)}][core.ready.js] OnReady Error:`, err);
				});
		});
		global.globalInvites = guildInvites;
		global.globalclient = client;
		Application.database();
		console.log(`[${DateTime.utc().toFormat(timeFormat)}][core.ready.js] ▪ ▪ ▪  Module Start  ▪ ▪ ▪ `);

		const handlerList = ["logsHandler", "commandHandler", "moderationHandler"];
		handlerList.forEach(modulesHandler => {
			require(`../../handler/${modulesHandler}`)(globalclient);
		});

		console.log(`[core.ready.js][Time] ${DateTime.utc().toFormat(timeFormat)} [UTC]`);
		console.log("[core.ready.js][NodeJS] ▪ ▪ ▪ ▪ ▪  DiscordBot Ready  ▪ ▪ ▪ ▪ ▪ ");

	}
};
/*
0   Playing     "Playing {name}"
1   Streaming   "Streaming {details}"   Only Twitch and YouTube urls work.
2   Listening   "Listening to {name}"
3   Watching    "Watching {name}"
4   Custom      "{emoji} {name}"
5   Competing   "Competing in {name}"
*/