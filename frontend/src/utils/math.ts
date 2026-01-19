// Returns an element between 0 and 3, to index the board
const getRandomPosition = (): number => Math.ceil(Math.random() * 4) - 1;

export { getRandomPosition };
