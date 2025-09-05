# Monte Carlo Tic Tac Toe

A simple implementation of the classic Tic Tac Toe game with a Monte Carlo simulation-based AI opponent.

## Game Description

This game allows a human player to play against an AI opponent, "Carlos", which uses a Monte Carlo simulation to determine its moves. The game features a simple GUI with a 3x3 grid, where the player can click on empty cells to make their moves. The game also includes a theme toggle button to switch between light and dark modes.

## Features

* Human vs AI gameplay  
* Monte Carlo simulation-based AI opponent  
* Theme toggle button for light and dark modes  
* Restart button to start a new game  

## How to Play

1. Open the game in a web browser.  
2. Click on an empty cell to make a move.  
3. The AI opponent, "Carlos", will make its move after a short delay.  
4. Keep playing until either you or Carlos wins, or the game ends in a draw.  
5. Click the restart button to start a new game.  

## Monte Carlo Simulation

The Monte Carlo simulation is a method used to estimate the best move for the AI opponent. It works by simulating many random games and calculating the average score for each possible move.  

The score for a move \( i \) is computed as:

$$
S_i = \frac{W_i + 0.5 \cdot D_i}{N}
$$

Where:

- $\( W_i \)$ = number of simulations where the AI opponent wins after making move $\( i \)$  
- $\( D_i \)$ = number of simulations where the game ends in a draw after making move $\( i \)$  
- $\( N \)$ = total number of simulations  

The best move \( i^* \) is then chosen as:

$$
i^* = \underset{i}{\mathrm{argmax}} \; S_i
$$

## Code Structure

The game is implemented in JavaScript, HTML, and CSS. The JavaScript code is divided into several functions:

* `makeAiMove()`: Makes a move for the AI opponent using the Monte Carlo simulation.  
* `monteCarloSimulation()`: Runs the Monte Carlo simulation to estimate the best move.  
* `checkGameResult()`: Checks if the game has ended and returns the result.  
