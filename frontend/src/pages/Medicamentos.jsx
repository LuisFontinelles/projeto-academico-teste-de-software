import { useEffect, useState } from 'react'
import { getMedicamentos, deleteMedicamento } from '../api.js'

export default function Medicamentos() {
  const [lista, setLista] = useState([])
  const [msg, setMsg] = useState(null)

  const carregar = async () => {
    const data = await getMedicamentos()
    setLista(data)
  }

  useEffect(() => { carregar() }, [])

  const handleDelete = async (id, nome) => {
    if (!confirm(`Remover ${nome}?`)) return
    await deleteMedicamento(id)
    setMsg({ tipo: 'success', texto: `${nome} removido com sucesso.` })
    carregar()
  }

  return (
    <>
      <h1>Medicamentos Cadastrados</h1>
      {msg && <div id="mensagem" className={`msg ${msg.tipo}`}>{msg.texto}</div>}
      <div className="card">
        {lista.length === 0 ? (
          <p className="empty">Nenhum medicamento cadastrado.</p>
        ) : (
          <table id="tabela-medicamentos">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Dosagem</th>
                <th>Horário</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((m) => (
                <tr key={m.id}>
                  <td>{m.nome}</td>
                  <td>{m.dosagem}</td>
                  <td>{m.horario}</td>
                  <td>
                    <button
                      className="btn-danger"
                      onClick={() => handleDelete(m.id, m.nome)}
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}
