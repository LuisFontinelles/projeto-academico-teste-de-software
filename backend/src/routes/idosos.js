import { Router } from 'express';
import { getIdosos, getIdosoById, addIdoso } from '../db.js';

const router = Router();

// GET /idosos
router.get('/', (req, res) => {
  res.json(getIdosos());
});

// GET /idosos/:id
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const idoso = getIdosoById(id);
  if (!idoso) {
    return res.status(404).json({
      status: 'erro',
      mensagem: 'Idoso não encontrado',
      codigoErro: 'IDOSO_NAO_ENCONTRADO',
    });
  }
  res.json(idoso);
});

// POST /idosos  — RN-01.01 Cadastro Essencial
router.post('/', (req, res) => {
  const {
    nome,
    dataNascimento,
    contatoUrgenciaNome,
    contatoUrgenciaTelefone,
    contatoUrgenciaRelacao,
    dependenciaFuncional,
    dependenciaCognitiva,
    observacoes,
  } = req.body;

  // ── Validações obrigatórias ──────────────────────────────────────────────

  // Nome
  if (!nome || typeof nome !== 'string' || nome.trim().length === 0) {
    return res.status(400).json({
      status: 'erro',
      mensagem: 'Nome do idoso é obrigatório',
      codigoErro: 'NOME_INVALIDO',
      timestamp: new Date().toISOString(),
    });
  }

  // Data de nascimento (obrigatória para calcular a idade — RN-01.01)
  if (!dataNascimento || !/^\d{4}-\d{2}-\d{2}$/.test(dataNascimento)) {
    return res.status(400).json({
      status: 'erro',
      mensagem: 'Data de nascimento é obrigatória e deve estar no formato YYYY-MM-DD',
      codigoErro: 'DATA_NASCIMENTO_INVALIDA',
      timestamp: new Date().toISOString(),
    });
  }

  const nascDate = new Date(dataNascimento);
  if (isNaN(nascDate.getTime()) || nascDate > new Date()) {
    return res.status(400).json({
      status: 'erro',
      mensagem: 'Data de nascimento inválida',
      codigoErro: 'DATA_NASCIMENTO_INVALIDA',
      timestamp: new Date().toISOString(),
    });
  }

  // Contato de urgência — nome (RN-01.01)
  if (
    !contatoUrgenciaNome ||
    typeof contatoUrgenciaNome !== 'string' ||
    contatoUrgenciaNome.trim().length === 0
  ) {
    return res.status(400).json({
      status: 'erro',
      mensagem: 'Nome do contato de urgência é obrigatório',
      codigoErro: 'CONTATO_URGENCIA_NOME_INVALIDO',
      timestamp: new Date().toISOString(),
    });
  }

  // Contato de urgência — telefone (RN-01.01)
  if (
    !contatoUrgenciaTelefone ||
    typeof contatoUrgenciaTelefone !== 'string' ||
    contatoUrgenciaTelefone.trim().length === 0
  ) {
    return res.status(400).json({
      status: 'erro',
      mensagem: 'Telefone do contato de urgência é obrigatório',
      codigoErro: 'CONTATO_URGENCIA_TELEFONE_INVALIDO',
      timestamp: new Date().toISOString(),
    });
  }

  // Dependência funcional ou cognitiva deve ser informada (RN-01.01)
  if (dependenciaFuncional === undefined && dependenciaCognitiva === undefined) {
    return res.status(400).json({
      status: 'erro',
      mensagem:
        'É obrigatório informar a indicação de dependência funcional e/ou cognitiva',
      codigoErro: 'DEPENDENCIA_NAO_INFORMADA',
      timestamp: new Date().toISOString(),
    });
  }

  const idoso = addIdoso({
    nome: nome.trim(),
    dataNascimento,
    contatoUrgenciaNome: contatoUrgenciaNome.trim(),
    contatoUrgenciaTelefone: contatoUrgenciaTelefone.trim(),
    contatoUrgenciaRelacao: contatoUrgenciaRelacao?.trim() || null,
    dependenciaFuncional: Boolean(dependenciaFuncional),
    dependenciaCognitiva: Boolean(dependenciaCognitiva),
    observacoes: observacoes?.trim() || null,
  });

  res.status(201).json({
    status: 'sucesso',
    mensagem: 'Idoso cadastrado com sucesso',
    dados: idoso,
  });
});

export default router;
