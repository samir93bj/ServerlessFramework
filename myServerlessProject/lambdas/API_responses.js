const Responses = {
	_200(data = {}){
		return {
			Headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Methods': '*',
				'Access-Control-Allow-Origin': '*'
			},
			stausCode: 200,
			body: JSON.stringify(data)
		}
	},
	_400(data = {}){
		return {
			Headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Methods': '*',
				'Access-Control-Allow-Origin': '*'
			},
			stausCode: 400,
			body: JSON.stringify(data)
		}
	}
}

module.exports = Responses