import '../styles/index.scss'
import React, { useEffect } from 'react'
import Head from 'next/head'
import Game from './game'

import thunk from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux'
import rootReducer from '../store/index'
import { Provider } from 'react-redux'

const App = () => {
  useEffect(() => {
    window.document.addEventListener('contextmenu', (event) =>
      event.preventDefault()
    )
    window.document.onkeydown = function (e) {
      if (e.keyCode == 123) {
        console.log('You cannot inspect Element')
        return false
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        console.log('You cannot inspect Element')
        return false
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        console.log('You cannot inspect Element')
        return false
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        console.log('You cannot inspect Element')
        return false
      }
      if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        console.log('You cannot inspect Element')
        return false
      }
    }
  }, [])

  const store = createStore(rootReducer, applyMiddleware(thunk))
  return (
    <Provider store={store}>
      <Head>
        <title>Matching Game</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Game></Game>
    </Provider>
  )
}

export default App
