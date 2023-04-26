const Responses = require('../common/API_responses');
const Dynamo = require('../common/Dynamo');
const { hooksWithValidation } = require('../common/hooks');
const yup = require('yup');

const tableName = process.env.tableName;

const bodySchema = yup.object().shape({});

const pathSchema = yup.object().shape({
	ID: yup.string().required()
});

handler = async event => {
		try {
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
	} catch (error) {
		return Responses._500({ message: `Error: , ${error.errorMessage}`});
	}
	
};

exports.handler =  hooksWithValidation({ bodySchema, pathSchema })(handler);