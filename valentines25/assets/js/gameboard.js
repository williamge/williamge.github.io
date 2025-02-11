export const board = [
    "XXXXXXXXXX",
    "XOOOOOOOOX",
    "XOXOXXOXOX",
    "XOOOOOOOOX",
    "XOXOXXOXOX",
    "XOXOXXOXOX",
    "XOOOOOOOOX",
    "XOXOXXOXOX",
    "XOOOOOOOOX",
    "XXXXXXXXXX"
];

/**
 * Checks if the given position is a wall.
 * @param {number} x - The x-coordinate (column) of the position.
 * @param {number} y - The y-coordinate (row) of the position.
 * @returns {boolean} - Returns true if the position is a wall, false otherwise.
 */
export function isWall(x, y) {
    if (y < 0 || y >= board.length || x < 0 || x >= board[y].length) {
        return true; // Out of bounds is considered a wall
    }
    return board[y][x] === 'X';
}

/**
 * Checks if the given position is an open space.
 * @param {number} x - The x-coordinate (column) of the position.
 * @param {number} y - The y-coordinate (row) of the position.
 * @returns {boolean} - Returns true if the position is an open space, false otherwise.
 */
export function isOpenSpace(x, y) {
    if (y < 0 || y >= board.length || x < 0 || x >= board[y].length) {
        return false; // Out of bounds is not an open space
    }
    return board[y][x] === 'O';
}