const Responses = require('../common/API_responses');
const Dynamo = require('../common/Dynamo');
const { hooksWithValidation } = require('../common/hooks');
const  yup = require('yup');

const tableName = process.env.tableName;

const bodySchema = yup.object().shape({
	name: yup.string().required(),
	score: yup.number().required()
});

const pathSchema = yup.object().shape({
	ID: yup.string().required()
});

const handler = async event => {
	try {
		const user = event.body;
		user.ID = event.pathParameters.ID;

		const newUser = await Dynamo.write(user, tableName)

		if (!newUser) {
			return Responses._400({ message: `Failed to create user By ID ${newUser}` })
		}

		return Responses._200({ newUser })
	} catch (err) { 
		return Responses._500({ message: `Failed: ${err.message}` })
	}
	
};

exports.handler = hooksWithValidation({ bodySchema, pathSchema })(handler);