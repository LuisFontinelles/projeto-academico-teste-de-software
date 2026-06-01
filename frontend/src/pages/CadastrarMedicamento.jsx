import { useState } from 'react'
import { postMedicamento } from '../api.js'

export default function CadastrarMedicamento() {
  const [form, setForm] = useState({ nome: '', dosagem: '', horario: '', intervalo: '' })
  const [msg, setMsg] = useState(null)

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setMsg(null)
    const res = await postMedicamento(form)
    if (res.ok) {
      setMsg({ tipo: 'success', texto: 'Medicamento cadastrado com sucesso!' })
      setForm({ nome: '', dosagem: '', horario: '', intervalo: '' })
    } else {
      setMsg({ tipo: 'error', texto: res.data.mensagem || 'Erro ao cadastrar.' })
    }
  }

  return (
    <>
      <h1>Cadastrar Medicamento</h1>
      {msg && <div id="mensagem" className={`msg ${msg.tipo}`}>{msg.texto}</div>}
      <div className="card">
        <form id="form-cadastro" onSubmit={submit}>
          <label>
            Nome do medicamento
            <input
              id="nome"
              name="nome"
              type="text"
              placeholder="Ex: Losartana"
              value={form.nome}
              onChange={handle}
            />
          </label>
          <label>
            Dosagem
            <input
              id="dosagem"
              name="dosagem"
              type="text"
              placeholder="Ex: 50mg"
              value={form.dosagem}
              onChange={handle}
            />
          </label>
          <label>
            Horário de administração (HH:MM)
            <input
              id="horario"
              name="horario"
              type="text"
              placeholder="Ex: 08:00"
              value={form.horario}
              onChange={handle}
            />
          </label>
          <label>
            Intervalo de administração (horas)
            <input
              id="intervalo"
              name="intervalo"
              type="number"
              placeholder="Ex: 8 (para de 8 em 8 horas)"
              value={form.intervalo}
              onChange={handle}
              min="1"
              max="24"
            />
          </label>
          <button id="btn-cadastrar" type="submit" className="btn-primary">
            Cadastrar
          </button>
        </form>
      </div>
    </>
  )
}
