import { useState, useEffect } from 'react'
import { getMedicamentos, postDose } from '../api.js'

export default function RegistrarDose() {
  const [medicamentos, setMedicamentos] = useState([])
  const [form, setForm] = useState({ medicamentoId: '', administradoPor: '' })
  const [msg, setMsg] = useState(null)

  useEffect(() => {
    getMedicamentos().then(setMedicamentos)
  }, [])

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setMsg(null)
    const res = await postDose({
      medicamentoId: parseInt(form.medicamentoId),
      administradoPor: form.administradoPor,
    })
    if (res.ok) {
      setMsg({ tipo: 'success', texto: 'Dose registrada com sucesso!' })
      setForm({ medicamentoId: '', administradoPor: '' })
    } else {
      setMsg({ tipo: 'error', texto: res.data.mensagem || 'Erro ao registrar dose.' })
    }
  }

  return (
    <>
      <h1>Registrar Administração de Dose</h1>
      {msg && <div id="mensagem" className={`msg ${msg.tipo}`}>{msg.texto}</div>}
      <div className="card">
        <form id="form-dose" onSubmit={submit}>
          <label>
            Medicamento
            <select id="medicamentoId" name="medicamentoId" value={form.medicamentoId} onChange={handle}>
              <option value="">Selecione...</option>
              {medicamentos.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nome} — {m.dosagem} ({m.horario})
                </option>
              ))}
            </select>
          </label>
          <label>
            Administrado por
            <input
              id="administradoPor"
              name="administradoPor"
              type="text"
              placeholder="Nome do cuidador ou familiar"
              value={form.administradoPor}
              onChange={handle}
            />
          </label>
          <button id="btn-registrar" type="submit" className="btn-success">
            Registrar Dose
          </button>
        </form>
      </div>
    </>
  )
}
