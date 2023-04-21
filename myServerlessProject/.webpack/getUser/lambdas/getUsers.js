/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

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

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
const Responses = __webpack_require__(1);

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
})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;