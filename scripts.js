const gameBoard = (() => {
    let counter = 0;
    let board = [["", "", ""], ["", "", ""], ["", "", ""]];

    const getBoard = () => {
        return board;
    }

    const getCounter = () => {
        return counter;
    }

    const onClick = (e) => {
        const target = e.target;
        let dataValues;
        if (target.classList.value.includes("text")) {
            dataValues = target.parentElement.getAttribute("data-val").split(" ");
        }
        else {
            dataValues = target.getAttribute("data-val").split(" ");
        }

        changeValue(dataValues[0], dataValues[1]);
        displayController.renderArray(board);
        if (checkBoard("X") || checkBoard("O") || checkTie()) {
            if (checkBoard("X")) displayController.renderWinner("X");
            else if (checkBoard("O")) displayController.renderWinner("O");
            else if (checkTie()) displayController.renderTie();

            removeEventListenerFromBox();
        }
        else displayController.renderPlayerTurn(counter);
        
    }

    const restart = () => {
        board = [["", "", ""], ["", "", ""], ["", "", ""]];
        counter = 0;
        console.log(board);
        addEventListenerToBox();
        displayController.renderArray(board);
        displayController.renderPlayerTurn(counter);
    }

    const changeValue = (row, column) => {
        if (board[row][column] != "") return;

        if (counter % 2 == 0) board[row][column] = "X";
        else board[row][column] = "O";

        counter+=1;
    }

    const checkRows = (symbol) => {
        for (const row of board) {
            if (row.every(element => element === symbol)) return true;
        }
        return false;
    }
            
    const checkColumns = (symbol) => {
        let win = false;
        for (let i = 0; i < board[0].length; i++) {
            let arrayOfSymbols = [];

            board.forEach(element => {
                arrayOfSymbols.push(element[i]);
            });

            if (arrayOfSymbols.every(val => val === symbol)) return true;
        }
        return false;
    }

    const checkDiagonals = (symbol) => {
        if (board[0][0] === symbol && board[1][1] === symbol && board[2][2] === symbol) return true;
        if (board[0][2] === symbol && board[1][1] === symbol && board[2][0] === symbol) return true;

        return false;
    }

    const checkBoard = (symbol) => {
        return checkRows(symbol) || checkColumns(symbol) || checkDiagonals(symbol);
    }

    const checkTie = () => {
        for (const row of board) {
            if (!(row.every(val => val != ""))) return false; 
        }
        return true;
    }

    const addEventListenerToBox = () => {
        const boardElement = document.querySelector(".board");
        const rowsArray = Array.from(boardElement.children);

        rowsArray.forEach(element => {
            const boxesArray = Array.from(element.children);
            
            boxesArray.forEach(element2 => {
                element2.addEventListener("click", onClick);
            })
        });
    }

    const removeEventListenerFromBox = () => {
        const boardElement = document.querySelector(".board");
        const rowsArray = Array.from(boardElement.children);

        rowsArray.forEach(element => {
            const boxesArray = Array.from(element.children);
            
            boxesArray.forEach(element2 => {
                element2.removeEventListener("click", onClick);
            })
        });
    }

    const addEventListenerToRestart = () => {
        const restartButton = document.querySelector(".restart");
        restartButton.addEventListener("click", restart);
    }

    return {getBoard,
            getCounter,
            addEventListenerToBox,
            addEventListenerToRestart};
})();

const Player = () => {
    let wins = 0;
    const getWins = () => {
        return wins;
    }
    const addWin = () => wins += 1;

    return {getWins, addWin};
}

const displayController = (() => {
    const renderArray = ((board) => {
        const boardArray = board;
        const boardElement = Array.from(document.querySelector(".board").children);
        for (let i = 0; i < boardArray.length; i++) {
            const boxElements = Array.from(boardElement[i].children);
            for (let j = 0; j < boardArray.length; j++) {
                boxElements[j].firstElementChild.innerText = boardArray[i][j];
            }
        }
    });

    const renderPlayerTurn = ((counter) => {
        const turnDiv = document.querySelector(".turn");
        if (counter % 2 == 0) turnDiv.innerText = "Player X's Turn";
        else turnDiv.innerText = "Player O's Turn";
        
    });

    const renderWinner = ((symbol) => {
        const turnDiv = document.querySelector(".turn");
        if (symbol === "X") turnDiv.innerText = "Player X Wins!";
        else turnDiv.innerText = "Player O Wins!";
    });

    const renderTie = (() => {
        const turnDiv = document.querySelector(".turn");
        turnDiv.innerText = "Tie!";
    });

    const addDataTags = (() => {
        const boardElement = Array.from(document.querySelector(".board").children);
        for (let i = 0; i < boardElement.length; i++) {
            const boxElements = Array.from(boardElement[i].children);
            for (let j = 0; j < boardElement.length; j++) {
                boxElements[j].setAttribute("data-val", `${i} ${j}`);
            }
        }
    });
    
    return {
        renderArray,
        renderPlayerTurn,
        renderWinner,
        renderTie,
        addDataTags
    }
})();

const player1 = Player();
const player2 = Player();


gameBoard.addEventListenerToBox();
gameBoard.addEventListenerToRestart();
displayController.addDataTags();
displayController.renderArray(gameBoard.getBoard());
displayController.renderPlayerTurn(gameBoard.getCounter());