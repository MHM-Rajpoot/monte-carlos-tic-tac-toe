document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('[data-cell]');
    const message = document.getElementById('message');
    const resetButton = document.getElementById('reset-button');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    let board = Array(9).fill('');
    let currentPlayer = 'X'; // Player X starts
    let gameOver = false;

    themeToggle.addEventListener('click', () => {
        // Toggle the 'dark-mode' class on the body
        body.classList.toggle('dark-mode');

        // Toggle the theme of the button and message text color
        if (body.classList.contains('dark-mode')) {
            themeToggle.title = 'Switch to Light Mode';
            themeToggle.setAttribute('aria-label', 'Switch to Light Mode');
            themeToggle.style.backgroundColor = '#000000'; // Dark mode button background color
            themeToggle.style.color = '#ffffff'; // Dark mode button text color
            message.style.color = '#ffffff'; // Dark mode message text color
        } else {
            themeToggle.title = 'Switch to Dark Mode';
            themeToggle.setAttribute('aria-label', 'Switch to Dark Mode');
            themeToggle.style.backgroundColor = '#ffffff'; // Light mode button background color
            themeToggle.style.color = '#000000'; // Light mode button text color
            message.style.color = '#000000'; // Light mode message text color
        }
    });

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
                simPlayer = 'Carlos';
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
