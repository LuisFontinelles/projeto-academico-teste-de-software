# Relatório de Execução — Teste de API 2

## Endpoint Testado

`POST /doses`

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
| CT01 — Registro válido | 201 — Dose registrada com sucesso | 201 — Dose registrada com sucesso | ✅ Aprovado |
| CT02 — medicamentoId = 0 (abaixo do limite) | 404 — Medicamento não encontrado | 404 — Medicamento não encontrado | ✅ Aprovado |
| CT03 — administradoPor vazio | 400 — Nome de quem administrou é obrigatório | 400 — Nome de quem administrou é obrigatório | ✅ Aprovado |
| CT04 — Data com formato inválido | 400 — Data inválida | 400 — Data inválida | ✅ Aprovado |

---

## Resumo dos Resultados

| Total de testes | Aprovados | Reprovados |
|-----------------|-----------|------------|
| 4 | 4 | 0 |

---

## Evidências

### CT01 — Registro válido

**Response Body:**
```json
{
  "status": "sucesso",
  "mensagem": "Dose registrada com sucesso",
  "dados": {
    "id": 1,
    "medicamentoId": 1,
    "administradoPor": "Maria Silva",
    "data": "2026-05-28",
    "hora": "17:00",
    "observacao": null,
    "registradoEm": "2026-05-28T17:00:00.000Z"
  }
}
```

### CT02 — medicamentoId abaixo do limite

**Response Body:**
```json
{
  "status": "erro",
  "mensagem": "Medicamento não encontrado",
  "codigoErro": "MEDICAMENTO_NAO_ENCONTRADO",
  "timestamp": "2026-05-28T17:01:00.000Z"
}
```

### CT03 — administradoPor vazio

**Response Body:**
```json
{
  "status": "erro",
  "mensagem": "Nome de quem administrou é obrigatório",
  "codigoErro": "ADMINISTRADO_POR_INVALIDO",
  "timestamp": "2026-05-28T17:02:00.000Z"
}
```

### CT04 — Data com formato inválido

**Response Body:**
```json
{
  "status": "erro",
  "mensagem": "Data inválida. Use o formato YYYY-MM-DD",
  "codigoErro": "DATA_INVALIDA",
  "timestamp": "2026-05-28T17:03:00.000Z"
}
```

---

## Conclusão

Os testes executados sobre o endpoint `POST /doses` validaram o comportamento esperado conforme os requisitos RF3 (Registrar administração de dose) e a análise de valor limite aplicada sobre o campo `medicamentoId`. Todos os casos de teste foram aprovados.
