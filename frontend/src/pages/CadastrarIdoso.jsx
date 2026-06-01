import { useState, useEffect } from 'react'
import { postIdoso, getIdosos, getDoses, getDosesPendentes, getMedicamentos } from '../api.js'

const formInicial = {
  nome: '',
  dataNascimento: '',
  contatoUrgenciaNome: '',
  contatoUrgenciaTelefone: '',
  contatoUrgenciaRelacao: '',
  dependenciaFuncional: false,
  dependenciaCognitiva: false,
  observacoes: '',
}

export default function CadastrarIdoso() {
  const [form, setForm] = useState(formInicial)
  const [msg, setMsg] = useState(null)

  const [idosos, setIdosos] = useState([])
  const [doses, setDoses] = useState([])
  const [pendentes, setPendentes] = useState([])
  const [medicamentos, setMedicamentos] = useState([])

  const carregarDados = async () => {
    try {
      const listIdosos = await getIdosos()
      const listDoses = await getDoses()
      const listPendentes = await getDosesPendentes()
      const listMedicamentos = await getMedicamentos()
      
      setIdosos(listIdosos)
      setDoses(listDoses)
      setPendentes(listPendentes)
      setMedicamentos(listMedicamentos)
    } catch (e) {
      console.error("Erro ao carregar dados:", e)
    }
  }

  useEffect(() => {
    carregarDados()
  }, [])

  const handle = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const submit = async (e) => {
    e.preventDefault()
    setMsg(null)
    const res = await postIdoso(form)
    if (res.ok) {
      setMsg({ tipo: 'success', texto: `Idoso cadastrado com sucesso! Idade calculada: ${res.data.dados.idade} anos.` })
      setForm(formInicial)
      carregarDados()
    } else {
      setMsg({ tipo: 'error', texto: res.data.mensagem || 'Erro ao cadastrar idoso.' })
    }
  }

  return (
    <>
      <h1>Cadastrar Idoso</h1>
      <p style={{ marginBottom: '1rem', color: '#555', fontSize: '0.9rem' }}>
        Campos obrigatórios conforme <strong>RN-01.01</strong>: data de nascimento (para cálculo
        automático da idade), contato de urgência e indicação de dependência.
      </p>

      {msg && (
        <div id="mensagem" className={`msg ${msg.tipo}`}>
          {msg.texto}
        </div>
      )}

      <div className="card">
        <form id="form-cadastro-idoso" onSubmit={submit}>

          {/* ── Dados pessoais ── */}
          <h2>Dados Pessoais</h2>

          <label>
            Nome completo *
            <input
              id="nome"
              name="nome"
              type="text"
              placeholder="Ex: Maria da Silva"
              value={form.nome}
              onChange={handle}
              required
            />
          </label>

          <label>
            Data de nascimento * <span style={{ fontWeight: 400, color: '#888' }}>(a idade será calculada automaticamente)</span>
            <input
              id="dataNascimento"
              name="dataNascimento"
              type="date"
              value={form.dataNascimento}
              onChange={handle}
              required
            />
          </label>

          {/* ── Contato de urgência ── */}
          <h2 style={{ marginTop: '0.5rem' }}>Contato de Urgência *</h2>

          <label>
            Nome do contato *
            <input
              id="contatoUrgenciaNome"
              name="contatoUrgenciaNome"
              type="text"
              placeholder="Ex: João da Silva"
              value={form.contatoUrgenciaNome}
              onChange={handle}
              required
            />
          </label>

          <label>
            Telefone do contato *
            <input
              id="contatoUrgenciaTelefone"
              name="contatoUrgenciaTelefone"
              type="tel"
              placeholder="Ex: (11) 99999-9999"
              value={form.contatoUrgenciaTelefone}
              onChange={handle}
              required
            />
          </label>

          <label>
            Relação com o idoso
            <input
              id="contatoUrgenciaRelacao"
              name="contatoUrgenciaRelacao"
              type="text"
              placeholder="Ex: Filho(a), Cônjuge, Cuidador(a)"
              value={form.contatoUrgenciaRelacao}
              onChange={handle}
            />
          </label>

          {/* ── Dependência ── */}
          <h2 style={{ marginTop: '0.5rem' }}>Indicação de Dependência *</h2>
          <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem' }}>
            Selecione ao menos uma das opções abaixo (RN-01.01).
          </p>

          <label style={{ flexDirection: 'row', alignItems: 'center', gap: '0.6rem', fontWeight: 400 }}>
            <input
              id="dependenciaFuncional"
              name="dependenciaFuncional"
              type="checkbox"
              style={{ width: 'auto', marginTop: 0 }}
              checked={form.dependenciaFuncional}
              onChange={handle}
            />
            Dependência funcional (atividades básicas da vida diária)
          </label>

          <label style={{ flexDirection: 'row', alignItems: 'center', gap: '0.6rem', fontWeight: 400 }}>
            <input
              id="dependenciaCognitiva"
              name="dependenciaCognitiva"
              type="checkbox"
              style={{ width: 'auto', marginTop: 0 }}
              checked={form.dependenciaCognitiva}
              onChange={handle}
            />
            Dependência cognitiva
          </label>

          {/* ── Observações ── */}
          <label>
            Observações
            <textarea
              id="observacoes"
              name="observacoes"
              rows={3}
              placeholder="Informações adicionais relevantes..."
              value={form.observacoes}
              onChange={handle}
              style={{
                width: '100%',
                padding: '0.6rem 0.8rem',
                border: '1.5px solid #ddd',
                borderRadius: '8px',
                fontSize: '1rem',
                marginTop: '0.3rem',
                resize: 'vertical',
                fontFamily: 'inherit',
              }}
            />
          </label>

          <button id="btn-cadastrar-idoso" type="submit" className="btn-primary">
            Cadastrar Idoso
          </button>
        </form>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h2>Idosos Cadastrados</h2>
        {idosos.length === 0 ? (
          <p className="empty">Nenhum idoso cadastrado ainda.</p>
        ) : (
          idosos.map((idoso) => (
            <div key={idoso.id} className="card" style={{ marginBottom: '1.5rem', border: '1px solid #ccc' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>
                {idoso.nome} <span style={{ fontWeight: 'normal', color: '#666', fontSize: '0.9rem' }}>({idoso.idade} anos)</span>
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
                <div>
                  <strong>Data de Nascimento:</strong> {idoso.dataNascimento}
                </div>
                <div>
                  <strong>Contato de Urgência:</strong> {idoso.contatoUrgenciaNome} ({idoso.contatoUrgenciaTelefone})
                  {idoso.contatoUrgenciaRelacao && ` - Relação: ${idoso.contatoUrgenciaRelacao}`}
                </div>
                <div>
                  <strong>Dependências:</strong>
                  <ul style={{ margin: '0.2rem 0 0 1rem', padding: 0 }}>
                    <li>Funcional: {idoso.dependenciaFuncional ? 'Sim' : 'Não'}</li>
                    <li>Cognitiva: {idoso.dependenciaCognitiva ? 'Sim' : 'Não'}</li>
                  </ul>
                </div>
                {idoso.observacoes && (
                  <div style={{ gridColumn: '1 / -1' }}>
                    <strong>Observações:</strong> {idoso.observacoes}
                  </div>
                )}
              </div>

              <div style={{ borderTop: '1px solid #eee', paddingTop: '1rem', marginTop: '1rem' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#555' }}>Histórico de Medicação</h4>
                
                {/* Doses Administradas */}
                <div style={{ marginBottom: '1rem' }}>
                  <h5 style={{ margin: '0 0 0.3rem 0', color: '#666' }}>Doses Administradas</h5>
                  {doses.length === 0 ? (
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#888' }}>Nenhuma dose administrada registrada.</p>
                  ) : (
                    <table style={{ width: '100%', fontSize: '0.85rem', borderCollapse: 'collapse', textAlign: 'left' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid #ddd' }}>
                          <th style={{ padding: '4px' }}>Medicamento</th>
                          <th style={{ padding: '4px' }}>Administrado por</th>
                          <th style={{ padding: '4px' }}>Data / Hora</th>
                        </tr>
                      </thead>
                      <tbody>
                        {doses.map((d) => {
                          const med = medicamentos.find((m) => m.id === d.medicamentoId)
                          const nomeMed = med ? `${med.nome} (${med.dosagem})` : `Medicamento ID ${d.medicamentoId}`
                          return (
                            <tr key={d.id} style={{ borderBottom: '1px solid #eee' }}>
                              <td style={{ padding: '4px' }}>{nomeMed}</td>
                              <td style={{ padding: '4px' }}>{d.administradoPor}</td>
                              <td style={{ padding: '4px' }}>{d.data} às {d.hora}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  )}
                </div>

                {/* Doses Pendentes */}
                <div>
                  <h5 style={{ margin: '0 0 0.3rem 0', color: '#666' }}>Doses Pendentes</h5>
                  {pendentes.length === 0 ? (
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#888' }}>Nenhuma dose pendente registrada para hoje.</p>
                  ) : (
                    <table style={{ width: '100%', fontSize: '0.85rem', borderCollapse: 'collapse', textAlign: 'left' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid #ddd' }}>
                          <th style={{ padding: '4px' }}>Medicamento</th>
                          <th style={{ padding: '4px' }}>Horário Previsto</th>
                          <th style={{ padding: '4px' }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendentes.map((p, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '4px' }}>{p.nome}</td>
                            <td style={{ padding: '4px' }}>{p.horarioPrevisto}</td>
                            <td style={{ padding: '4px' }}>
                              <span className="badge pendente" style={{ display: 'inline-block', padding: '2px 6px', fontSize: '0.75rem', borderRadius: '4px', backgroundColor: '#ffeeba', color: '#856404' }}>
                                Pendente
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>

              </div>
            </div>
          ))
        )}
      </div>
    </>
  )
}
