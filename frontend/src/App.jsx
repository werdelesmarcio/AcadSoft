import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardAluno from './pages/DashboardAluno'
import DashboardInstrutor from './pages/DashboardInstrutor'
import './App.css'

function App() {
  // load initial state from localStorage
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })
  const [token, setToken] = useState(() => localStorage.getItem('token') || null)

  useEffect(() => {
    if (user && token) {
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
  }, [user, token])

  const handleLogout = () => {
    setUser(null)
    setToken(null)
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!user ? <LoginPage setUser={setUser} setToken={setToken} /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <RegisterPage setUser={setUser} setToken={setToken} /> : <Navigate to="/" />}
        />

        {user && user.type === 'aluno' && (
          <Route
            path="/"
            element={<DashboardAluno user={user} token={token} onLogout={handleLogout} />}
          />
        )}
        {user && user.type === 'instrutor' && (
          <Route
            path="/"
            element={<DashboardInstrutor user={user} token={token} onLogout={handleLogout} />}
          />
        )}

        <Route
          path="*"
          element={user ? <Navigate to="/" replace /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  )
}

export default App
