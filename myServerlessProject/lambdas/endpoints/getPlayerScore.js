const Responses = require('../common/API_responses');

const tableName = process.env.tableName;

exports.handler = async event => {
	if (!event.pathParameters || !event.pathParameters.ID) {
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