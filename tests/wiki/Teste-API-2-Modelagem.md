# Teste de API 2 — Modelagem

## Endpoint

`POST /doses`

## Técnica Aplicada: Análise de Valor Limite

O endpoint registra a administração de uma dose de medicamento. O campo `medicamentoId` deve corresponder a um ID existente (sempre inteiro positivo, começando em 1). A análise de valor limite foi aplicada sobre esse campo, além do particionamento de equivalência nos campos de texto.

---

## Análise de Valor Limite — Campo: `medicamentoId`

Considerando que IDs válidos são inteiros ≥ 1:

| Índice | Valor | Classe | Resultado Esperado |
|--------|-------|--------|--------------------|
| VL1 | 0 | Abaixo do limite (inválido) | 404 — Medicamento não encontrado |
| VL2 | 1 | No limite inferior (válido, se existir) | 201 — Dose registrada com sucesso |
| VL3 | ID existente | Dentro da faixa válida | 201 — Dose registrada com sucesso |
| VL4 | 9999 | Acima do limite (inválido, não existe) | 404 — Medicamento não encontrado |

---

## Partições de Equivalência — Campo: `administradoPor`

| Índice | Partição | Descrição | Resultado Esperado |
|--------|----------|-----------|-------------------|
| P1 | Inválido — vazio | Campo vazio ou ausente | 400 — Nome de quem administrou é obrigatório |
| P2 | Válido | Qualquer string não vazia | 201 — Dose registrada com sucesso |

---

## Partições de Equivalência — Campo: `data` (opcional)

| Índice | Partição | Descrição | Resultado Esperado |
|--------|----------|-----------|-------------------|
| P3 | Ausente | Campo não enviado | 201 — usa data atual |
| P4 | Válido | Formato YYYY-MM-DD | 201 — Dose registrada com sucesso |
| P5 | Inválido | Formato diferente de YYYY-MM-DD | 400 — Data inválida |

---

## Casos de Teste

### CT01 — Registro de dose válido (VL3 + P2 + P3)

```json
{
  "medicamentoId": 1,
  "administradoPor": "Maria Silva"
}
```

**Resultado esperado:** `201 — Dose registrada com sucesso`

---

### CT02 — medicamentoId abaixo do limite (VL1)

```json
{
  "medicamentoId": 0,
  "administradoPor": "Maria Silva"
}
```

**Resultado esperado:** `404 — Medicamento não encontrado`

---

### CT03 — administradoPor vazio (P1)

```json
{
  "medicamentoId": 1,
  "administradoPor": ""
}
```

**Resultado esperado:** `400 — Nome de quem administrou é obrigatório`

---

### CT04 — Data com formato inválido (P5)

```json
{
  "medicamentoId": 1,
  "administradoPor": "João",
  "data": "28-05-2026"
}
```

**Resultado esperado:** `400 — Data inválida. Use o formato YYYY-MM-DD`
