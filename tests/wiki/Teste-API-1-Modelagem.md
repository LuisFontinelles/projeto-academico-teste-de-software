# Teste de API 1 — Modelagem

## Endpoint

`POST /medicamentos`

## Técnica Aplicada: Particionamento de Equivalência

O endpoint recebe os campos `nome`, `dosagem` e `horario`. Para cada campo, foram identificadas partições válidas e inválidas.

---

### Partições de Equivalência — Campo: `nome`

| Índice | Partição | Descrição | Resultado Esperado |
|--------|----------|-----------|-------------------|
| P1 | Válido | Nome preenchido com 1 a 100 caracteres | Medicamento cadastrado com sucesso |
| P2 | Inválido — vazio | Campo `nome` vazio ou ausente | Nome do medicamento é obrigatório |
| P3 | Inválido — muito longo | Nome com mais de 100 caracteres | Nome do medicamento deve ter no máximo 100 caracteres |

### Partições de Equivalência — Campo: `dosagem`

| Índice | Partição | Descrição | Resultado Esperado |
|--------|----------|-----------|-------------------|
| P4 | Válido | Dosagem preenchida (qualquer string não vazia) | Medicamento cadastrado com sucesso |
| P5 | Inválido — vazio | Campo `dosagem` vazio ou ausente | Dosagem é obrigatória |

### Partições de Equivalência — Campo: `horario`

| Índice | Partição | Descrição | Resultado Esperado |
|--------|----------|-----------|-------------------|
| P6 | Válido | Horário no formato HH:MM com valores entre 00:00 e 23:59 | Medicamento cadastrado com sucesso |
| P7 | Inválido — formato errado | Horário fora do padrão HH:MM | Horário inválido. Use o formato HH:MM |
| P8 | Inválido — valores impossíveis | Horário com horas > 23 ou minutos > 59 | Horário inválido. Use o formato HH:MM |

---

## Casos de Teste

### CT01 — Cadastro válido (P1 + P4 + P6)

```json
{
  "nome": "Losartana",
  "dosagem": "50mg",
  "horario": "08:00"
}
```

**Resultado esperado:** `201 — Medicamento cadastrado com sucesso`

---

### CT02 — Nome ausente (P2)

```json
{
  "nome": "",
  "dosagem": "50mg",
  "horario": "08:00"
}
```

**Resultado esperado:** `400 — Nome do medicamento é obrigatório`

---

### CT03 — Horário inválido — valores impossíveis (P8)

```json
{
  "nome": "Atenolol",
  "dosagem": "25mg",
  "horario": "25:99"
}
```

**Resultado esperado:** `400 — Horário inválido. Use o formato HH:MM`

---

### CT04 — Dosagem ausente (P5)

```json
{
  "nome": "Atenolol",
  "dosagem": "",
  "horario": "08:00"
}
```

**Resultado esperado:** `400 — Dosagem é obrigatória`
