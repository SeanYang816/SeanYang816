const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const board = document.getElementById('board');
const cellElements = document.querySelectorAll('[data-cell]')
const winningMsgTxtElement = document.querySelector('[data-winning-msg-txt]')
const WinningMsgElement = document.querySelector('.winning-msg')
const restartBtn = document.getElementById('restartBtn');
let circleTurn;
const WINNING_COMBINATIONS = [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6]
]

restartBtn.addEventListener('click', startTheGame)

startTheGame()

function startTheGame() {
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.addEventListener('click', handleClick, { once: true })
    })
    WinningMsgElement.classList.remove('show')
    setBoardHoverClass()

}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? X_CLASS : CIRCLE_CLASS;
    placeMark(cell, currentClass)
    //place the mark
    //check for win 
    //check for draw
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurn()
        setBoardHoverClass()
    }
}
function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}
function endGame(draw) {
    if (draw) {
        winningMsgTxtElement.innerText = `It is a Draw!`;
    } else {
        winningMsgTxtElement.innerText = `${circleTurn ? "X's" : "O's"} Win!`;
    }
    WinningMsgElement.classList.add('show')

}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurn() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(X_CLASS)
    } else {
        board.classList.add(CIRCLE_CLASS)

    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}