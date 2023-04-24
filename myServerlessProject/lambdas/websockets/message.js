const Responses = require('../common/API_responses');
const Dynamo = require('../common/Dynamo');

const tableName = process.env.tableName;

exports.handler = async (event) => {
	try {
		console.log('event: ' + event);

		const { connectionId: connectionID } = event.requestContext;
		const body = JSON.parse(event.body);
	
		const record = await Dynamo.get(connectionID, tableName);
		const messages = record.messages;

		messages.push(body.message);

		const data = {
			...record,
			messages
		};

		await Dynamo.write(data, tableName);

		return Responses._200({ message: 'got a message' });
	} catch (err) { 
		return Responses._500({ message: 'Error: ' + err.message });
	}
};