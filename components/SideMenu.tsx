import * as React from 'react'

type Props = {
  name: string
  click: number
  myBest: number
  globalBest: number
  newGame: () => void
}

const SideMenu = ({
  name = '',
  click = 0,
  myBest,
  globalBest,
  newGame,
}: Props) => (
  <div className="side-menu">
    <h1>Name:</h1>
    <h1>{name}</h1>
    <h1>Click:</h1>
    <h1>{click}</h1>
    <h1>My Best:</h1>
    <h1>{myBest || '-'}</h1>
    <h1>Global Best:</h1>
    <h1>{globalBest || '-'}</h1>
    <button onClick={newGame}>New Game</button>
  </div>
)

export default SideMenu
