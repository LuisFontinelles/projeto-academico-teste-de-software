# Teste de Interface 1 — Modelagem

## Interface

Tela de Cadastro de Medicamento (`/cadastrar`)

## Técnica Aplicada: Tabela de Decisão

A tela de cadastro possui três campos obrigatórios: **nome**, **dosagem** e **horário**. A tabela de decisão foi construída cobrindo as combinações de validade de cada campo.

---

## Tabela de Decisão

| Condição / Regra | CT01 | CT02 | CT03 | CT04 |
|------------------|------|------|------|------|
| R1 — Nome preenchido | S | N | S | S |
| R2 — Dosagem preenchida | S | S | N | S |
| R3 — Horário válido (HH:MM) | S | S | S | N |
| **Resultado esperado** | **Cadastro realizado** | **Nome obrigatório** | **Dosagem obrigatória** | **Horário inválido** |

---

## Casos de Teste Derivados

### CT01 — Todos os campos válidos (R1 + R2 + R3 satisfeitas)

| Campo | Valor |
|-------|-------|
| Nome | Losartana |
| Dosagem | 50mg |
| Horário | 08:00 |

**Resultado esperado:** `Medicamento cadastrado com sucesso!`

---

### CT02 — Nome ausente (R1 violada)

| Campo | Valor |
|-------|-------|
| Nome | (vazio) |
| Dosagem | 50mg |
| Horário | 08:00 |

**Resultado esperado:** `Nome do medicamento é obrigatório`

---

### CT03 — Dosagem ausente (R2 violada)

| Campo | Valor |
|-------|-------|
| Nome | Atenolol |
| Dosagem | (vazio) |
| Horário | 08:00 |

**Resultado esperado:** `Dosagem é obrigatória`

---

### CT04 — Horário inválido (R3 violada)

| Campo | Valor |
|-------|-------|
| Nome | Rivotril |
| Dosagem | 2mg |
| Horário | 99:99 |

**Resultado esperado:** `Horário inválido. Use o formato HH:MM`
