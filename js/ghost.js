'use strict'

const GHOST = ''

var gGhosts = []
var gIntervalGhosts

const GHOST_IMG = {
    purple: 'img/purpleg.png',
    red: 'img/redg.png',
    darkblue: 'img/darkblueg.png',
    lightblue: 'img/lightblueg.png',
    yellow: 'img/yellowg.png',
    green: 'img/greeng.png',
}

function createGhost(board) {
    const names = Object.keys(GHOST_IMG)
    const random = names[Math.floor(Math.random() * names.length)]

    const ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        img: GHOST_IMG[random],
        defaultImg: GHOST_IMG[random]
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {
    gGhosts = []
    for (var i = 0; i < 5; i++) {
        createGhost(board)
    }
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        if (gIsSuperPower) {
            ghost.img = 'img/sickg.png'
            renderCell(ghost.location, getGhostHTML(ghost))
        } else ghost.img = ghost.defaultImg
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    const moveDiff = getMoveDiff();
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return
    if (nextCell === GHOST) return
    if (nextCell === SFOOD) return
    if (nextCell === EXTRA) return
    if (nextCell === PACMAN) if (gIsSuperPower) return
       else {
        renderCell(nextLocation, `<img src="img/dead.png" />`)
        gameOver()
        return 
    }

    // model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent

    // DOM
    renderCell(ghost.location, ghost.currCellContent)

    // model
    ghost.location = nextLocation
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    gBoard[ghost.location.i][ghost.location.j] = GHOST

    // DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    if (gIsSuperPower) return `<img src="img/sickg.png" />`
    else return `<img src="${ghost.img}" />`
}

function renderGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]))
    }
}