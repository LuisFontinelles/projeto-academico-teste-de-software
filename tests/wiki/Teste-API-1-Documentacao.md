# Documentação da API — Cadastro de Medicamento

## Endpoint

`POST /medicamentos`

## Descrição

Responsável pelo cadastro de novos medicamentos associados ao idoso, incluindo nome, dosagem e horário de administração.

## Requisição

### Headers

| Key | Value |
|-----|-------|
| Content-Type | application/json |

### Body

```json
{
  "nome": "string",
  "dosagem": "string",
  "horario": "HH:MM"
}
```

## Respostas

### 201 — Medicamento cadastrado com sucesso

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

### 400 — Nome inválido

```json
{
  "status": "erro",
  "mensagem": "Nome do medicamento é obrigatório",
  "codigoErro": "NOME_INVALIDO",
  "timestamp": "2026-05-28T17:00:00.000Z"
}
```

### 400 — Dosagem inválida

```json
{
  "status": "erro",
  "mensagem": "Dosagem é obrigatória",
  "codigoErro": "DOSAGEM_INVALIDA",
  "timestamp": "2026-05-28T17:00:00.000Z"
}
```

### 400 — Horário inválido

```json
{
  "status": "erro",
  "mensagem": "Horário inválido. Use o formato HH:MM",
  "codigoErro": "HORARIO_INVALIDO",
  "timestamp": "2026-05-28T17:00:00.000Z"
}
```
