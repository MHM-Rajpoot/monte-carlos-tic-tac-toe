
document.addEventListener('DOMContentLoaded', () => {
    
    const cells = document.querySelectorAll('[data-cell]');
    const message = document.getElementById('message');
    const resetButton = document.getElementById('reset-button');

    let board = Array(9).fill('');
    let currentPlayer = 'X'; // Player X starts
    let gameOver = false;

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            if (!gameOver && board[index] === '') {
                board[index] = currentPlayer;
                cell.innerText = currentPlayer;
                currentPlayer = 'Carlos' ;
                checkGameResult();

                if (currentPlayer === 'Carlos') {
                    setTimeout(makeAiMove, 500);
                }
            }
        });
    });

    resetButton.addEventListener('click', () => {
        resetGame();
    });

    function resetGame() {
        board = Array(9).fill('');
        currentPlayer = 'X';
        message.innerText = 'Player X\'s Turn';
        cells.forEach(cell => {
            cell.innerText = '';
        });
        gameOver = false;
    }

    function updateBoard() {
        cells.forEach((cell, index) => {
            cell.innerText = board[index];
        });
    }

    function checkGameResult() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                message.innerText = `Player ${board[a]} Wins!`;
                gameOver = true;
                return;
            }
        }

        if (!board.includes('')) {
            message.innerText = 'It\'s a Draw!';
            gameOver = true;
            return;
        }

        message.innerText = `Player ${currentPlayer}'s Turn`;
    }

    function makeAiMove() {
        if (!gameOver) {
            const bestMove = monteCarloSimulation(board, 'Carlos', 1000); // Simulate 1000 games
            board[bestMove] = 'Carlos';
            cells[bestMove].innerText = 'O';
            currentPlayer = 'X';
            checkGameResult();
        }
    }

    // Monte Carlo simulation for Carlos's moves
    function monteCarloSimulation(board, player, numSimulations) {
        const emptyCells = board.reduce((acc, val, index) => {
            if (val === '') acc.push(index);
            return acc;
        }, []);

        const scores = Array(9).fill(0);

        for (let i = 0; i < numSimulations; i++) {
            const simBoard = [...board];
            const randomEmptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            simBoard[randomEmptyCell] = player;

            // Simulate the rest of the game randomly
            let simPlayer = player === 'X' ? 'Carlos' : 'X';
            while (true) {
                const availableMoves = simBoard.reduce((acc, val, index) => {
                    if (val === '') acc.push(index);
                    return acc;
                }, []);

                if (availableMoves.length === 0 || checkGameResultForSimulation(simBoard)) {
                    break;
                }

                const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
                simBoard[randomMove] = simPlayer;
                simPlayer = simPlayer === 'X' ? 'Carlos' : 'X';
            }

            const simResult = checkGameResultForSimulation(simBoard);
            if (simResult === player) {
                scores[randomEmptyCell]++;
            } else if (simResult === 'Draw') {
                scores[randomEmptyCell] += 0.5;
            }
        }

        // Find the move with the highest average score
        let bestMoveIndex = -1;
        let bestMoveScore = -Infinity;
        for (let i = 0; i < scores.length; i++) {
            if (scores[i] > bestMoveScore && board[i] === '') {
                bestMoveScore = scores[i];
                bestMoveIndex = i;
            }
        }

        return bestMoveIndex;
    }

    function checkGameResultForSimulation(board) {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        if (!board.includes('')) {
            return 'Draw';
        }

        return null;
    }

    resetGame();
});