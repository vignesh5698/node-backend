const { getAllUsernames } = require('../data-source/auth');

const isUsernameAvailabile = (username) => {
	const usernames = getAllUsernames();
	return !usernames.includes(username);
}

const isMobileNumberValid = (mobileNumber) => {
	return `${mobileNumber}`.length === 10;
}

const validateCreateUserConfig = (userConfig) => {
	const { username, mobileNumber } = userConfig;
	let status =  'failed', message;

	if(!isUsernameAvailabile(username)) {
		message = 'Username not available';
	} else if(!isMobileNumberValid(mobileNumber)) {
		message = 'Invalid mobile number';
	} else {
		status = 'success';
		message = 'Userconfig validated';
	}

	return { status, message };
}

module.exports = {
	authValidator: {
		validateCreateUserConfig: validateCreateUserConfig
	}
}
