const Responses = require('../common/API_responses');
const Dynamo = require('../common/Dynamo');
const { withHooks } = require('../common/hooks');

const tableName = process.env.tableName;

handler = async event => {
	if (!event.pathParameters.ID) {
			return Responses._400({ message: 'missing the ID from the path' });
	}

	let ID = event.pathParameters.ID;

	const user = await Dynamo.get(ID, tableName).catch (err  => {
		return null
	})

	if (!user) {
		return Responses._400({ message: 'Failed to get user By ID'})
	}

	return Responses._200({ user })
};

exports.handler =  withHooks(handler);