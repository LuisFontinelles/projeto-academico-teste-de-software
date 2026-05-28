# Teste de Interface 2 — Modelagem

## Interface

Tela de Registro de Dose (`/registrar-dose`)

## Técnica Aplicada: Particionamento de Equivalência

A tela de registro de dose possui dois campos: **medicamento** (select) e **administrado por** (texto). Foram identificadas partições para cada campo.

---

## Partições de Equivalência — Campo: `medicamento` (select)

| Índice | Partição | Descrição | Resultado Esperado |
|--------|----------|-----------|-------------------|
| P1 | Inválido | Nenhum medicamento selecionado (opção vazia) | Mensagem de erro / falha ao registrar |
| P2 | Válido | Medicamento existente selecionado | Dose registrada com sucesso! |

## Partições de Equivalência — Campo: `administradoPor`

| Índice | Partição | Descrição | Resultado Esperado |
|--------|----------|-----------|-------------------|
| P3 | Inválido | Campo vazio | Mensagem de erro obrigatório |
| P4 | Válido | Nome preenchido | Dose registrada com sucesso! |

---

## Casos de Teste Derivados

### CT01 — Dados válidos (P2 + P4)

| Campo | Valor |
|-------|-------|
| Medicamento | Losartana — 50mg (08:00) |
| Administrado por | Maria Silva |

**Resultado esperado:** `Dose registrada com sucesso!`

---

### CT02 — Administrador vazio (P2 + P3)

| Campo | Valor |
|-------|-------|
| Medicamento | Losartana — 50mg (08:00) |
| Administrado por | (vazio) |

**Resultado esperado:** Mensagem de erro contendo `obrigatório`

---

### CT03 — Sem medicamento selecionado (P1 + P4)

| Campo | Valor |
|-------|-------|
| Medicamento | (nenhum selecionado) |
| Administrado por | João |

**Resultado esperado:** Mensagem de erro contendo `obrigatório`
