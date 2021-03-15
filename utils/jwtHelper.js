const jwt = require('jsonwebtoken');

const getToken = (password) => {
	const token = jwt.sign({ password }, 'key123');
	return token
}

const validateToken = (token, privateKey='key123') => {
	const decode = jwt.verify(token, privateKey);
	return decode.password;
}

module.exports = {
	getToken,
	validateToken
}
