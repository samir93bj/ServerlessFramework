const Response = require('../common/API_Responses');

exports.handler = event => {
	try {
		const body = JSON.parse(event.body);

		if (!body || !body.text) {
			return Response._400({ message: 'Text read ok.'});
		}

		return Response._200({ message: 'Text read ok.' });
	} catch (error) {
		return Response._500({ message: 'Error event received.'});	
	}
}