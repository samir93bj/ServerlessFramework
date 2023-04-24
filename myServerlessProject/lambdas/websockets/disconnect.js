const Responses = require('../common/API_responses');
const Dynamo = require('../common/Dynamo');

const tableName = process.env.tableName;

exports.handler = async (event) => {
	try {
		console.log('event: ' + event);

		const { connectionId: connectionID } = event.requestContext;

		await Dynamo.delete( connectionID, tableName);

		return Responses._200({ message: 'disconnect' });
	} catch (error) {
		return Responses._500({ message: error.message });
	}
};