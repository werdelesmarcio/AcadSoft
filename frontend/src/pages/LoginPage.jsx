import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/auth.css'

export default function LoginPage({ setUser, setToken }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        }
      )
      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData.error || 'Email ou senha incorretos')
      }
      const data = await response.json()
      setToken(data.token)
      setUser(data.user)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>AcadSoft</h1>
        <p className="subtitle">Sistema de Gerenciamento de Academia</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p>
          Não tem conta? <a href="/register">Registre-se aqui</a>
        </p>
      </div>
    </div>
  )
}
