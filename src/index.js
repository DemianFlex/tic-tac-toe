import ReactDom from 'react-dom'
import './index.css'
import { useState } from 'react'

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

    const handleClickEvent = (i) => {
        const newSquares = [...squares]

        const winnerDeclared = Boolean(calculateWinner(newSquares))
        const squareFilled = Boolean(newSquares[i])
        if(winnerDeclared || squareFilled) {
            return
        }

        newSquares[i] = xIsNext ? 'X' : 'O'
        setSquares(newSquares)
        setXIsNext(!xIsNext)
    }

    const renderSquare = (i) => {
        return (
            <Square
                value={squares[i]}
                onClickEvent={() => handleClickEvent(i)}
            />
        )
    }

    const winner = calculateWinner(squares)
    const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`

    return (
        <div className='board'>
            <div className='status'>{status}</div>
            <div className='board-row'>
                {renderSquare(1)}{renderSquare(2)}{renderSquare(3)}
            </div>
            <div className='board-row'>
                {renderSquare(4)}{renderSquare(5)}{renderSquare(6)}
            </div>
            <div className='board-row'>
                {renderSquare(7)}{renderSquare(8)}{renderSquare(9)}
            </div>
        </div>
    )
}

const Game = () => {
    return (
        <div className='game'>
            Tic-Tac-Toe
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