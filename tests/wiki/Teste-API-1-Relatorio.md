# Relatório de Execução — Teste de API 1

## Endpoint Testado

`POST /medicamentos`

## Ambiente de Testes

| Item | Valor |
|------|-------|
| Ferramenta | Postman |
| Ambiente | Local (localhost) |
| Base URL | http://localhost:3001 |
| Data de execução | 28/05/2026 |

---

## Casos de Teste e Resultados

| Caso de Teste | Resultado Esperado | Resultado Obtido | Status |
|---------------|-------------------|-----------------|--------|
| CT01 — Cadastro válido | 201 — Medicamento cadastrado com sucesso | 201 — Medicamento cadastrado com sucesso | ✅ Aprovado |
| CT02 — Nome ausente | 400 — Nome do medicamento é obrigatório | 400 — Nome do medicamento é obrigatório | ✅ Aprovado |
| CT03 — Horário inválido | 400 — Horário inválido | 400 — Horário inválido | ✅ Aprovado |
| CT04 — Dosagem ausente | 400 — Dosagem é obrigatória | 400 — Dosagem é obrigatória | ✅ Aprovado |

---

## Resumo dos Resultados

| Total de testes | Aprovados | Reprovados |
|-----------------|-----------|------------|
| 4 | 4 | 0 |

---

## Evidências

### CT01 — Cadastro válido

**Response Body:**
```json
{
  "status": "sucesso",
  "mensagem": "Medicamento cadastrado com sucesso",
  "dados": {
    "id": 1,
    "nome": "Losartana",
    "dosagem": "50mg",
    "horario": "08:00",
    "criadoEm": "2026-05-28T17:00:00.000Z"
  }
}
```

### CT02 — Nome ausente

**Response Body:**
```json
{
  "status": "erro",
  "mensagem": "Nome do medicamento é obrigatório",
  "codigoErro": "NOME_INVALIDO",
  "timestamp": "2026-05-28T17:01:00.000Z"
}
```

### CT03 — Horário inválido

**Response Body:**
```json
{
  "status": "erro",
  "mensagem": "Horário inválido. Use o formato HH:MM",
  "codigoErro": "HORARIO_INVALIDO",
  "timestamp": "2026-05-28T17:02:00.000Z"
}
```

### CT04 — Dosagem ausente

**Response Body:**
```json
{
  "status": "erro",
  "mensagem": "Dosagem é obrigatória",
  "codigoErro": "DOSAGEM_INVALIDA",
  "timestamp": "2026-05-28T17:03:00.000Z"
}
```

---

## Conclusão

Os testes executados apresentaram conformidade com o comportamento esperado do endpoint `POST /medicamentos`. Todas as validações de campos obrigatórios e regras de formato funcionaram conforme especificado nos requisitos funcionais RF1 e nas regras de negócio RN1 e RN4 do CareSenior.
