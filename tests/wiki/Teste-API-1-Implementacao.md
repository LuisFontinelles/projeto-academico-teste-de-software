# Implementação no Postman — Teste de API 1

## Endpoint Testado

`POST http://localhost:3001/medicamentos`

## Configuração da Requisição

### Headers

| Key | Value |
|-----|-------|
| Content-Type | application/json |

### Autenticação

Não aplicável.

---

## Caso de Teste 01 — Cadastro válido

### Body (Request)

```json
{
  "nome": "Losartana",
  "dosagem": "50mg",
  "horario": "08:00"
}
```

### Testes (Postman → Tests)

```javascript
pm.test("Status code deve ser 201", function () {
    pm.response.to.have.status(201);
});
pm.test("Resposta contém campo status", function () {
    var json = pm.response.json();
    pm.expect(json).to.have.property('status');
});
pm.test("Status é sucesso", function () {
    var json = pm.response.json();
    pm.expect(json.status).to.eql('sucesso');
});
pm.test("Resposta contém dados do medicamento", function () {
    var json = pm.response.json();
    pm.expect(json.dados).to.have.property('id');
    pm.expect(json.dados.nome).to.eql('Losartana');
});
```

---

## Caso de Teste 02 — Nome ausente

### Body (Request)

```json
{
  "nome": "",
  "dosagem": "50mg",
  "horario": "08:00"
}
```

### Testes (Postman → Tests)

```javascript
pm.test("Status code deve ser 400", function () {
    pm.response.to.have.status(400);
});
pm.test("Mensagem de erro de nome", function () {
    var json = pm.response.json();
    pm.expect(json.mensagem).to.eql("Nome do medicamento é obrigatório");
});
pm.test("Código de erro correto", function () {
    var json = pm.response.json();
    pm.expect(json.codigoErro).to.eql("NOME_INVALIDO");
});
```

---

## Caso de Teste 03 — Horário inválido

### Body (Request)

```json
{
  "nome": "Atenolol",
  "dosagem": "25mg",
  "horario": "25:99"
}
```

### Testes (Postman → Tests)

```javascript
pm.test("Status code deve ser 400", function () {
    pm.response.to.have.status(400);
});
pm.test("Mensagem de erro de horário", function () {
    var json = pm.response.json();
    pm.expect(json.mensagem).to.include("Horário inválido");
});
pm.test("Código de erro correto", function () {
    var json = pm.response.json();
    pm.expect(json.codigoErro).to.eql("HORARIO_INVALIDO");
});
```

---

## Caso de Teste 04 — Dosagem ausente

### Body (Request)

```json
{
  "nome": "Atenolol",
  "dosagem": "",
  "horario": "08:00"
}
```

### Testes (Postman → Tests)

```javascript
pm.test("Status code deve ser 400", function () {
    pm.response.to.have.status(400);
});
pm.test("Mensagem de erro de dosagem", function () {
    var json = pm.response.json();
    pm.expect(json.mensagem).to.eql("Dosagem é obrigatória");
});
```

---

## Arquivo da Coleção

A coleção completa está disponível no repositório:  
[`tests/api/caresenior-api.postman_collection.json`](../blob/main/tests/api/caresenior-api.postman_collection.json)

### Como importar e executar

1. Abra o Postman
2. Clique em **Import** → selecione o arquivo `caresenior-api.postman_collection.json`
3. Com a API rodando em `http://localhost:3001`, execute a pasta **Teste 1 — POST /medicamentos**
