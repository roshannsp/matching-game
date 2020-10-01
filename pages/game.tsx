import React, { useEffect, useRef, useState } from 'react'
import SideMenu from '../components/SideMenu'
import Board from '../components/Board'
import {
  getGlobalBest,
  getMyBest,
  getScoreAction,
  setGlobalBestAction,
  setScoreAction,
} from '../store/score'
import { useDispatch, useSelector } from 'react-redux'
import LoginModal from '../components/LogInModal'
import { getName } from '../store/login'

const Game = () => {
  const [click, setClick] = useState(0)
  const refBoard = useRef<any>()
  const dispatch = useDispatch()
  const name = useSelector(getName)
  const myBest = useSelector(getMyBest)
  const globalBest = useSelector(getGlobalBest)

  useEffect(() => {
    if (name) {
      newGame()
      dispatch(getScoreAction(name))
    }
  }, [name])

  const newGame = () => {
    refBoard?.current?.newGame()
    setClick(0)
  }

  const increaseClick = () => {
    setClick(click + 1)
  }

  const finish = () => {
    const score = { name, score: click + 1 }
    dispatch(setScoreAction(score))
    if (score.score < globalBest) {
      dispatch(setGlobalBestAction(score))
    }
  }

  return (
    <div>
      {!name ? (
        <LoginModal></LoginModal>
      ) : (
        <div className="game">
          <SideMenu
            name={name}
            click={click}
            myBest={myBest}
            globalBest={globalBest}
            newGame={newGame}
          ></SideMenu>
          <Board
            ref={refBoard}
            increaseClick={increaseClick}
            finish={finish}
          ></Board>
        </div>
      )}
    </div>
  )
}

export default Game
