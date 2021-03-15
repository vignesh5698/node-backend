const { authSerilizer } = require('../serializer/authSerializer')
const { authValidator } = require('../validator/authValidator')
const { validateToken } = require('../utils/jwtHelper')
const { addUser, getUserConfig } = require('../data-source/auth')

const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/', function(req, res, next) {
	res.sendFile(path.join(__dirname, '../', 'public', 'auth.html'))
});

router.post('/createUser', (req, res) => {
	const userConfig = req.body;
	let status, responseCode;
	const validatorResponse = authValidator.validateCreateUserConfig(userConfig);

	if(validatorResponse.status === 'success') {
		const serializedParameters = authSerilizer.toDataSource(userConfig);
		const addUserResponse = addUser(serializedParameters);

		responseCode = addUserResponse.responseCode;
		status = addUserResponse.status;
	} else {
		responseCode = 422;
		status = validatorResponse.message;
	}

	res.send({ status, responseCode });
});

router.post('/validateUser', (req, res) => {
	const { username, password } = req.body;
	let validated = false, status;
	const userConfig = getUserConfig(username);

	if(userConfig) {
		const actualPassword = validateToken(userConfig.password);
		validated = actualPassword === password;
		status = 200;
	} else {
		validated = false;
		status = 503;
	}

	res.send({ validated, status });
});

module.exports = router;
