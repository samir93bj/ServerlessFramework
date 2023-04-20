exports.handler = async (event) => {
	console.log('event', event);

	if (!event.pathParameters || !event.pathParameters.ID) {

	}

	let ID = event.pathParameters.ID;

	if (data[id]) {
		return data[id]
	}
}

const data = {
	12342: { name: 'Samir Mahmud', age: 25, job: 'Developer'},
	34234: { name: 'Martin Mahmud', age: 25, job: 'Developer 1'},
	12131: { name: 'Javier Mahmud', age: 25, job: 'Developer 2'}
}