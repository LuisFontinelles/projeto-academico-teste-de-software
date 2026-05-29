import { Router } from 'express';
import {
  getMedicamentos,
  getMedicamentoById,
  addMedicamento,
  updateMedicamento,
  deleteMedicamento,
} from '../db.js';

const router = Router();

// GET /medicamentos
router.get('/', (req, res) => {
  res.json(getMedicamentos());
});

// GET /medicamentos/:id
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const med = getMedicamentoById(id);
  if (!med) {
    return res.status(404).json({
      status: 'erro',
      mensagem: 'Medicamento não encontrado',
      codigoErro: 'MEDICAMENTO_NAO_ENCONTRADO',
    });
  }
  res.json(med);
});

// POST /medicamentos
router.post('/', (req, res) => {
  const { nome, dosagem, horario } = req.body;

  if (!nome || typeof nome !== 'string' || nome.trim().length === 0) {
    return res.status(400).json({
      status: 'erro',
      mensagem: 'Nome do medicamento é obrigatório',
      codigoErro: 'NOME_INVALIDO',
      timestamp: new Date().toISOString(),
    });
  }

  if (nome.trim().length > 100) {
    return res.status(400).json({
      status: 'erro',
      mensagem: 'Nome do medicamento deve ter no máximo 100 caracteres',
      codigoErro: 'NOME_MUITO_LONGO',
      timestamp: new Date().toISOString(),
    });
  }

  if (!dosagem || typeof dosagem !== 'string' || dosagem.trim().length === 0) {
    return res.status(400).json({
      status: 'erro',
      mensagem: 'Dosagem é obrigatória',
      codigoErro: 'DOSAGEM_INVALIDA',
      timestamp: new Date().toISOString(),
    });
  }

  if (!horario || !/^\d{2}:\d{2}$/.test(horario)) {
    return res.status(400).json({
      status: 'erro',
      mensagem: 'Horário inválido. Use o formato HH:MM',
      codigoErro: 'HORARIO_INVALIDO',
      timestamp: new Date().toISOString(),
    });
  }

  const [h, m] = horario.split(':').map(Number);
  if (h < 0 || h > 23 || m < 0 || m > 59) {
    return res.status(400).json({
      status: 'erro',
      mensagem: 'Horário inválido. Use o formato HH:MM',
      codigoErro: 'HORARIO_INVALIDO',
      timestamp: new Date().toISOString(),
    });
  }

  const med = addMedicamento({ nome: nome.trim(), dosagem: dosagem.trim(), horario });

  res.status(201).json({
    status: 'sucesso',
    mensagem: 'Medicamento cadastrado com sucesso',
    dados: med,
  });
});

// PUT /medicamentos/:id
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, dosagem, horario } = req.body;

  if (horario && !/^\d{2}:\d{2}$/.test(horario)) {
    return res.status(400).json({
      status: 'erro',
      mensagem: 'Horário inválido. Use o formato HH:MM',
      codigoErro: 'HORARIO_INVALIDO',
    });
  }

  const updated = updateMedicamento(id, { nome, dosagem, horario });
  if (!updated) {
    return res.status(404).json({
      status: 'erro',
      mensagem: 'Medicamento não encontrado',
      codigoErro: 'MEDICAMENTO_NAO_ENCONTRADO',
    });
  }

  res.json({ status: 'sucesso', mensagem: 'Medicamento atualizado com sucesso', dados: updated });
});

// DELETE /medicamentos/:id
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const removed = deleteMedicamento(id);
  if (!removed) {
    return res.status(404).json({
      status: 'erro',
      mensagem: 'Medicamento não encontrado',
      codigoErro: 'MEDICAMENTO_NAO_ENCONTRADO',
    });
  }
  res.json({ status: 'sucesso', mensagem: 'Medicamento removido com sucesso' });
});

export default router;
