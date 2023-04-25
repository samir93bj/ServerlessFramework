const Responses = require('../common/API_Responses');
const AWS = require('aws-sdk');
const SES = new AWS.SES();

exports.handler = async event => {
	try {
			const message = `Hey Samir, 
			Dont forget to film.
		`

		const params = {
			Destination: {
					ToAddresses: ['samir93bj@gmail.com'],
			},
			Message: {
					Body: {
							Text: { Data: message },
					},
					Subject: { Data: 'reminder email' },
			},
			Source: 'samir93bj@gmail.com',
	};

		await SES.sendEmail(params).promise();
		return Responses._200({ message: 'email sent'});

	} catch (error) {
		return Responses._500({ message: error.message });
	}
	
}