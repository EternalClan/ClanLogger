# ClanLogger
![Discord](https://img.shields.io/discord/720746186788831323?style=flat-square&logo=discord&logoColor=%23ffffff&logoSize=auto&label=Eternal%20Clan&color=%237289da&link=https%3A%2F%2Fdiscord.gg%2FQXnbmW6dr3)
![ESLint](https://img.shields.io/badge/custom-%234B32C3?style=flat-square&logo=eslint&logoColor=%23ffffff&logoSize=auto&label=ESLint)
[![LICENSE](https://img.shields.io/github/license/EternalClan/ClanLogger?style=flat-square)](LICENSE)
![Version (main)](https://img.shields.io/github/package-json/v/EternalClan/ClanLogger/main?style=flat-square)<!-- 
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/EternalClan/ClanLogger/nodejs.yml?branch=main&style=flat-square&link=https%3A%2F%2Fgithub.com%EternalClan%2FClanLogger%2Factions)
-->
[![Maintenance](https://img.shields.io/maintenance/yes/2025?style=flat-square)](https://github.com/EternalClan/ClanLogger/graphs/commit-activity)


## Installation and setup

### Prerequisites

This bot is built on Node.js. If you do not yet have Node installed, download and install the latest LTS version from the official website for your platform:

[Nodejs.org/downloads/](https://nodejs.org/en/download/)

> [!IMPORTANT]
> **Node.js, version 18 or higher is required.**

### Installation

To set up ClanLoggerJS, download the latest zip file or clone it using `git`:

    git clone git@github.com:TamaniWolf/ClanLoggerJS.git
    
Once downloaded, extract it from the zip file if needed and enter the directory to install the dependencies:

    cd ClanLoggerJS
    npm install -global pnpm pm2
    pnpm update

### Configuration
 
To configure ClanLoggerJS, rename the included `#.env` to `.env`. It should look like this in there:

```.env
#-- ClanLoggerJS --//
TOKEN = <Token>
PREFIX = w.
SHARDING = false
BOTLANG = en_US

SERVER_ID = <GuildId>
SERVER_OWNER = <OwnerId>

BOT_MASTER = <UserId1, ...>
BOT_MASTER_ROLE = <RoleId1, ...>

CLANLOGGER_ID = <BotId>

BOT_CHANNEL = <ChannelId1, ...>
LOG_CHANNEL = <ChannelId>
CAPTCHA_CHANNEL = <ChannelId>

# Set what Moderation action to take.
# ------- ban, kick
ACCOUNT_AGE = kick
CAPTCHA_FAIL = kick

# Here you can decide if you want Bots and there commands to be logged in the logs.
# ------- true is ON / false is OFF
LOGGING_BOTS = true
LOGGING_BOT_COMMANDS = false

# Exclude commands of other bots from being logged.
# ------- hug,megahug,boop,megaboop
EXTERNAL_COMMANDS = hug,megahug,boop,megaboop

# Enable the bots commands by entering them in.
# ------- help,info,ping,sleep,clear,automod,captcha
ENABLE_COMMANDS = help,info,ping,sleep,clear,automod,captcha

# Enable the bots modules / functions by entering them in.
# ------- logs,interbotcom,accountage,reactcaptcha
ENABLE_MODULES = logs,interbotcom,accountage,reactcaptcha
```

### Discord bot/application Token
Your Discord bot needs to be registered as an application, and you will need a bot token  (`TOKEN` in ClanNotifyer's .env).

Follow [this guide](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token) to create your own Bot User/Application.

### Starting ClanLoggerJS

Once the application has been configured, start it using `node` from the installation directory:

    node .

Or with the proccess Manager `pm2`.
For the first time:

    pm2 start main.js --name "Name" --max-memory-restart 250M

After adding to pm2 you can start it with the process number or the name:

    pm2 start 1
    pm2 start Name
  
### Inviting ClanLoggerJS

Send the following link to the admin of a Discord server to let them invite the Bot:

  `https://discordapp.com/oauth2/authorize?client_id=BOT_CLIENT_ID&scope=bot&permissions=564582511275254`
  
Swap `BOT_CLIENT_ID` in the URL above for your Discord app's client id, which you can find in the app details.

> [!TIP]
> Use `@Bot-name help` to get an overview of the commands.
