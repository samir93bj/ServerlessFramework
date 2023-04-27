const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const handler = async (event) => {
	try {
		if (!event.pathParameters.game) {
			return Responses._400({ message: 'missing the game from the path' });
		}

		const game = event.pathParameters.game;
		const gamePLayers = await Dynamo.query({
			tableName,
			index: 'game-index',
			queryKey: game
		})

		return Responses._200({ gamePLayers });
	} catch (error) {
		return Responses._500({message: `Error: ${error}`} );
	}
}
