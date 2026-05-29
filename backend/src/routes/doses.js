import { Router } from 'express';
import { getMedicamentoById, addDose, getDoses, getDosesPendentes } from '../db.js';

const router = Router();

// GET /doses
router.get('/', (req, res) => {
  res.json(getDoses());
});

// GET /doses/pendentes
router.get('/pendentes', (req, res) => {
  res.json(getDosesPendentes());
});

// POST /doses
router.post('/', (req, res) => {
  const { medicamentoId, administradoPor, data, hora, observacao } = req.body;

  if (!medicamentoId || typeof medicamentoId !== 'number') {
    return res.status(400).json({
      status: 'erro',
      mensagem: 'ID do medicamento é obrigatório e deve ser um número',
      codigoErro: 'MEDICAMENTO_ID_INVALIDO',
      timestamp: new Date().toISOString(),
    });
  }

  const med = getMedicamentoById(medicamentoId);
  if (!med) {
    return res.status(404).json({
      status: 'erro',
      mensagem: 'Medicamento não encontrado',
      codigoErro: 'MEDICAMENTO_NAO_ENCONTRADO',
      timestamp: new Date().toISOString(),
    });
  }

  if (!administradoPor || typeof administradoPor !== 'string' || administradoPor.trim().length === 0) {
    return res.status(400).json({
      status: 'erro',
      mensagem: 'Nome de quem administrou é obrigatório',
      codigoErro: 'ADMINISTRADO_POR_INVALIDO',
      timestamp: new Date().toISOString(),
    });
  }

  if (data && !/^\d{4}-\d{2}-\d{2}$/.test(data)) {
    return res.status(400).json({
      status: 'erro',
      mensagem: 'Data inválida. Use o formato YYYY-MM-DD',
      codigoErro: 'DATA_INVALIDA',
      timestamp: new Date().toISOString(),
    });
  }

  const dose = addDose({ medicamentoId, administradoPor: administradoPor.trim(), data, hora, observacao });

  res.status(201).json({
    status: 'sucesso',
    mensagem: 'Dose registrada com sucesso',
    dados: dose,
  });
});

export default router;
