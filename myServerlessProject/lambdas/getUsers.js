const Responses = require('./API_responses');

exports.handler = async (event) => {
	try {
		if (!event.pathParameters || !event.pathParameters.ID) {
			return Responses._400({mesage: "Missing the ID from the request"});
		}
	
		let ID = event.pathParameters.ID;
	
		if (data[ID]) {
			return Responses._200(data[ID]);
		}
	
		return Responses._400({mesage: "No ID in data"})
	} catch (err) {
		return Responses._400({mesage: err.message})
	}
	
}

const data = {
	12342: { name: 'Samir Mahmud', age: 25, job: 'Developer'},
	34234: { name: 'Martin Mahmud', age: 25, job: 'Developer 1'},
	12131: { name: 'Javier Mahmud', age: 25, job: 'Developer 2'}
}