import React, { useState } from 'react'
import { login } from '../firebase/auth'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password).then(() => {
      window.location.href = '/horoscopes'
    })
  }

  return (
    <div className="min-h-screen grid place-items-center">
      <form
        className="w-11/12 max-w-sm bg-slate-700 rounded p-4"
        onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-slate-600 rounded px-4 py-2 border-none outline-none mb-2"
          placeholder="E-posta"
          type="email"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-slate-600 rounded px-4 py-2 border-none outline-none"
          placeholder="Parola"
          type="password"
        />

        <button
          type="submit"
          className="px-4 py-2 rounded bg-indigo-600 w-full mt-4">
          Giriş yap
        </button>
      </form>
    </div>
  )
}

export default LoginPage
