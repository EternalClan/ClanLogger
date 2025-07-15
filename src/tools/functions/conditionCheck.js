/* eslint-disable no-console */
require("dotenv").config;

class ConditionCheck {
	/**
	 * .
	 *
	 * @param {*} has has
	 * @returns {Promise<String>}
	 */
	static hasRole(has) {
		let role = "";
		if (has === "has") role = "role";
		return role;
	}

	/**
	 * .
	 *
	 * @param {*} hasnot hasnot
	 * @returns {Promise<String>}
	 */
	static hasNotRole(hasnot) {
		let role = "";
		if (hasnot === "has") role = "role";
		return role;
	}

	/**
	 * Convert $s to the provided values.
	 *
	 * @param {String} text The translated text
	 * @param {Array} values The values to convert $s with
	 * @returns {String} The Converted text
	 */
	static lang(text, ...values) {
		let lang = text;
		values.forEach(value => {
			lang = lang.replace("$s", `${value}`);
		});
		const language = lang;
		return language;
	}
}

exports.ConditionCheck = ConditionCheck;
