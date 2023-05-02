const Responses = require('../common/API_Responses');

exports.handler = async event => {
	try {
		const { Records } = event;

		const promArray = Records.map(record => {
			const bucket = record.s3.bucket.name;
			const file = record.s3.object.key;
			const width = 300;
			const height = 300;
			return resizeImage({ bucket, file, width, height });
		});

		await Promise.all(promArray);

		return Responses._200({ message: 'Resize success.' });
	} catch (error) {
		return Responses._500({ message: `Error: , ${error.message}`});
	}
};