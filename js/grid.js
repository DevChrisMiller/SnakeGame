const gridMax = 21;
const gridMin = 1;

export function randomGridPosition() {
    return {
        x: Math.floor(Math.random() * gridMax) + 1,
        y: Math.floor(Math.random() * gridMax) + 1
    }
}

export function outsideGrid(position) {
    return (
        position.x < gridMin || position.x > gridMax ||
        position.y < gridMin || position.y > gridMax
    )
}