const Responses = require('../common/API_responses');
const AWS = require('aws-sdk');

const SES = new AWS.SES();

exports.handler = async event => {
	try {
		const { to, from, subject, text } = JSON.parse(event.body);

		if (!to || !from || !subject || !text) {
			return Responses._400({ message: 'to, from, subject, text are all required in the body' }); 
		}

		const params = {
			Destination: {
				ToAddresses: [ to ]
			},
			Message: {
				Body: {
					Text: { Data: text }
				},
				Subject: { Data: subject }
			},
			Source: from 
		}

		await SES.sendEmail(params).promise();

		return Responses._200({ message: 'Send email success' });
	} catch (error) {
		return Responses._400({ message: `The Email failed to send. Error: ${error.message}` });
	}
	
};