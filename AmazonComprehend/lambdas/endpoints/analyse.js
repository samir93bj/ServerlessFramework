const Response = require('../common/API_Responses');
const AWS = require('aws-sdk');

const Comprehend = new AWS.Comprehend();

exports.handler = async event => {
	try {
		const body = JSON.parse(event.body);

    if (!body || !body.text) {
        return Response._400({ message: 'no text field on the body' });
    }

    const text = body.text;

    const params = {
        LanguageCode: 'en',
        TextList: [text],
    };

		const entityResults = await Comprehend.batchDetectEntities(params).promise();
		const entities = entityResults.ResultList[0];

		const sentimentResults = await Comprehend.batchDetectSentiment(params).promise();
		const sentiment = sentimentResults.ResultList[0];

		const responseData = [entities, sentiment];

		return Response._200({ message: responseData });
	} catch (error) {
		return Response._500({ message: error.message});	
	}
}