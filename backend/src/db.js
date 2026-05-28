// Banco de dados em memória
let medicamentos = [];
let doses = [];
let nextMedicamentoId = 1;
let nextDoseId = 1;

export function getMedicamentos() {
  return medicamentos;
}

export function getMedicamentoById(id) {
  return medicamentos.find((m) => m.id === id);
}

export function addMedicamento(data) {
  const medicamento = {
    id: nextMedicamentoId++,
    nome: data.nome,
    dosagem: data.dosagem,
    horario: data.horario,
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
  return medicamentos
    .map((med) => {
      const [hora, minuto] = med.horario.split(':').map(Number);
      const horarioPrevisto = new Date();
      horarioPrevisto.setHours(hora, minuto, 0, 0);
      const foiAdministrada = doses.some(
        (d) => d.medicamentoId === med.id && d.data === agora.toISOString().split('T')[0]
      );
      if (!foiAdministrada && horarioPrevisto < agora) {
        return {
          medicamentoId: med.id,
          nome: med.nome,
          horarioPrevisto: med.horario,
          status: 'pendente',
        };
      }
      return null;
    })
    .filter(Boolean);
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

export function resetDb() {
  medicamentos = [];
  doses = [];
  nextMedicamentoId = 1;
  nextDoseId = 1;
}
