/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const { EmbedBuilder, Events } = require("discord.js");
require("dotenv").config();

module.exports = {
	name: Events.GuildAuditLogEntryCreate,
	description: "Log edited Application Command Permissions.",
	once: false,
	async execute(guildauditlogentry, guild) {
		const { Utils, DevCheck, LanguageConvert } = require("../../../tools/utils.js");
		const { Application } = require("../../../tools/core.js");
		// Log Channel
		const logChannel = await DevCheck.forLogChannel(guild.id);
		if (logChannel == null || logChannel === "0") return;
		// Language
		const lang = require(`../../../../data/lang/${process.env.BOTLANG}/${process.env.BOTLANG}.json`);
		const langLogs = lang.modules.logs;
		const langOnboarding = langLogs.misc.onboarding;
		const langUnknown = langLogs.misc.unknown;
		const langHomeSettings = langLogs.misc.homesettings;

		console.log("AuditLog");
		console.log(" ");
		console.log(guildauditlogentry);

		// Main Body
		const { targetType, actionType, action, executor, changes } = guildauditlogentry;

		// eslint-disable-next-line no-constant-condition
		// if (actionType !== ) return;
		// console.log(guildauditlogentry);
		// return;

		let icon2 = executor.avatarURL();
		if (executor.avatar == null) icon2 = "https://i.imgur.com/CN6k8gB.png";

		const embed = new EmbedBuilder()
			.setColor(Application.colors().logEmbedColor.guildupdate)
			.setAuthor({ name: `${executor.tag} (ID: ${executor.id})`, iconURL: `${icon2}` })
			.setFooter({ text: "Auditlog" })
			.setTimestamp(new Date)
			.setDescription(`**${langLogs.all.edited}** ${guild.name}`);

		if (targetType === "guildOnboarding") {

			const defaultChannelIds = changes.filter(function(obj) {
				return obj.key === "default_channel_ids";
			});
			const id = changes.filter(function(obj) {
				return obj.key === "id";
			});
			const title = changes.filter(function(obj) {
				return obj.key === "title";
			});
			const options = changes.filter(function(obj) {
				return obj.key === "options";
			});
			const singleSelect = changes.filter(function(obj) {
				return obj.key === "single_select";
			});
			const required = changes.filter(function(obj) {
				return obj.key === "required";
			});
			const inOnboarding = changes.filter(function(obj) {
				return obj.key === "in_onboarding";
			});
			const type = changes.filter(function(obj) {
				return obj.key === "type";
			});
			const prompts = changes.filter(function(obj) {
				return obj.key === "prompts";
			});
			const guildId = changes.filter(function(obj) {
				return obj.key === "guild_id";
			});
			const welcomeMessage = changes.filter(function(obj) {
				return obj.key === "welcome_message";
			});
			const newMemberActions = changes.filter(function(obj) {
				return obj.key === "new_member_actions";
			});
			const resourceChannels = changes.filter(function(obj) {
				return obj.key === "resource_channels";
			});
			const belowRequirements = changes.filter(function(obj) {
				return obj.key === "below_requirements";
			});
			const enabled = changes.filter(function(obj) {
				return obj.key === "enabled";
			});
			const mode = changes.filter(function(obj) {
				return obj.key === "mode";
			})
			let auditlog = "";
			if (defaultChannelIds.length !== 0) auditlog += langOnboarding.defaultchannels;
			if (id.length !== 0) auditlog += LanguageConvert.lang(langOnboarding.id, id[0].new);
			if (title.length !== 0) auditlog += LanguageConvert.lang(langOnboarding.title, title[0].new);
			if (options.length !== 0) auditlog += langOnboarding.options;
			if (singleSelect.length !== 0) auditlog += LanguageConvert.lang(langOnboarding.singleselect, singleSelect[0].new);
			if (required.length !== 0) auditlog += LanguageConvert.lang(langOnboarding.required, required[0].new);
			if (inOnboarding.length !== 0) auditlog += LanguageConvert.lang(langOnboarding.inonboarding, inOnboarding[0].new);
			if (type.length !== 0) auditlog += LanguageConvert.lang(langOnboarding.type, type[0].new);
			if (prompts.length !== 0) auditlog += langOnboarding.prompts;
			if (guildId.length !== 0) auditlog += LanguageConvert.lang(langOnboarding.guildid, guildId[0].new);
			if (welcomeMessage.length !== 0) auditlog += LanguageConvert.lang(langOnboarding.welcomemsg, welcomeMessage.new.message);
			if (newMemberActions.length !== 0) auditlog += langOnboarding.newmemberactions;
			if (resourceChannels.length !== 0) auditlog += langOnboarding.resourcechannel;
			if (belowRequirements.length !== 0) auditlog += LanguageConvert.lang(langOnboarding.belowRequirements, belowRequirements[0].new);
			if (enabled.length !== 0) auditlog += LanguageConvert.lang(langOnboarding.enabled, enabled[0].new);
			if (mode.length !== 0) auditlog += LanguageConvert.lang(langOnboarding.mode, mode[0].new);
			if (auditlog !== "") {
				embed.addFields(
					{ name: langLogs.all.new, value: auditlog, inline: true }
				);
			}
			embed.setDescription(langOnboarding.onboardingupdate);
			// eslint-disable-next-line no-undef
			globalclient.channels.cache.get(logChannel).send({ embeds: [embed] });

		}
		if (targetType === "Unknown") {

			// Server Profile
			const gameApplicationIds = changes.filter(function(obj) {
				return obj.key === "game_application_ids";
			});
			const visibility = changes.filter(function(obj) {
				return obj.key === "visibility";
			});
			const traits = changes.filter(function(obj) {
				return obj.key === "traits";
			});
			const brandColorPrimary = changes.filter(function(obj) {
				return obj.key === "brand_color_primary";
			});
			const manualApprovalEnabled = changes.filter(function(obj) {
				return obj.key == "manual_approval_enabled";
			});
			let auditlog = "";
			if (gameApplicationIds.length !== 0) auditlog += LanguageConvert.lang(langUnknown.gameApplicationIds, gameApplicationIds[0].new);
			if (visibility.length !== 0) auditlog += LanguageConvert.lang(langUnknown.visibility, visibility[0].new);
			if (traits.length !== 0) {
				let traitsNew = "";
				traits[0].new.forEach(trait => {
					traitsNew += ":" + trait.emoji_name + ": `" + trait.label + "`, ";
				});
				if (traits[0].new.length === 0) traitsNew = langLogs.all.none;
				auditlog += LanguageConvert.lang(langUnknown.traits, traitsNew);
			}
			if (brandColorPrimary.length !== 0) auditlog += LanguageConvert.lang(langUnknown.brandColorPrimary, brandColorPrimary[0].new);
			if (manualApprovalEnabled.length !== 0) auditlog += LanguageConvert.lang(langUnknown.manualApprovalEnabled, manualApprovalEnabled[0].new);
			if (auditlog !== "") {
				embed.addFields(
					{ name: langLogs.all.new, value: auditlog, inline: true }
				);
			} else {
				embed.addFields(
					{ name: langLogs.all.new, value: langLogs.all.unknown, inline: true }
				);
			}
			embed.setDescription(langUnknown.unknownauditlog);
			// eslint-disable-next-line no-undef
			globalclient.channels.cache.get(logChannel).send({ embeds: [embed] });

		}
		if (targetType === "Guild" && actionType === "Update") {
			// const dataLogs = Get.logsByID("server", getBotConfigID);
			// if (dataLogs == null || dataLogs.Editing !== "true") return;

			const changeName = changes.filter(function(obj) {
				return obj.key === "name";
			});
			const changeSysChaID = changes.filter(function(obj) {
				return obj.key === "system_channel_id";
			});
			const changePremProgBarTrue = changes.filter(function(obj) {
				return obj.key === "premium_progress_bar_enabled";
			});
			const changeDefaultMesNot = changes.filter(function(obj) {
				return obj.key === "default_message_notifications";
			});
			const changeAFKChaID = changes.filter(function(obj) {
				return obj.key === "afk_channel_id";
			});
			const changeSysChaFlags = changes.filter(function(obj) {
				return obj.key === "system_channel_flags";
			});

			let guc = "";
			if (changeName.length !== 0) {
				guc += `**${lang.logs.name}** ${changeName[0].new}\n`;
			}
			if (changeSysChaID.length !== 0) {
				let scid = "";
				if (changeSysChaID[0].new == null) scid = "false";
				if (changeSysChaID[0].new != null) scid = `<#${changeSysChaID[0].new}>`;
				guc += `**${lang.logs.syschannel}** ${scid}\n`;
			}
			if (changeSysChaFlags.length !== 0) {
				const scf = Utils.systemChannelFlagsBitField(`${changeSysChaFlags[0].new}`);
				embed.addFields(
					{ name: `${lang.logs.syschannalflag}`, value: `${scf}`, inline: false }
				);
			}
			if (changePremProgBarTrue.length !== 0) {
				let ppbe = "";
				if (changePremProgBarTrue[0].new === true) ppbe = `${langLogs.server.enabled}`;
				if (changePremProgBarTrue[0].new === false) ppbe = `${langLogs.server.disabled}`;
				guc += `**${langLogs.server.premiumbar}** ${ppbe}\n`;
			}
			if (changeDefaultMesNot.length !== 0) {
				let dmn = "";
				if (changeDefaultMesNot[0].new === 0) dmn = `${langLogs.server.allmsg}`;
				if (changeDefaultMesNot[0].new === 1) dmn = `${langLogs.server.onlymention}`;
				guc += `**${langLogs.server.defaultmsgnoti}** ${dmn}\n`;
			}
			if (changeAFKChaID.length !== 0) {
				let afkcid = "";
				if (changeAFKChaID[0].new == null) afkcid = "false";
				if (changeAFKChaID[0].new != null) afkcid = `<#${changeAFKChaID[0].new}>`;
				guc += `**${langLogs.server.afkchannel}** ${afkcid}\n`;
			}
			if (guc !== "") {
				embed.addFields(
					{ name: `${langLogs.server.changes}`, value: `${guc}`, inline: false }
				);
			}
			// eslint-disable-next-line no-undef
			globalclient.channels.cache.get(logChannel).send({ embeds: [embed] });

		}
		// if (targetType === "" && actionType === "") {
		if (action === 191) {

			// const newMemberAction = changes.filter(function(obj) {
			// 	return obj.key === "new_member_action";
			// });
			// const resourceChannels = changes.filter(function(obj) {
			// 	return obj.key === "resource_channels";
			// });
			// const welcomeMessage = changes.filter(function(obj) {
			// 	return obj.key === "welcome_message";
			// });
			// let auditlog = "";
			// if (newMemberAction.length !== 0) auditlog += LanguageConvert.lang();
			// if (resourceChannels.length !== 0) auditlog += LanguageConvert.lang();
			// if (welcomeMessage.length !== 0) auditlog += LanguageConvert.lang();
			// if (auditlog !== "") {
			// 	embed.addFields(
			// 		{ name: langLogs.all.new, value: auditlog, inline: true }
			// 	);
			// } else {
			// 	embed.addFields(
			// 		{ name: langLogs.all.new, value: langLogs.all.unknown, inline: true }
			// 	);
			// }
			embed.setDescription(langHomeSettings.homesettings);
			// eslint-disable-next-line no-undef
			globalclient.channels.cache.get(logChannel).send({ embeds: [embed] });

		}
	}
};