let localStorage;
if (typeof localStorage === "undefined" || localStorage === null) {
  let LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

const getAllUsernames = () => {
	return ['Praga', 'Tom'];
}

const addUser = (userConfig) => {
	const usersConfig = JSON.parse(localStorage.getItem('userConfigs')) || [];

	usersConfig.push(userConfig);
	localStorage.setItem('userConfigs', JSON.stringify(usersConfig));

	return {
		code: 200,
		status: 'success: User added'
	}
}

const getUserConfig = (username) => {
	const usersConfig = JSON.parse(localStorage.getItem('userConfigs'));
	const userConfig = usersConfig.filter((userConfig) => userConfig.username === username);
	if(userConfig.length === 0) {
		return null;
	} else {
		return userConfig[0];
	}
}

module.exports = {
	getAllUsernames,
	addUser,
	getUserConfig,
}
