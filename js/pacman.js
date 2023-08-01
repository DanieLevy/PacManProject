'use strict'

const PACMAN = `<img src="img/pacman.png" />`
var gPacman;
var gEatenGhosts = []

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    gEmptyCells = getEmptyCell(gBoard)
    if (!gGame.isOn) return
    const nextLocation = getNextLocation(ev)

    if (!nextLocation) return

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    
    if (nextCell === WALL) return
    if (nextCell === FOOD) updateScore(1)
    if (nextCell === EXTRA) {
        gGame.score += 15
        document.querySelector('h2 span').innerText = gGame.score
    }
    if (nextCell === SFOOD) {
        if (gIsSuperPower) return
        else {
            renderGhosts()
            console.log('Here');
            gIsSuperPower = true
            setTimeout(() => {
                gIsSuperPower = false
            }, 5000)
        }
    }

    else if (nextCell === GHOST) {
        if (gIsSuperPower) {
            var ghost = findGhostByLocation(nextLocation)
            removeEatenGhost(nextLocation)
            setTimeout(() => {
                reviveEatenGhosts()
            }, 5000)
            // if (ghost.currCellContent === FOOD) updateScore(1)
        }
        else {
            gameOver()
            renderCell(gPacman.location, `<img src="img/dead.png" />`)
            return
        }
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // update the DOM
    renderCell(gPacman.location, PACMAN)

    if (gFoodCount === gWinCounter) victory()
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}

function removeEatenGhost(ghostLocation) {
    for (let i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === ghostLocation.i && gGhosts[i].location.j === ghostLocation.j) {
            gEatenGhosts.push(gGhosts.splice(i, 1)[0]);
        }
    }
}

function reviveEatenGhosts() {
    for (let i = 0; i < gEatenGhosts.length; i++) {
        gGhosts.push(gEatenGhosts.splice(i, 1)[0]);
    }
}

function findGhostByLocation(location) {
    for (let i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === location.i && gGhosts[i].location.j === location.j) {
            return gGhosts[i];
        }
    }
    return null;
}