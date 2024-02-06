import ReactDom from 'react-dom'
import './index.css'
import { useState } from 'react'
import Restart from './img/restart.png'

const Square = (props) => {
    return (
        <button
            className='square'
            onClick={props.onClickEvent}
        >
            {props.value}
        </button>
    )
}

const Board = () => {
    const initialSquares = Array(9).fill(null)
    const [squares, setSquares] = useState(initialSquares)
    const [xIsNext, setXIsNext] = useState(true)
    const [gameOver, setGameOver] = useState(false)

    const handleClickEvent = (i) => {
        if (gameOver || squares[i]) return
        const newSquares = [...squares]
        newSquares[i] = xIsNext ? 'X' : 'O'
        setSquares(newSquares)
        setXIsNext(!xIsNext)

        const winner = calculateWinner(newSquares)
        const boardFull = newSquares.every(square => square !== null)
        if (winner || boardFull) {
            setGameOver(true)
        }
    }

    const renderSquare = (i) => {
        return (
            <Square
                value={squares[i]}
                onClickEvent={() => handleClickEvent(i)}
            />
        )
    }

    const restartGame = () => {
        setSquares(initialSquares)
        setXIsNext(true)
        setGameOver(false)
    }

    const winner = calculateWinner(squares)
    const status = winner ? `Winner: ${winner}` : gameOver ? 'Draw' : `Next player: ${xIsNext ? 'X' : 'O'}`

    return (
        <div className='board'>
            <div className='status'>
                {status}
                {gameOver &&
                    <div className='restart-btn' onClick={restartGame}>
                        <img
                            src={Restart}
                            alt='Restart Button'
                        />
                        Restart
                    </div>
                }

            </div>
            <div className='board-row'>
                {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
            </div>
            <div className='board-row'>
                {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
            </div>
            <div className='board-row'>
                {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
            </div>
        </div>
    )
}

const Game = () => {
    return (
        <div className='game'>
            <div className='header'>
                Tic-Tac-Toe
            </div>
            <Board />
        </div>
    )
}

ReactDom.render(
    <Game />,
    document.getElementById('root')
)

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    for (let line of lines) {
        const [a, b, c] = line
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }

    return null
}