import { useEffect, useState } from 'react'
import { getDoses, getDosesPendentes } from '../api.js'

export default function Historico() {
  const [doses, setDoses] = useState([])
  const [pendentes, setPendentes] = useState([])

  useEffect(() => {
    getDoses().then(setDoses)
    getDosesPendentes().then(setPendentes)
  }, [])

  return (
    <>
      <h1>Histórico de Administrações</h1>

      {pendentes.length > 0 && (
        <div className="card">
          <h2>⚠️ Doses Pendentes</h2>
          <table id="tabela-pendentes">
            <thead>
              <tr>
                <th>Medicamento</th>
                <th>Horário Previsto</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {pendentes.map((d, i) => (
                <tr key={i}>
                  <td>{d.nome}</td>
                  <td>{d.horarioPrevisto}</td>
                  <td><span className="badge pendente">Pendente</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="card">
        <h2>Doses Administradas</h2>
        {doses.length === 0 ? (
          <p className="empty">Nenhuma dose registrada.</p>
        ) : (
          <table id="tabela-historico">
            <thead>
              <tr>
                <th>Medicamento ID</th>
                <th>Administrado por</th>
                <th>Data</th>
                <th>Hora</th>
              </tr>
            </thead>
            <tbody>
              {doses.map((d) => (
                <tr key={d.id}>
                  <td>{d.medicamentoId}</td>
                  <td>{d.administradoPor}</td>
                  <td>{d.data}</td>
                  <td>{d.hora}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}
