import { useState, useEffect } from "react";

import "../index.css";

function Cell() {
    // array com 9 posições para fazer o Board
    const emptyBoard = Array(9).fill("");
    const [board, setBoard] = useState(emptyBoard);
    // currentPlayer para definir o player que inicia e para alterar dps
    const [currentPlayer, setCurrentPlayer] = useState("O");
    const [winner, setWinner] = useState(null);

    // a ação de clicar (jogar)
    const handleCellClick = (index) => {
        if (winner) {
            window.alert("Jogo finalizado!");
            return null;
        }

        // verificação se a posição está vazia
        if (board[index] !== "") {
            window.alert("Posição ocupada");
            return null;
        }

        setBoard(
            board.map((item, itemIndex) =>
                itemIndex === index ? currentPlayer : item
            )
        );

        // verificar qual foi o jogador e alterar
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    };

    const checkWinner = () => {
        const possibleWins = [
            // Horizontal
            [board[0], board[1], board[2]],
            [board[3], board[4], board[5]],
            [board[6], board[7], board[8]],

            // Vertical
            [board[0], board[3], board[6]],
            [board[1], board[4], board[7]],
            [board[2], board[5], board[8]],

            // Diagonal
            [board[0], board[4], board[8]],
            [board[2], board[4], board[6]],
        ];

        possibleWins.forEach((cells) => {
            if (cells.every((cell) => cell === "O")) setWinner("O");
            if (cells.every((cell) => cell === "X")) setWinner("X");
            if (board.every((item) => item !== "")) setWinner("E");
        });
    };

    useEffect(checkWinner, [board]);

    const resetGame = () => {
        setCurrentPlayer("O");
        setBoard(emptyBoard);
        setWinner(null);
    };

    return (
        <div>
            <div className={`board ${winner ? "game-over" : ""}`}>
                {board.map((item, index) => (
                    <div
                        key={index}
                        // com esse className ta sendo possivel alterar a cor de acordo com o jogador
                        className={`cell ${item}`}
                        onClick={() => handleCellClick(index)}
                    >
                        {item}
                    </div>
                ))}
            </div>
            {winner && (
                <footer>
                    {winner === "E" ? (
                        <h2 className="winner-message">
                            <span className={winner}>Empatou!</span>
                        </h2>
                    ) : (
                        <h2 className="winner-message">
                            <span className={winner}>{winner}</span> Venceu!
                        </h2>
                    )}
                    <button onClick={resetGame}>Recomeçar jogo</button>
                </footer>
            )}
        </div>
    );
}

export default Cell;
