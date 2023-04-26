const Responses = require('../common/API_responses');
const Dynamo = require('../common/Dynamo');
const { hooksWithValidation } = require('../common/hooks');
const yup = require('yup')

const tableName = process.env.tableName;

const bodySchema = yup.object().shape({
	name: yup.string().optional(),
	score: yup.number().optional()
});

const pathParameters = yup.object().shape({
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

		return Responses._200({ message: `User updated. ${resp}`});
	} catch (error) {
		return Responses._500({ message: `Error: ${error.message}` })
	}
};

exports.handler = hooksWithValidation({ bodySchema, pathParameters })(handler)