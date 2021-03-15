const { getToken } = require('../utils/jwtHelper')

const serializeToDataSource = (userConfig) => {
	const { password, city } = userConfig;
	const token = getToken(password);

	return {
		...userConfig,
		password: token,
		city: city.toLowerCase()
	};
}

const serializeFromDataSource = () => {

}

module.exports = {
	authSerilizer: {
		toDataSource: serializeToDataSource,
		fromDataSource: serializeFromDataSource
	}
}
