import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/dashboard.css'
import { apiFetch } from '../utils/api'

export default function DashboardInstrutor({ user, token, onLogout }) {
  const navigate = useNavigate()
  const [instrutor, setInstrutor] = useState(null)
  const [alunos, setAlunos] = useState([])
  const [agendamentos, setAgendamentos] = useState([])
  const [activeTab, setActiveTab] = useState('dashboard')

  // props: user, token, onLogout

  useEffect(() => {
    carregarDados()
  }, [user])

  const carregarDados = async () => {
    try {
      if (!user) return
      const userId = user.uid

      // Carregar dados do instrutor
      const instrutorRes = await apiFetch(`/instrutor/${userId}`)
      setInstrutor(await instrutorRes.json())

      // Carregar agendamentos
      const agendamentosRes = await apiFetch(`/agendamentos/instrutor/${userId}`)
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
        <h1>Dashboard - Instrutor</h1>
        <button onClick={handleLogout} className="logout-btn">Sair</button>
      </header>

      <nav className="dashboard-nav">
        <button onClick={() => setActiveTab('dashboard')} className={activeTab === 'dashboard' ? 'active' : ''}>
          Inicio
        </button>
        <button onClick={() => setActiveTab('agendamentos')} className={activeTab === 'agendamentos' ? 'active' : ''}>
          Agendamentos
        </button>
        <button onClick={() => setActiveTab('exercicios')} className={activeTab === 'exercicios' ? 'active' : ''}>
          Exercícios
        </button>
        <button onClick={() => setActiveTab('horarios')} className={activeTab === 'horarios' ? 'active' : ''}>
          Horários
        </button>
        <button onClick={() => setActiveTab('perfil')} className={activeTab === 'perfil' ? 'active' : ''}>
          Perfil
        </button>
      </nav>

      <main className="dashboard-content">
        {activeTab === 'dashboard' && (
          <section>
            <h2>Bem-vindo, {instrutor?.name}!</h2>
            <p>Gerencie seus alunos, agendamentos e exercícios.</p>
          </section>
        )}

        {activeTab === 'agendamentos' && (
          <section>
            <h2>Agendamentos</h2>
            {agendamentos.length > 0 ? (
              <ul className="agendamentos-list">
                {agendamentos.map(agendamento => (
                  <li key={agendamento.id} className={`agendamento-item status-${agendamento.status}`}>
                    <span>Aluno ID: {agendamento.alunoId}</span>
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

        {activeTab === 'exercicios' && (
          <section>
            <h2>Meus Exercícios</h2>
            {instrutor?.exercicios && instrutor.exercicios.length > 0 ? (
              <ul className="exercicios-list">
                {instrutor.exercicios.map(exercicio => (
                  <li key={exercicio.id} className="exercicio-item">
                    <h3>{exercicio.nome}</h3>
                    <p>{exercicio.descricao}</p>
                    <p>Séries: {exercicio.series} | Repetições: {exercicio.repeticoes}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhum exercício cadastrado.</p>
            )}
            <button className="btn-primary">Adicionar Exercício</button>
          </section>
        )}

        {activeTab === 'horarios' && (
          <section>
            <h2>Meus Horários</h2>
            {instrutor?.horarios && instrutor.horarios.length > 0 ? (
              <ul className="horarios-list">
                {instrutor.horarios.map(horario => (
                  <li key={horario.id} className="horario-item">
                    <span>{horario.diaSemana}</span>
                    <span>{horario.horaInicio} - {horario.horaFim}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhum horário cadastrado.</p>
            )}
            <button className="btn-primary">Adicionar Horário</button>
          </section>
        )}

        {activeTab === 'perfil' && (
          <section>
            <h2>Meu Perfil</h2>
            {instrutor && (
              <div className="perfil-card">
                <h3 className="perfil-card-title">Dados do instrutor</h3>
                <div className="perfil-card-body">
                  <div className="perfil-foto-wrapper">
                    {instrutor.foto ? (
                      <img
                        src={instrutor.foto}
                        alt={`Foto de ${instrutor.name}`}
                        className="perfil-foto"
                      />
                    ) : (
                      <div className="perfil-foto placeholder">
                        Sem foto
                      </div>
                    )}
                  </div>
                  <p><strong>Nome:</strong> {instrutor.name}</p>
                  <p><strong>Email:</strong> {instrutor.email}</p>
                  <p><strong>Especialidade:</strong> {instrutor.especialidade}</p>
                  <p><strong>Telefone:</strong> {instrutor.telefone}</p>
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  )
}
