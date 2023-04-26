const Responses = require('../common/API_responses');
const Dynamo = require('../common/Dynamo');
const { withHooks } = require('../common/hooks');
const  yup = require('yup');

const tableName = process.env.tableName;

const handler = async event => {
	try {
		if (!event.pathParameters.ID) {
			return Responses._400({ message: 'missing the ID from the path' });
		}

		const user = event.body;

		user.ID = event.pathParameters.ID;
		console.log(user)

		const newUser = await Dynamo.write(user, tableName)

		if (!newUser) {
			return Responses._400({ message: `Failed to create user By ID ${newUser}` })
		}

		return Responses._200({ newUser })
	} catch (err) { 
		return Responses._500({ message: `Failed: ${err.message}` })
	}
	
};

exports.handler = withHooks(handler)