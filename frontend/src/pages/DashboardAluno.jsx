import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/dashboard.css'
import { apiFetch } from '../utils/api'

export default function DashboardAluno({ user, token, onLogout }) {
  const navigate = useNavigate()
  const [aluno, setAluno] = useState(null)
  const [instrutores, setInstrutores] = useState([])
  const [agendamentos, setAgendamentos] = useState([])
  const [activeTab, setActiveTab] = useState('dashboard')

  // props expected: user, token, onLogout

  useEffect(() => {
    carregarDados()
  }, [user]) // reload if user changes

  const carregarDados = async () => {
    try {
      if (!user) return
      const userId = user.uid

      // Carregar dados do aluno
      const alunoRes = await apiFetch(`/aluno/${userId}`)
      setAluno(await alunoRes.json())

      // Carregar instrutores
      const instrutoresRes = await apiFetch(`/instrutor`)
      setInstrutores(await instrutoresRes.json())

      // Carregar agendamentos
      const agendamentosRes = await apiFetch(`/agendamentos/aluno/${userId}`)
      setAgendamentos(await agendamentosRes.json())
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    }
  }

  const handleLogout = () => {
    if (onLogout) onLogout()
    navigate('/login')
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard - Aluno</h1>
        <button onClick={handleLogout} className="logout-btn">Sair</button>
      </header>

      <nav className="dashboard-nav">
        <button onClick={() => setActiveTab('dashboard')} className={activeTab === 'dashboard' ? 'active' : ''}>
          Inicio
        </button>
        <button onClick={() => setActiveTab('instrutores')} className={activeTab === 'instrutores' ? 'active' : ''}>
          Instrutores
        </button>
        <button onClick={() => setActiveTab('agendamentos')} className={activeTab === 'agendamentos' ? 'active' : ''}>
          Agendamentos
        </button>
        <button onClick={() => setActiveTab('perfil')} className={activeTab === 'perfil' ? 'active' : ''}>
          Perfil
        </button>
      </nav>

      <main className="dashboard-content">
        {activeTab === 'dashboard' && (
          <section>
            <h2>Bem-vindo, {aluno?.name}!</h2>
            <p>Escolha um instrutor e agende seu treino.</p>
          </section>
        )}

        {activeTab === 'instrutores' && (
          <section>
            <h2>Instrutores</h2>
            <div className="instrutores-grid">
              {instrutores.map(instrutor => (
                <div key={instrutor.id} className="instrutor-card">
                  <h3>{instrutor.name}</h3>
                  <p>Especialidade: {instrutor.especialidade}</p>
                  <p>Telefone: {instrutor.telefone}</p>
                  <button>Selecionar</button>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'agendamentos' && (
          <section>
            <h2>Meus Agendamentos</h2>
            {agendamentos.length > 0 ? (
              <ul className="agendamentos-list">
                {agendamentos.map(agendamento => (
                  <li key={agendamento.id} className={`agendamento-item status-${agendamento.status}`}>
                    <span>Data: {new Date(agendamento.data).toLocaleDateString()}</span>
                    <span>Hora: {agendamento.horario}</span>
                    <span>Status: {agendamento.status}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhum agendamento realizado.</p>
            )}
          </section>
        )}

        {activeTab === 'perfil' && (
          <section>
            <h2>Meu Perfil</h2>
            {aluno && (
              <div className="perfil-info">
                <p><strong>Nome:</strong> {aluno.name}</p>
                <p><strong>Email:</strong> {aluno.email}</p>
                <p><strong>Idade:</strong> {aluno.idade}</p>
                <p><strong>Objetivo:</strong> {aluno.objetivo}</p>
                <p><strong>Telefone:</strong> {aluno.telefone}</p>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  )
}
