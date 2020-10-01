import { Dispatch } from 'react'

// Actions
const GET_SCORE = 'GET_SCORE'
const GET_SCORE_SUCCESS = 'GET_SCORE_SUCCESS'
const GET_SCORE_FAILED = 'GET_SCORE_FAILED'
const SET_SCORE = 'SET_SCORE'
const SET_SCORE_SUCCESS = 'SET_SCORE_SUCCESS'
const SET_GLOBAL_BEST = 'SET_GLOBAL_BEST'
const SET_GLOBAL_BEST_SUCCESS = 'SET_GLOBAL_BEST_SUCCESS'

type Score = {
  name: string
  score: number
}

type State = {
  scores: Score[]
  myBest: number | undefined
  globalBest: number | undefined
}

const initialState: State = {
  scores: [],
  myBest: undefined,
  globalBest: undefined,
}

// Reducer
export default function reducer(state = initialState, action: any = {}) {
  switch (action.type) {
    case GET_SCORE:
      return {
        ...state,
        loading: true,
      }
    case GET_SCORE_SUCCESS:
      return {
        ...state,
        loading: false,
        scores: action.scores,
        myBest: action.myBest,
        globalBest: action.globalBest,
      }
    case GET_SCORE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case SET_SCORE:
      return {
        ...state,
        loading: true,
      }
    case SET_SCORE_SUCCESS:
      const { name, score } = action.score
      if (!state.myBest || score < state.myBest) {
        const scores = [...state.scores]
        let index = scores.findIndex((score) => score.name === name)
        if (index < 0) {
          scores.push({ name, score })
        } else {
          scores[index] = { name, score }
        }
        localStorage.setItem('scoreboard', JSON.stringify(scores))
        return {
          ...state,
          loading: false,
          scores,
          myBest: score,
        }
      }
      if (!state.globalBest || score < state.globalBest) {
      }
      return {
        ...state,
        loading: false,
      }
    case SET_GLOBAL_BEST_SUCCESS: {
      return {
        ...state,
        loading: false,
        globalBest: action.score.score,
      }
    }
    default:
      return state
  }
}

// Action Creators
export function getScore() {
  return { type: GET_SCORE }
}

export function getScoreSuccess(state: State) {
  return { type: GET_SCORE_SUCCESS, ...state }
}

export function getScoreFailed(error: any) {
  return { type: GET_SCORE_FAILED, error }
}

export function setScore() {
  return { type: SET_SCORE }
}

export function setScoreSuccess(score: Score) {
  return { type: SET_SCORE_SUCCESS, score }
}

export function setGlobalBest() {
  return { type: SET_GLOBAL_BEST }
}

export function setGlobalBestSuccess(score: Score) {
  return { type: SET_GLOBAL_BEST_SUCCESS, score }
}

export function getScoreAction(name: string) {
  return async (dispatch: Dispatch<any>) => {
    dispatch(getScore())
    return getScoreBoard(name)
      .then((res) => dispatch(getScoreSuccess(res)))
      .catch((err) => dispatch(getScoreFailed(err)))
  }
}

export function setScoreAction(score: Score) {
  return (dispatch: Dispatch<any>) => {
    dispatch(setScore())
    return dispatch(setScoreSuccess(score))
  }
}

export function setGlobalBestAction(score: Score) {
  return (dispatch: Dispatch<any>) => {
    dispatch(setGlobalBest())
    return setGlobalBestRequest(score).then(() =>
      dispatch(setGlobalBestSuccess(score))
    )
  }
}

function getScoreBoard(name: string) {
  return new Promise<State>(async (resolve, reject) => {
    try {
      const scoresStr: string = localStorage.getItem('scoreboard') || '[]'
      const scores: Score[] = JSON.parse(scoresStr)
      const myBest = scores.find((score) => score.name === name)?.score
      const globalBest = (await getGlobalBestRequest()).score
      resolve({ scores, myBest, globalBest })
    } catch (e) {
      reject(e)
    }
  })
}

function getGlobalBestRequest() {
  return new Promise<Score>((resolve) =>
    resolve({
      name: 'King of Matching Card',
      score: 30,
    })
  )
}

function setGlobalBestRequest(score: Score) {
  const payload = {
    score,
  }
  console.log('payload', payload)
  return new Promise<any>((resolve) =>
    resolve({
      status: 200,
      statusText: 'OK',
    })
  )
}

export const getMyBest = (store: any) => store.score.myBest
export const getGlobalBest = (store: any) => store.score.globalBest
