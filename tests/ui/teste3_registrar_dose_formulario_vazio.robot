*** Settings ***
Library           SeleniumLibrary
Suite Setup       Abrir Navegador
Suite Teardown    Fechar Navegador

*** Variables ***
${URL_DOSE}         http://localhost:3000/registrar-dose
${BROWSER}          chrome
${SELECT_MED}       id=medicamentoId
${INPUT_ADM}        id=administradoPor
${BTN_REGISTRAR}    id=btn-registrar

*** Test Cases ***

CT01 - Não deve enviar formulário com todos os campos vazios
    [Documentation]    Valor Limite / Partição Inválida — Formulário completamente vazio não deve ser submetido
    Dado que o usuario acessa a tela de registro de dose
    E nao preenche nenhum campo
    Quando tenta registrar a dose
    Então o formulário não deve ser enviado
    E o campo medicamento deve ser inválido
    E o campo administrado por deve ser inválido

CT02 - Não deve enviar formulário sem selecionar medicamento
    [Documentation]    Partição Inválida — Medicamento não selecionado, administrador preenchido
    Dado que o usuario acessa a tela de registro de dose
    E nao seleciona medicamento
    E informa quem administrou    Maria Silva
    Quando tenta registrar a dose
    Então o formulário não deve ser enviado
    E o campo medicamento deve ser inválido

CT03 - Não deve enviar formulário sem informar administrador
    [Documentation]    Partição Inválida — Medicamento selecionado, administrador vazio
    Dado que o usuario acessa a tela de registro de dose
    E seleciona o primeiro medicamento disponivel
    E nao informa quem administrou
    Quando tenta registrar a dose
    Então o formulário não deve ser enviado
    E o campo administrado por deve ser inválido

*** Keywords ***

Abrir Navegador
    Open Browser    ${URL_DOSE}    ${BROWSER}
    Maximize Browser Window

Fechar Navegador
    Close Browser

Dado que o usuario acessa a tela de registro de dose
    Go To    ${URL_DOSE}
    Wait Until Element Is Visible    ${BTN_REGISTRAR}    timeout=10s

E nao preenche nenhum campo
    Select From List By Index    ${SELECT_MED}    0
    Clear Element Text    ${INPUT_ADM}

E nao seleciona medicamento
    Select From List By Index    ${SELECT_MED}    0

E seleciona o primeiro medicamento disponivel
    Wait Until Element Is Visible    ${SELECT_MED}    timeout=5s
    ${options}=    Get List Items    ${SELECT_MED}
    ${tamanho}=    Get Length    ${options}
    Run Keyword If    ${tamanho} > 1    Select From List By Index    ${SELECT_MED}    1

E informa quem administrou
    [Arguments]    ${nome}
    Clear Element Text    ${INPUT_ADM}
    Input Text    ${INPUT_ADM}    ${nome}

E nao informa quem administrou
    Clear Element Text    ${INPUT_ADM}

Quando tenta registrar a dose
    Click Button    ${BTN_REGISTRAR}
    Sleep    1s

Então o formulário não deve ser enviado
    Page Should Not Contain Element    id=mensagem

E o campo medicamento deve ser inválido
    ${valido}=    Execute Javascript    return document.getElementById('medicamentoId').validity.valid
    Should Be Equal    ${valido}    ${False}

E o campo administrado por deve ser inválido
    ${valido}=    Execute Javascript    return document.getElementById('administradoPor').validity.valid
    Should Be Equal    ${valido}    ${False}
