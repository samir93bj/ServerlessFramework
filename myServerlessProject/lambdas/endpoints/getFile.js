const Responses = require('../common/API_responses');
const S3 = require('../common/S3');

const bucket = process.env.bucketName;

exports.handler = async event => {
	try {
		if (!event.pathParameters || !event.pathParameters.fileName) {
			return Responses._400({ message: 'missing the fiileName from the path' });
		}

		const fileName = event.pathParameters.fileName;

		const file = await S3.get(fileName, bucket);

		if (!file) {
			return Responses._400({ message: `Error in S3 read  ${file}` })
		}

		return Responses._200({ file })
	} catch (err) { 
		return Responses._500({ message: `Failed: ${err.message}` })
	}
	
};