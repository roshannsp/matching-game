import React, { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginAction } from '../store/login'

const LoginModal = () => {
  const [name, setName] = useState('')
  const dispatch = useDispatch()

  const submit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(loginAction(name))
  }

  return (
    <div className="login-modal">
      <form onSubmit={submit} className="login-form">
        <h1>Login</h1>
        <input
          type="string"
          placeholder="Enter your name here"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginModal
