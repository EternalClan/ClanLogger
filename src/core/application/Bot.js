/* eslint-disable no-console */
/* eslint-disable no-multi-spaces */
/* eslint-disable no-inline-comments */
// DiscordJS
const Discord = require("discord.js");
const { Client, GatewayIntentBits, Partials, Collection } = Discord;
require("dotenv").config();

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildModeration,
		GatewayIntentBits.GuildExpressions,
		GatewayIntentBits.GuildInvites,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMessageTyping,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.DirectMessageReactions,
		GatewayIntentBits.DirectMessageTyping,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildScheduledEvents
	],
	partials: [
		Partials.User,                  // The partial to receive uncached users.
		Partials.Channel,               // The partial to receive uncached channels. This is required to receive direct messages.
		Partials.GuildMember,           // The partial to receive uncached guild members.
		Partials.Message,               // The partial to receive uncached messages.
		Partials.Reaction,              // The partial to receive uncached reactions.
		Partials.GuildScheduledEvent,   // The partial to receive uncached guild scheduled events.
		Partials.ThreadMember           // The partial to receive uncached thread members.
	]
});
// Discord const
const fs = require("node:fs");
const timeFormat = "LL" + "/" + "dd" + "/" + "yyyy" + "-" + "h" + ":" + "mm" + ":" + "ss" + "-" + "a";
const { DateTime } = require("luxon");
console.log(`[core.Bot.js][Time] ${DateTime.utc().toFormat(timeFormat)} [UTC]`);

// Start
console.log("[core.Bot.js][NodeJS] ▪ ▪ ▪ ▪ ▪  DiscordBot Start  ▪ ▪ ▪ ▪ ▪ ");

// Command Event Database handler
client.cooldowns = new Collection();
client.commands = new Collection();
["eventHandler"].forEach(handler => {
	require(`../handler/${handler}.js`)(client, Discord, fs);
});
// Login
client.login(process.env.TOKEN);

// //--------END--------//