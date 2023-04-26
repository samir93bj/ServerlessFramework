const Responses = require('../common/API_responses');
const Dynamo = require('../common/Dynamo');
const { hooksWithValidation } = require('../common/hooks');
const yup = require('yup')

const tableName = process.env.tableName;

const bodySchema = yup.object().shape({
	score: yup.number().required()
});

const pathSchema = yup.object().shape({
	ID: yup.string().required()
}); 

const handler = async event => {
	try {
		const ID = event.pathParameters.ID;
		const { score } = event.body;

		const resp = await Dynamo.update({
			tableName,
			primaryKey: 'ID',
			primaryKeyValue: ID,
			updateKey: 'score',
			updateValue: score
		});

		const userUpdated = {
			ID,
			score
		}

		return Responses._200({ message: `User updated. ${userUpdated}`});
	} catch (error) {
		return Responses._500({ message: `Error: ${error}` });
	}
};

exports.handler = hooksWithValidation({ bodySchema, pathSchema })(handler)