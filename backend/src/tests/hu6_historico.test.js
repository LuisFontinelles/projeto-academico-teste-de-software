/**
 * Testes Jest - HU6: Visualizar Histórico de Administrações
 *
 * Como familiar responsável, quero visualizar o histórico de administrações,
 * para acompanhar a regularidade do cuidado.
 *
 * Critérios testados:
 *  - A função acessa corretamente o banco de dados (db)
 *  - O retorno contém dados do tipo histórico com: medicamento, horário previsto e status
 */

import { describe, it, expect, beforeEach } from '@jest/globals';
import {
  addMedicamento,
  addDose,
  getDoses,
  getDosesPendentes,
  resetDb,
} from '../db.js';

// Reseta o banco em memória antes de cada teste para garantir isolamento
beforeEach(() => {
  resetDb();
});

// ─────────────────────────────────────────────────────────────────────────────
// Bloco 1: getDoses() — histórico de doses administradas
// ─────────────────────────────────────────────────────────────────────────────
describe('HU6 - Histórico de Administrações: getDoses()', () => {
  it('deve acessar o banco de dados e retornar um array vazio quando não há doses registradas', () => {
    const historico = getDoses();

    // Verifica que a função acessa o DB e retorna um array
    expect(Array.isArray(historico)).toBe(true);
    expect(historico).toHaveLength(0);
  });

  it('deve retornar o histórico com os campos obrigatórios: medicamento (medicamentoId), horário previsto (hora) e status implícito (registradoEm)', () => {
    // Prepara: cadastra medicamento e registra uma dose
    const med = addMedicamento({ nome: 'Losartana', dosagem: '50mg', horario: '08:00' });
    addDose({
      medicamentoId: med.id,
      administradoPor: 'Maria',
      data: '2026-05-28',
      hora: '08:05',
    });

    const historico = getDoses();

    // Verifica que o DB foi acessado e retornou dados
    expect(historico).toHaveLength(1);

    const registro = historico[0];

    // Verifica campo "medicamento" — identificado pelo medicamentoId
    expect(registro).toHaveProperty('medicamentoId');
    expect(registro.medicamentoId).toBe(med.id);

    // Verifica campo "horário previsto" — hora em que a dose foi administrada
    expect(registro).toHaveProperty('hora');
    expect(registro.hora).toBe('08:05');

    // Verifica campo "status" implícito — dose registrada possui registradoEm (foi administrada)
    expect(registro).toHaveProperty('registradoEm');
    expect(typeof registro.registradoEm).toBe('string');
  });

  it('deve retornar múltiplos registros no histórico quando há várias doses administradas', () => {
    const med1 = addMedicamento({ nome: 'Atenolol', dosagem: '25mg', horario: '07:00' });
    const med2 = addMedicamento({ nome: 'Metformina', dosagem: '500mg', horario: '12:00' });

    addDose({ medicamentoId: med1.id, administradoPor: 'João', data: '2026-05-28', hora: '07:10' });
    addDose({ medicamentoId: med2.id, administradoPor: 'Ana', data: '2026-05-28', hora: '12:05' });

    const historico = getDoses();

    expect(historico).toHaveLength(2);

    // Cada registro deve conter medicamentoId, hora e registradoEm
    historico.forEach((registro) => {
      expect(registro).toHaveProperty('medicamentoId');
      expect(registro).toHaveProperty('hora');
      expect(registro).toHaveProperty('registradoEm');
    });
  });

  it('deve retornar o histórico com todos os campos esperados de uma dose', () => {
    const med = addMedicamento({ nome: 'Omeprazol', dosagem: '20mg', horario: '06:30' });
    addDose({
      medicamentoId: med.id,
      administradoPor: 'Carlos',
      data: '2026-05-28',
      hora: '06:35',
      observacao: 'Administrado com água',
    });

    const historico = getDoses();
    const registro = historico[0];

    // Estrutura completa do histórico
    expect(registro).toMatchObject({
      medicamentoId: med.id,
      administradoPor: 'Carlos',
      data: '2026-05-28',
      hora: '06:35',
      observacao: 'Administrado com água',
    });
    expect(registro).toHaveProperty('id');
    expect(registro).toHaveProperty('registradoEm');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Bloco 2: getDosesPendentes() — histórico de doses pendentes (não administradas)
// ─────────────────────────────────────────────────────────────────────────────
describe('HU6 - Histórico de Administrações: getDosesPendentes()', () => {
  it('deve acessar o banco de dados e retornar um array', () => {
    const pendentes = getDosesPendentes();

    expect(Array.isArray(pendentes)).toBe(true);
  });

  it('deve retornar registros pendentes com os campos: medicamento (nome), horário previsto (horarioPrevisto) e status', () => {
    // Cadastra medicamento com horário no passado para garantir que apareça como pendente
    addMedicamento({ nome: 'Rivotril', dosagem: '0,5mg', horario: '00:01' });

    const pendentes = getDosesPendentes();

    // Deve haver ao menos um pendente (horário 00:01 já passou)
    expect(pendentes.length).toBeGreaterThanOrEqual(1);

    const registro = pendentes[0];

    // Verifica campo "medicamento" — nome do medicamento
    expect(registro).toHaveProperty('nome');
    expect(typeof registro.nome).toBe('string');

    // Verifica campo "horário previsto"
    expect(registro).toHaveProperty('horarioPrevisto');
    expect(typeof registro.horarioPrevisto).toBe('string');

    // Verifica campo "status"
    expect(registro).toHaveProperty('status');
    expect(registro.status).toBe('pendente');
  });

  it('deve retornar estrutura completa do histórico pendente com medicamentoId, nome, horarioPrevisto e status', () => {
    addMedicamento({ nome: 'Captopril', dosagem: '25mg', horario: '00:01' });

    const pendentes = getDosesPendentes();

    expect(pendentes.length).toBeGreaterThanOrEqual(1);

    pendentes.forEach((registro) => {
      expect(registro).toMatchObject({
        status: 'pendente',
      });
      expect(registro).toHaveProperty('medicamentoId');
      expect(registro).toHaveProperty('nome');
      expect(registro).toHaveProperty('horarioPrevisto');
    });
  });

  it('não deve retornar dose como pendente quando ela já foi administrada hoje', () => {
    const med = addMedicamento({ nome: 'Dipirona', dosagem: '500mg', horario: '00:01' });

    // Registra a dose como administrada hoje
    const hoje = new Date().toISOString().split('T')[0];
    addDose({ medicamentoId: med.id, administradoPor: 'Pedro', data: hoje, hora: '00:05' });

    const pendentes = getDosesPendentes();

    // A dose já foi administrada, não deve aparecer como pendente
    const encontrado = pendentes.find((p) => p.medicamentoId === med.id);
    expect(encontrado).toBeUndefined();
  });
});
