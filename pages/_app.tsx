import '../styles/index.scss'
import React from 'react'
import Head from 'next/head'
import Game from './game'

import thunk from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux'
import rootReducer from '../store/index'
import { Provider } from 'react-redux'

const App = () => {
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
