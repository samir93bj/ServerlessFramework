const Responses = require('../common/API_responses');
const Dynamo = require('../common/Dynamo');

const tableName = process.env.tableName;

exports.handler = async (event) => {
	try {
		console.log('event: ' + event);

		const { connectionId: connectionID } = event.requestContext;
	
		const data = {
			ID: connectionID,
			date: Date.now(),
			messages: []
		}
	
		await Dynamo.write(data, tableName);
	
		return Responses._200({ message: 'connected'});
	} catch (err) { 
		return Responses._500({ message: err.message });
	}
	
};