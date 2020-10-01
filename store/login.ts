import { Dispatch } from 'react'

// Actions
export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

const initialState = {
  name: '',
  loading: false,
}

// Reducer
export default function reducer(
  state = initialState,
  action = { type: '', name: '' }
) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: true,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        name: action.name,
      }
    default:
      return state
  }
}

// Action Creators
export function login() {
  return { type: LOGIN }
}

export function loginSuccess(name: string) {
  return { type: LOGIN_SUCCESS, name }
}

export function loginAction(name: string) {
  return (dispatch: Dispatch<any>) => {
    dispatch(login())
    return dispatch(loginSuccess(name))
  }
}

export const getName = (store: any) => store.login.name
