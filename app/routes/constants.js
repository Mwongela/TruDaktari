/**
 * Constants.js
 * Contains the constants used in the application.
 */
module.exports = {

	doctor: {
		URL			: 'http://medicalboard.co.ke/services/search.php',
		Q			: 1,
		KEY			: "bWVkX3JldGVudGlvbg==",
		SEARCH_KEY	: "search",
		SALT		: "MQ==" ,
		SOURCE 		: "KMPD: Retention Register"
	},

	foreignDoctor: {
		URL			: "http://medicalboard.co.ke/services/search.php",
		Q			: 1,
		KEY 		: "bWVkX2ZvcmVpZ24=",
		SEARCH_KEY	: "search",
		SALT		: "Mw==",
		SOURCE		: "KMPD: Foreign Doctors Retention Register"
	},

	nurses: {
		URL	 		: "http://nckenya.com/services/search.php",
		P 			: 1,
		SEARCH_KEY	: "s",
		SOURCE		: "NCK: Retention Register"
	},

	methods: {
		GET			: 'GET',
		POST		: 'POST',
	},

	resultType: {
		DOCTOR		: 1,
		F_DOCTOR	: 2,
		NURSE		: 3
	}
};
