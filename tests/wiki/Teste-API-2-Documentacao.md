# Documentação da API — Registro de Dose

## Endpoint

`POST /doses`

## Descrição

Registra a administração de uma dose de medicamento por um cuidador ou familiar. O medicamento deve estar previamente cadastrado no sistema.

## Requisição

### Headers

| Key | Value |
|-----|-------|
| Content-Type | application/json |

### Body

```json
{
  "medicamentoId": "number",
  "administradoPor": "string",
  "data": "YYYY-MM-DD (opcional)",
  "hora": "HH:MM (opcional)",
  "observacao": "string (opcional)"
}
```

## Respostas

### 201 — Dose registrada com sucesso

```json
{
  "status": "sucesso",
  "mensagem": "Dose registrada com sucesso",
  "dados": {
    "id": 1,
    "medicamentoId": 1,
    "administradoPor": "Maria Silva",
    "data": "2026-05-28",
    "hora": "08:05",
    "observacao": null,
    "registradoEm": "2026-05-28T08:05:00.000Z"
  }
}
```

### 400 — ID do medicamento inválido

```json
{
  "status": "erro",
  "mensagem": "ID do medicamento é obrigatório e deve ser um número",
  "codigoErro": "MEDICAMENTO_ID_INVALIDO",
  "timestamp": "2026-05-28T17:00:00.000Z"
}
```

### 400 — Administrador inválido

```json
{
  "status": "erro",
  "mensagem": "Nome de quem administrou é obrigatório",
  "codigoErro": "ADMINISTRADO_POR_INVALIDO",
  "timestamp": "2026-05-28T17:00:00.000Z"
}
```

### 400 — Data inválida

```json
{
  "status": "erro",
  "mensagem": "Data inválida. Use o formato YYYY-MM-DD",
  "codigoErro": "DATA_INVALIDA",
  "timestamp": "2026-05-28T17:00:00.000Z"
}
```

### 404 — Medicamento não encontrado

```json
{
  "status": "erro",
  "mensagem": "Medicamento não encontrado",
  "codigoErro": "MEDICAMENTO_NAO_ENCONTRADO",
  "timestamp": "2026-05-28T17:00:00.000Z"
}
```
