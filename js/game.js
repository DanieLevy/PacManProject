'use strict'

const WALL = `##`
const FOOD = `<img src="img/dot.png" />`
const EMPTY = ' '
const SFOOD = `<img src="img/boost.png" />`
const EXTRA = `<img src="img/cherries.png" />`
var gGame = {
    score: 0,
    isOn: false
}

var gBoard
var gFoodCount
var gIsWin = false
var gIsSuperPower = false
var gEmptyCells
var gExtraInt
var gWinCounter

function init() {
    console.log('hello')
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    renderBoard(gBoard, '.board-container')
    gFoodCount = checkFood(gBoard)
    console.log('UP',gFoodCount);
    gGame.isOn = true
    gGame.score = 0
    gWinCounter = 0
    gExtraInt = setInterval(addExtra, 15000)
}

function buildBoard() {
    const SIZE = 10
    const board = []

    for (var i = 0; i < SIZE; i++) {
        board.push([])

        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL
            }

            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL
            }

            if (i === 1 && j === 1 ||
                i === 1 && j === SIZE - 2 ||
                i === SIZE - 2 && j === 1 ||
                i === SIZE - 2 && j === SIZE - 2) board[i][j] = SFOOD
        }

    }
    return board
}

function updateScore(diff) {
    gGame.score += diff
    gWinCounter +=1
    document.querySelector('h2 span').innerText = gGame.score
}


function checkFood(board) {
    var foodCount = 0
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var cell = board[i][j]
            if (cell === FOOD) foodCount++
        }
    }
    return (foodCount + 1)
}
function gameOver() {
    console.log('Game Over')
    gGame.isOn = false
    gIsWin = false
    gIsSuperPower = false
    clearInterval(gIntervalGhosts)
    clearInterval(gExtraInt)
    showModal()
}

function victory() {
    console.log('Victory')
    gGame.isOn = false
    gIsWin = true
    gIsSuperPower = false
    clearInterval(gIntervalGhosts)
    clearInterval(gExtraInt)
    showModal()
}

function restartGame() {
    hideModal()
    init()
}

function showModal() {
    var modalInfo = document.querySelector('.modalInfo')
    if (gIsWin) modalInfo.innerText = 'You Win!'
    else modalInfo.innerText = 'You Lose Bitch'
    document.querySelector('.modal-overlay').classList.remove('hidden')
}

function hideModal() {
    document.querySelector('.modal-overlay').classList.add('hidden')
}

function getEmptyCell(board) {
    var emptyCells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var currCell = board[i][j]
            if (currCell === EMPTY) {
                var emptyCell = { i, j }
                emptyCells.push(emptyCell)
            }
        }
    }
    console.log(emptyCells);
    return emptyCells
}

function addExtra() {
    if (gEmptyCells.length > 0) {
        const randomIdx = getRandomIntInclusive(0, gEmptyCells.length - 1)
        const randomObject = gEmptyCells[randomIdx]

        gBoard[randomObject.i][randomObject.j] = EXTRA
        renderCell(randomObject, EXTRA)
    }
}