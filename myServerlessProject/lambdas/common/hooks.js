const { useHooks, logEvent, parseEvent, handleUnexpectedError } = require('lambda-hooks');

const withHooks = useHooks({
	before: [logEvent, parseEvent],
	after:[],
	onError: [handleUnexpectedError]
});

const hooksWithValidation = ({ bodySchema, pathSchema }) => {
	return useHooks({
		before: [logEvent, parseEvent],
		after:[],
		onError: [handleUnexpectedError]
	}, {
		bodySchema,
		pathSchema
	})
}

module.exports = {
	withHooks,
	hooksWithValidation
}