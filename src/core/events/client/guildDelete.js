const { Events } = require("discord.js");
module.exports = {
	name: Events.GuildDelete,
	description: "Log Bot Lefing Servers.",
	once: false,
	async execute(guild) {
		// eslint-disable-next-line no-console
		console.log(`[core.guildDelete.js] The Bot left a server: ${guild.name}`);
		// SQLite
		const { Del } = require("../../../tools/db.js");
		const getGuildId = guild.id;
		if (getGuildId === "100000000000000000") return;
		// CONFIG
		// Config
		Del.configAll("discord_bot", getGuildId);
		// MODERATION
		Del.auditLogsAll("auditlog", getGuildId);
		Del.auditLogsAll("message_delete", getGuildId);
		Del.moderationAll("moderation", getGuildId);
		Del.moderationAll("captcha", getGuildId);
		Del.moderationAll("nospam", getGuildId);
	}
};
