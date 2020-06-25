import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setStartingCell } from '../../actions/startingCell';
import { setCurrentCell } from '../../actions/currentCell';
import { setArrow } from '../../actions/arrows';
import './app.scss';

const App = ({ setStartingCell, startingCell, setCurrentCell, currentCell, setArrow, arrows }) => {
    const alphabet = ["a", "b", "c"];
    const [count, setCount] = useState(0);
    const [gameStatus, setGameStatus] = useState('game');
    const [lostCell, setLostCell] = useState('');

    useEffect(() => {
        if (gameStatus === 'you lost' || gameStatus === 'you won') {
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        }
    }, [gameStatus])

    useEffect(() => {
        if (!startingCell) {
            const axisX = Math.round(1 - 0.5 + Math.random() * 3);
            const axisY = Math.round(1 - 0.5 + Math.random() * 3);
            setStartingCell(`${axisX}${axisY}`);
            setCurrentCell(`${axisX}${axisY}`);
        }
    }, [])

    useEffect(() => {
        if (count >= 10) {
            setGameStatus('your turn')
            return
        }

        if (!currentCell) {
            return
        }

        setCount(count + 1)

        setTimeout(() => {
            let moveDirection = Math.round(1 - 0.5 + Math.random() * 2);
            let coordinateAxis = Math.round(1 - 0.5 + Math.random() * 2);
            if (moveDirection === 2) moveDirection = -1;

            let selectedCell = currentCell.split('')
            let axisValue = +selectedCell[coordinateAxis - 1]

            selectedCell[coordinateAxis - 1] = axisValue + moveDirection;
            if (+selectedCell[coordinateAxis - 1] < 1) {
                selectedCell[coordinateAxis - 1] = axisValue + 1;
            }
            if (+selectedCell[coordinateAxis - 1] > 3) {
                selectedCell[coordinateAxis - 1] = axisValue - 1
            }

            if (coordinateAxis === 2 && +selectedCell[coordinateAxis - 1] < axisValue) {
                setArrow('up', count)
            }

            if (coordinateAxis === 2 && +selectedCell[coordinateAxis - 1] > axisValue) {
                setArrow('down', count)
            }

            if (coordinateAxis === 1 && +selectedCell[coordinateAxis - 1] < axisValue) {
                setArrow('left', count)
            }

            if (coordinateAxis === 1 && +selectedCell[coordinateAxis - 1] > axisValue) {
                setArrow('right', count)
            }

            if (count >= 10) setGameStatus('your turn')
            setCurrentCell(selectedCell.join(''))
        }, 1000)
    }, [currentCell])

    const showResult = e => {
        if (gameStatus === 'game' || gameStatus === 'you lost') return;
        setStartingCell('');
        if (e.target.dataset.id !== currentCell && gameStatus !== 'you won') {
            setGameStatus('you lost')
            setLostCell(e.target.dataset.id)
        }
        if (e.target.dataset.id === currentCell && gameStatus !== 'you lost') {
            setGameStatus('you won');
        }
    }

    return (
        <div className="page">
            <div className="maze">
                <div className="maze__row-numbers">
                    {new Array(3).fill('').map((elem, index) => {
                        return (
                            <div className="maze__row-numbers_item" key={index}>
                                {index + 1}
                            </div>
                        )
                    })}
                </div>
                {new Array(3).fill('').map((elem, columnIndex) => {
                    return (
                        <div className="maze__column" key={columnIndex} >
                            <div className="maze__column-number">
                                {alphabet[columnIndex]}
                            </div>
                            {
                                new Array(3).fill('').map((elem, index) => {
                                    return (
                                        <div
                                            className="maze__cell"
                                            key={index}
                                            data-id={`${columnIndex + 1}${index + 1}`}
                                            onClick={showResult}
                                        >
                                            {startingCell === `${columnIndex + 1}${index + 1}` && 'START'}
                                            {currentCell === `${columnIndex + 1}${index + 1}` && gameStatus === 'you won' ? gameStatus : ''}
                                            {lostCell === `${columnIndex + 1}${index + 1}` && gameStatus}
                                            {currentCell === `${columnIndex + 1}${index + 1}` && gameStatus === 'you lost' ? 'that`s it' : ''}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })}
            </div >
            <div className="arrows-container">
                {
                    [...arrows].map((elem, index) => {
                        return (
                            <div className="arrows-container__arrow" key={index}>
                                <i className={`fas fa-arrow-${elem}`}></i>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}


const mapState = (state) => ({
    startingCell: state.startingCell.startingCell,
    currentCell: state.currentCell.currentCell,
    arrows: state.arrows.arrows,
})

const mapDispatch = {
    setStartingCell,
    setCurrentCell,
    setArrow,
}

export default connect(mapState, mapDispatch)(App)