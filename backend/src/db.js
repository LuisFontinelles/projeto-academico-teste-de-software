// Banco de dados em memória
let medicamentos = [];
let doses = [];
let idosos = [];
let nextMedicamentoId = 1;
let nextDoseId = 1;
let nextIdosoId = 1;

export function getMedicamentos() {
  return medicamentos;
}

export function getMedicamentoById(id) {
  return medicamentos.find((m) => m.id === id);
}

function gerarRotina(horarioInicial, intervaloHoras) {
  if (!intervaloHoras || intervaloHoras <= 0) return [horarioInicial];
  const [h, m] = horarioInicial.split(':').map(Number);
  const horarios = [];
  for (let i = 0; i < 24; i += Number(intervaloHoras)) {
    const totalMinutos = (h * 60 + m + (i * 60)) % (24 * 60);
    const currentH = Math.floor(totalMinutos / 60);
    const currentM = totalMinutos % 60;
    const formatado = `${String(currentH).padStart(2, '0')}:${String(currentM).padStart(2, '0')}`;
    if (!horarios.includes(formatado)) {
      horarios.push(formatado);
    }
  }
  return horarios.sort();
}

export function addMedicamento(data) {
  const medicamento = {
    id: nextMedicamentoId++,
    nome: data.nome,
    dosagem: data.dosagem,
    horario: data.horario,
    intervalo: data.intervalo ? Number(data.intervalo) : null,
    horarios: data.intervalo ? gerarRotina(data.horario, Number(data.intervalo)) : [data.horario],
    criadoEm: new Date().toISOString(),
  };
  medicamentos.push(medicamento);
  return medicamento;
}

export function updateMedicamento(id, data) {
  const idx = medicamentos.findIndex((m) => m.id === id);
  if (idx === -1) return null;
  medicamentos[idx] = { ...medicamentos[idx], ...data };
  return medicamentos[idx];
}

export function deleteMedicamento(id) {
  const idx = medicamentos.findIndex((m) => m.id === id);
  if (idx === -1) return false;
  medicamentos.splice(idx, 1);
  return true;
}

export function getDoses() {
  return doses;
}

export function getDosesPendentes() {
  const agora = new Date();
  const hojeStr = agora.toISOString().split('T')[0];
  const pendentes = [];

  for (const med of medicamentos) {
    const horarios = med.horarios || [med.horario];
    for (const hStr of horarios) {
      const [hora, minuto] = hStr.split(':').map(Number);
      const horarioPrevisto = new Date();
      horarioPrevisto.setHours(hora, minuto, 0, 0);

      const foiAdministrada = doses.some(
        (d) => d.medicamentoId === med.id && d.data === hojeStr && d.hora.split(':')[0] === hStr.split(':')[0]
      );

      if (!foiAdministrada && horarioPrevisto < agora) {
        pendentes.push({
          medicamentoId: med.id,
          nome: med.nome,
          horarioPrevisto: hStr,
          status: 'pendente',
        });
      }
    }
  }

  return pendentes;
}

export function addDose(data) {
  const dose = {
    id: nextDoseId++,
    medicamentoId: data.medicamentoId,
    administradoPor: data.administradoPor,
    data: data.data || new Date().toISOString().split('T')[0],
    hora: data.hora || new Date().toTimeString().slice(0, 5),
    observacao: data.observacao || null,
    registradoEm: new Date().toISOString(),
  };
  doses.push(dose);
  return dose;
}

// ── Idosos ──────────────────────────────────────────────────────────────────

/**
 * Calcula a idade em anos completos a partir de uma data de nascimento (YYYY-MM-DD).
 */
function calcularIdade(dataNascimento) {
  const hoje = new Date();
  const nasc = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nasc.getFullYear();
  const m = hoje.getMonth() - nasc.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) {
    idade--;
  }
  return idade;
}

export function getIdosos() {
  return idosos;
}

export function getIdosoById(id) {
  return idosos.find((i) => i.id === id);
}

export function addIdoso(data) {
  const idade = calcularIdade(data.dataNascimento);
  const idoso = {
    id: nextIdosoId++,
    nome: data.nome,
    dataNascimento: data.dataNascimento,
    idade,
    // Contato de urgência
    contatoUrgenciaNome: data.contatoUrgenciaNome,
    contatoUrgenciaTelefone: data.contatoUrgenciaTelefone,
    contatoUrgenciaRelacao: data.contatoUrgenciaRelacao || null,
    // Dependência
    dependenciaFuncional: data.dependenciaFuncional ?? false,
    dependenciaCognitiva: data.dependenciaCognitiva ?? false,
    observacoes: data.observacoes || null,
    criadoEm: new Date().toISOString(),
  };
  idosos.push(idoso);
  return idoso;
}

export function resetDb() {
  medicamentos = [];
  doses = [];
  idosos = [];
  nextMedicamentoId = 1;
  nextDoseId = 1;
  nextIdosoId = 1;
}
