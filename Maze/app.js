const arr = [
    ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ['#', '+', '+', '+', '#', '+', '+', '+', '#'],
    ['#', '+', '#', '+', '#', '+', '#', '+', '#'],
    ['+', '+', '#', '+', '0', '+', '#', '+', '#'],
    ['#', '#', '#', '+', '#', '#', '#', '#', '#'],
    ['#', '#', '+', '+', '#', '#', '#', '#', '#'],
    ['#', '#', '+', '#', '#', '#', '#', '#', '#'],
    ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
];

function mazeSolving(maze) {
    let result = [];

    function checkPath(start, end) {
        maze[start.y][start.x] = '0';//define each passed element as '0'

        let siblings = getValidSib(start);
        //check if there any possible ways
        if (siblings.length > 0) {

            for (let i = 0; i < siblings.length; i++) {
                let current = siblings[i];
                let isSolved = current.x === end.x && current.y === end.y;//check if the possible way is the exit
                let notVisited = maze[current.y][current.x] !== '0';//check if the possible way has been visited already
                result.push(current.direct);//add the possible way to our resulting array

                if (isSolved || (notVisited && checkPath(current, end))) {//using recursion, invoke our function which goes through the whole route and return true
                    return true;
                }
            }
        }

        return false;
    }

    function getValidSib(cord) {
        let { x, y } = cord;
        let cords = [];
        //define all possible steps
        if (maze[y - 1] !== undefined) {
            cords.push({ x: x, y: y - 1, val: maze[y - 1][x], direct: 'top' });
        }

        if (maze[y + 1] !== undefined) {
            cords.push({ x: x, y: y + 1, val: maze[y + 1][x], direct: 'bottom' })
        }

        if (maze[y][x - 1] !== undefined) {
            cords.push({ x: x - 1, y: y, val: maze[y][x - 1], direct: 'left' })
        }

        if (maze[y][x + 1] !== undefined) {
            cords.push({ x: x + 1, y: y, val: maze[y][x + 1], direct: 'right' })
        }
        //choose only options marked as '+' (way)
        return cords.filter(el => el.val === '+');
    }
    checkPath({ x: 4, y: 3 }, { x: 0, y: 3 });
    return result;
}
console.log(mazeSolving(arr));
