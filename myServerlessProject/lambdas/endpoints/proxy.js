const Responses = require('../common/API_responses');

exports.handler = async event => {
	return Responses._200();
};
