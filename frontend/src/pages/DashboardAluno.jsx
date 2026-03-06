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
  const [selectingInstrutorUid, setSelectingInstrutorUid] = useState(null)
  const [selectInstrutorError, setSelectInstrutorError] = useState('')

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

  const handleSelecionarInstrutor = async (instrutorUid) => {
    try {
      if (!user?.uid || !instrutorUid) return
      setSelectInstrutorError('')
      setSelectingInstrutorUid(instrutorUid)

      const res = await apiFetch(`/aluno/${user.uid}/instrutor`, {
        method: 'PUT',
        body: JSON.stringify({ instrutorId: instrutorUid })
      })

      const text = await res.text()
      let data = null
      if (text) {
        try {
          data = JSON.parse(text)
        } catch {
          // ignore parse failure
        }
      }

      if (!res.ok) {
        throw new Error(data?.error || 'Falha ao selecionar instrutor')
      }

      setAluno(prev => (prev ? { ...prev, instrutorId: instrutorUid } : prev))
    } catch (e) {
      setSelectInstrutorError(e?.message || 'Erro ao selecionar instrutor')
    } finally {
      setSelectingInstrutorUid(null)
    }
  }

  const instrutorSelecionado =
    aluno?.instrutorId
      ? instrutores.find(i => i.uid === aluno.instrutorId) || null
      : null

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
            {selectInstrutorError && (
              <div className="dashboard-error">{selectInstrutorError}</div>
            )}
            <div className="instrutores-grid">
              {instrutores.map(instrutor => (
                <div key={instrutor.uid || instrutor._id} className="instrutor-card">
                  {instrutor.foto && (
                    <img
                      src={instrutor.foto}
                      alt={`Foto de ${instrutor.name}`}
                      className="instrutor-card-foto"
                    />
                  )}
                  <h3>{instrutor.name}</h3>
                  <p>Especialidade: {instrutor.especialidade}</p>
                  <p>Telefone: {instrutor.telefone}</p>
                  <button
                    onClick={() => handleSelecionarInstrutor(instrutor.uid)}
                    disabled={!instrutor.uid || selectingInstrutorUid === instrutor.uid}
                  >
                    {aluno?.instrutorId === instrutor.uid
                      ? 'Selecionado'
                      : selectingInstrutorUid === instrutor.uid
                        ? 'Selecionando...'
                        : 'Selecionar'}
                  </button>
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
              <div className="perfil-grid">
                <div className="perfil-card">
                  <h3 className="perfil-card-title">Dados do aluno</h3>
                  <div className="perfil-card-body">
                    <div className="perfil-foto-wrapper">
                      {aluno.foto ? (
                        <img
                          src={aluno.foto}
                          alt={`Foto de ${aluno.name}`}
                          className="perfil-foto"
                        />
                      ) : (
                        <div className="perfil-foto placeholder">
                          Sem foto
                        </div>
                      )}
                    </div>
                    <p><strong>Nome:</strong> {aluno.name}</p>
                    <p><strong>Email:</strong> {aluno.email}</p>
                    <p><strong>Idade:</strong> {aluno.idade}</p>
                    <p><strong>Objetivo:</strong> {aluno.objetivo}</p>
                    <p><strong>Telefone:</strong> {aluno.telefone}</p>
                  </div>
                </div>

                <div className="perfil-card instrutor-selecionado-card">
                  <h3 className="perfil-card-title">Instrutor selecionado</h3>
                  <div className="perfil-card-body">
                    {!aluno.instrutorId ? (
                      <p>
                        Nenhum instrutor selecionado.{' '}
                        <button
                          type="button"
                          className="link-btn"
                          onClick={() => setActiveTab('instrutores')}
                        >
                          Selecionar um instrutor
                        </button>
                      </p>
                    ) : instrutorSelecionado ? (
                      <>
                        {instrutorSelecionado.foto && (
                          <div className="perfil-foto-wrapper">
                            <img
                              src={instrutorSelecionado.foto}
                              alt={`Foto de ${instrutorSelecionado.name}`}
                              className="perfil-foto"
                            />
                          </div>
                        )}
                        <p><strong>Nome:</strong> {instrutorSelecionado.name}</p>
                        <p><strong>Especialidade:</strong> {instrutorSelecionado.especialidade || '-'}</p>
                        <p><strong>Telefone:</strong> {instrutorSelecionado.telefone || '-'}</p>
                        <button
                          type="button"
                          className="btn-secondary"
                          onClick={() => setActiveTab('instrutores')}
                        >
                          Trocar instrutor
                        </button>
                      </>
                    ) : (
                      <>
                        <p><strong>ID do instrutor:</strong> {aluno.instrutorId}</p>
                        <button
                          type="button"
                          className="btn-secondary"
                          onClick={() => setActiveTab('instrutores')}
                        >
                          Ver lista de instrutores
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  )
}
