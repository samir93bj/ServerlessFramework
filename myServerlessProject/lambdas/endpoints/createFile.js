const Responses = require('../common/API_responses');
const S3 = require('../common/S3');

const bucket = process.env.bucketName;

exports.handler = async event => {
	try {
		if (!event.pathParameters || !event.pathParameters.fileName) {
			return Responses._400({ message: 'missing the fiileName from the path' });
		}

		const fileName = event.pathParameters.fileName;
		const data = JSON.parse(event.body);

		const newData = await S3.write(data, fileName, bucket);

		if (!newData) {
			return Responses._400({ message: `Error in S3 write  ${newData}` })
		}

		return Responses._200({ newData })
	} catch (err) { 
		return Responses._500({ message: `Failed: ${err.message}` })
	}
	
};