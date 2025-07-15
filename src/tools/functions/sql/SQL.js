// Require SQLite and Databases
const SQLite = require("better-sqlite3");
const sqlConfig = new SQLite("./data/sqlite/config.sqlite");
const sqlAuditLogs = new SQLite("./data/sqlite/auditLog.sqlite");
const sqlModeration = new SQLite("./data/sqlite/moderation.sqlite");
const sqlReactions = new SQLite("./data/sqlite/reaction.sqlite");

class SQL {
	static config() {
		return sqlConfig;
	}
	static auditLogs() {
		return sqlAuditLogs;
	}
	static moderation() {
		return sqlModeration;
	}
	static reactions() {
		return sqlReactions;
	}
}

exports.SQL = SQL;