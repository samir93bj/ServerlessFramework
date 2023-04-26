const { useHooks, logEvent, parseEvent, handleUnexpectedError } = require('lambda-hooks');

const withHooks = useHooks({
	before: [logEvent, parseEvent, validateEventBody, validatePaths],
	after:[],
	onError: [handleUnexpectedError]
});

const hooksWithValidation = ({ bodySchema, pathSchema }) => {
	return useHooks({
		before: [logEvent, parseEvent ],
		after:[],
		onError: [handleUnexpectedError]
	}, {
		bodySchema,
		pathSchema
	})
}

const validateEventBody = async state => {
	try {
		const { bodySchema } = state.config;

		if (!bodySchema) throw Error('Missing the required body.');

		const { event } = state;

		await bodySchema.validate(event.body, { strict: true });
	} catch (error) {
		console.log('Yup validation error of event.body ', error.message);
		state.exit = true
		state.response = { statusCode: 400, body: JSON.stringify({ error: error.message }) }
	}

	return state;
}

const validatePaths = async state => {
	try {
		const { pathSchema } = state.config;

		if (!pathSchema) throw Error('Missing the required path.');

		const { event } = state;

		await pathSchema.validate(event.pathParamethers, { strict: true });
	} catch (error) {
		console.log('Yup validation error of path parameters ', error.message);
		state.exit = true
		state.response = { statusCode: 400, body: JSON.stringify({ error: error.message }) }
	}

	return state;
}

module.exports = {
	withHooks,
	hooksWithValidation
}