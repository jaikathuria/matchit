/*
* @description: Function takes in an array of elements and returns shuffles those a:
	* Creates and appends a tile to row element
	* @param {Array} array - Array of elements to be shuffled
	* @return {Array} - Array of shuffled elements 
*/
export const shuffle = (array) => {
	array = array.slice()
	let currentIndex = array.length, temporaryValue, randomIndex;
	// While there remain elements to shuffle...
	while (currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

	