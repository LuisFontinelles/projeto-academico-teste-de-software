# Implementação no Postman — Teste de API 2

## Endpoint Testado

`POST http://localhost:3001/doses`

## Pré-condição

O medicamento deve estar cadastrado antes da execução dos testes. A coleção inclui uma requisição de **Setup** que cadastra um medicamento e salva o ID gerado na variável de ambiente `medicamentoIdDose`.

## Arquivo da Coleção

[`tests/api/caresenior-api.postman_collection.json`](../blob/main/tests/api/caresenior-api.postman_collection.json)

Execute a pasta **Teste 2 — POST /doses**.

---

## Caso de Teste 01 — Registro válido

### Body (Request)

```json
{
  "medicamentoId": {{medicamentoIdDose}},
  "administradoPor": "Maria Silva"
}
```

### Testes (Postman → Tests)

```javascript
pm.test("Status code deve ser 201", function () {
    pm.response.to.have.status(201);
});
pm.test("Status é sucesso", function () {
    var json = pm.response.json();
    pm.expect(json.status).to.eql('sucesso');
});
pm.test("Dose contém campo administradoPor", function () {
    var json = pm.response.json();
    pm.expect(json.dados.administradoPor).to.eql('Maria Silva');
});
```

---

## Caso de Teste 02 — medicamentoId abaixo do limite (0)

### Body (Request)

```json
{
  "medicamentoId": 0,
  "administradoPor": "Maria Silva"
}
```

### Testes (Postman → Tests)

```javascript
pm.test("Status code deve ser 404", function () {
    pm.response.to.have.status(404);
});
pm.test("Medicamento não encontrado", function () {
    var json = pm.response.json();
    pm.expect(json.codigoErro).to.eql('MEDICAMENTO_NAO_ENCONTRADO');
});
```

---

## Caso de Teste 03 — administradoPor vazio

### Body (Request)

```json
{
  "medicamentoId": {{medicamentoIdDose}},
  "administradoPor": ""
}
```

### Testes (Postman → Tests)

```javascript
pm.test("Status code deve ser 400", function () {
    pm.response.to.have.status(400);
});
pm.test("Código de erro de administrador", function () {
    var json = pm.response.json();
    pm.expect(json.codigoErro).to.eql('ADMINISTRADO_POR_INVALIDO');
});
```

---

## Caso de Teste 04 — Data com formato inválido

### Body (Request)

```json
{
  "medicamentoId": {{medicamentoIdDose}},
  "administradoPor": "João",
  "data": "28-05-2026"
}
```

### Testes (Postman → Tests)

```javascript
pm.test("Status code deve ser 400", function () {
    pm.response.to.have.status(400);
});
pm.test("Código de erro de data", function () {
    var json = pm.response.json();
    pm.expect(json.codigoErro).to.eql('DATA_INVALIDA');
});
```
