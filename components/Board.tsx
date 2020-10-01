import React, {
  forwardRef,
  RefObject,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'

type Props = {
  increaseClick: () => void
  finish: () => void
  ref: RefObject<any>
}

type Card = {
  index: number
  number: number
  isReveal: boolean
}

const Board = forwardRef(({ increaseClick, finish }: Props, ref) => {
  const [board, setBoard] = useState([] as Card[])
  const [firstReveal, setFirstReveal] = useState<Card | undefined>(undefined)
  const [clickable, setClickable] = useState(true)

  useImperativeHandle(ref, () => ({
    newGame() {
      initBoard()
    },
  }))

  const initBoard = () => {
    const cards: Card[] = []
    for (let i = 1; i <= 6; i++) {
      cards.push({
        index: 0,
        number: i,
        isReveal: false,
      })
      cards.push({
        index: 0,
        number: i,
        isReveal: false,
      })
    }
    const firstBoard: Card[] = []
    for (let i = 11; i >= 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1))
      firstBoard.push(Object.assign(cards[rand], { index: firstBoard.length }))
      cards.splice(rand, 1)
    }
    setBoard(firstBoard)
    setFirstReveal(undefined)
    setClickable(true)
  }

  const reveal = (index: number) => {
    const tBoard = [...board]
    const currentCard = tBoard[index]
    if (clickable && currentCard.isReveal === false) {
      setClickable(false)
      currentCard.isReveal = true
      increaseClick()
      setBoard(tBoard)
      setTimeout(() => {
        if (!firstReveal) {
          setFirstReveal(currentCard)
        } else if (currentCard.number !== firstReveal.number) {
          currentCard.isReveal = false
          tBoard[firstReveal.index].isReveal = false
          setFirstReveal(undefined)
          setBoard(tBoard)
        } else {
          checkFinish()
          setFirstReveal(undefined)
        }
        setClickable(true)
      }, 250)
    }
  }

  const checkFinish = () => {
    const isFinished = board.every((card) => card.isReveal)
    if (isFinished) {
      finish()
    }
  }

  return (
    <div className="board">
      {board.map((card, i) => (
        <div className="card" key={i} onClick={() => reveal(i)}>
          <div className={`card-body ${card.isReveal ? 'reveal' : ''}`}>
            {card.isReveal ? <div>{card.number}</div> : null}
          </div>
        </div>
      ))}
    </div>
  )
})

export default Board
