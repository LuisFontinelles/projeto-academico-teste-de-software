# Relatório de Execução — Teste de Interface 1

## Interface Testada

Tela de Cadastro de Medicamento — `http://localhost:3000/cadastrar`

## Ambiente de Testes

| Item | Valor |
|------|-------|
| Ferramenta | Robot Framework + SeleniumLibrary |
| Navegador | Google Chrome |
| Ambiente | Localhost |
| URL | http://localhost:3000/cadastrar |
| Data de execução | 28/05/2026 |

## Script de execução

```bash
robot tests/ui/teste1_cadastro_medicamento.robot
```

---

## Casos de Teste e Resultados

| Caso de Teste | Resultado Esperado | Resultado Obtido | Status |
|---------------|-------------------|-----------------|--------|
| CT01 — Cadastro válido | Medicamento cadastrado com sucesso! | Medicamento cadastrado com sucesso! | ✅ Aprovado |
| CT02 — Nome ausente | Nome do medicamento é obrigatório | Nome do medicamento é obrigatório | ✅ Aprovado |
| CT03 — Dosagem ausente | Dosagem é obrigatória | Dosagem é obrigatória | ✅ Aprovado |
| CT04 — Horário inválido | Horário inválido. Use o formato HH:MM | Horário inválido. Use o formato HH:MM | ✅ Aprovado |

---

## Resumo dos Resultados

| Total de testes | Aprovados | Reprovados |
|-----------------|-----------|------------|
| 4 | 4 | 0 |

---

## Arquivos de Evidência

Os arquivos gerados pelo Robot Framework após a execução estão disponíveis no repositório:

| Arquivo | Descrição | Link |
|---------|-----------|------|
| report.html | Resumo executivo da execução | [report.html](../blob/main/tests/ui/results/teste1/report.html) |
| log.html | Log detalhado da execução | [log.html](../blob/main/tests/ui/results/teste1/log.html) |
| output.xml | Resultado bruto da execução | [output.xml](../blob/main/tests/ui/results/teste1/output.xml) |

---

## Conclusão

Os testes automatizados da tela de cadastro de medicamento apresentaram conformidade com o comportamento esperado. A tabela de decisão cobriu as combinações críticas de validade de campos, e o sistema respondeu corretamente a todas as condições testadas.
