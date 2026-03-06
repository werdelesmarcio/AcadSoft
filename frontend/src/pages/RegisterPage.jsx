import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/auth.css'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [userType, setUserType] = useState('aluno') // aluno ou instrutor
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    telefone: '',
    idade: '',
    objetivo: '',
    especialidade: '',
    horarios: []
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error('As senhas não correspondem')
      }

      // criar usuário no sistema (auth)
      const authResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            name: formData.name,
            type: userType
          })
        }
      )
      if (!authResponse.ok) {
        const errData = await authResponse.json()
        throw new Error(errData.error || 'Falha no registro')
      }
      const authData = await authResponse.json()
      const uid = authData.uid

      // criar dados específicos de aluno/instrutor
      const endpoint =
        userType === 'aluno' ? '/api/aluno/register' : '/api/instrutor/register'
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid,
          email: formData.email,
          name: formData.name,
          telefone: formData.telefone,
          ...(userType === 'aluno' && {
            idade: formData.idade,
            objetivo: formData.objetivo
          }),
          ...(userType === 'instrutor' && {
            especialidade: formData.especialidade,
            horarios: formData.horarios
          })
        })
      })

      if (response.ok) {
        navigate('/login')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Registrar no AcadSoft</h1>

        <div className="user-type-selector">
          <button
            type="button"
            onClick={() => setUserType('aluno')}
            className={userType === 'aluno' ? 'active' : ''}
          >
            Aluno
          </button>
          <button
            type="button"
            onClick={() => setUserType('instrutor')}
            className={userType === 'instrutor' ? 'active' : ''}
          >
            Instrutor
          </button>
        </div>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleRegister}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="name"
            placeholder="Nome completo"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="telefone"
            placeholder="Telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
          />

          {userType === 'aluno' && (
            <>
              <input
                type="number"
                name="idade"
                placeholder="Idade"
                value={formData.idade}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="objetivo"
                placeholder="Objetivo (ex: ganhar massa, perder peso, etc)"
                value={formData.objetivo}
                onChange={handleChange}
                required
              />
            </>
          )}

          {userType === 'instrutor' && (
            <>
              <input
                type="text"
                name="especialidade"
                placeholder="Especialidade (ex: musculação, pilates, etc)"
                value={formData.especialidade}
                onChange={handleChange}
                required
              />
            </>
          )}

          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar senha"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrar'}
          </button>
        </form>

        <p>
          Já tem conta? <a href="/login">Faça login</a>
        </p>
      </div>
    </div>
  )
}
