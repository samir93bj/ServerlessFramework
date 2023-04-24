const Responses = require('../common/API_responses');
const AWS = require('aws-sdk');

const SNS = new AWS.SNS({
	apiVersion: '2010-03-31'
});

exports.handler = async event => {
	try {
		const body = JSON.parse(event.body);
		if(!body || !body.phoneNumber || !body.message) {
			return Responses._400({ message: 'Missing phone number or message from the body' });
		}

		const AttributeParams = {
			attributes: {
				DefaultSMSType: 'Promotional'
			}
		};

		const messageParams = {
			Message: body.message,
			PhoneNumber: body.phoneNumber
		};

		await SNS.setSMSAttributes(AttributeParams).promise();
		await SNS.publish(messageParams).promise();

	} catch (error) {
		return Responses._500({ message: `Error: ${error.message}`})
	}
}