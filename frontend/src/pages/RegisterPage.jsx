import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/auth.css'

export default function RegisterPage({ setUser, setToken }) {
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

      const authText = await authResponse.text()
      let authData = null

      if (authText) {
        try {
          authData = JSON.parse(authText)
        } catch (parseError) {
          throw new Error('Resposta inválida do servidor de autenticação')
        }
      }

      if (!authResponse.ok) {
        throw new Error(authData?.error || 'Falha no registro')
      }

      if (!authData || !authData.uid || !authData.token || !authData.user) {
        throw new Error('Resposta inválida do servidor de autenticação')
      }

      // guardar usuário e token para já autenticar após o cadastro
      if (setToken) setToken(authData.token)
      if (setUser) setUser(authData.user)

      const uid = authData.uid

      // criar dados específicos de aluno/instrutor
      const endpoint =
        userType === 'aluno' ? '/aluno/register' : '/instrutor/register'

      const detailsResponse = await fetch(
        `${import.meta.env.VITE_API_URL}${endpoint}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authData.token}`
          },
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
        }
      )

      const detailsText = await detailsResponse.text()
      let detailsData = null

      if (detailsText) {
        try {
          detailsData = JSON.parse(detailsText)
        } catch {
          // se não for JSON válido, segue com mensagem genérica
        }
      }

      if (!detailsResponse.ok) {
        throw new Error(
          detailsData?.error ||
            `Falha ao registrar ${
              userType === 'aluno' ? 'aluno' : 'instrutor'
            }`
        )
      }

      // cadastro completo, ir direto para o dashboard
      navigate('/')
    } catch (err) {
      setError(err.message || 'Erro inesperado ao registrar')
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
