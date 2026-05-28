*** Settings ***
Library           SeleniumLibrary
Library           RequestsLibrary
Suite Setup       Preparar Ambiente
Suite Teardown    Fechar Navegador

*** Variables ***
${URL_DOSE}         http://localhost:3000/registrar-dose
${URL_CADASTRAR}    http://localhost:3000/cadastrar
${BROWSER}          chrome
${SELECT_MED}       id=medicamentoId
${INPUT_ADM}        id=administradoPor
${BTN_REGISTRAR}    id=btn-registrar
${MENSAGEM}         id=mensagem

*** Test Cases ***

CT01 - Deve registrar dose com medicamento e administrador válidos
    [Documentation]    Particionamento de Equivalência — Partição válida (P3)
    Dado que o usuario acessa a tela de registro de dose
    E seleciona o primeiro medicamento disponivel
    E informa quem administrou    Maria Silva
    Quando solicita o registro
    Então a mensagem deve ser     Dose registrada com sucesso!

CT02 - Deve validar administrador obrigatório
    [Documentation]    Particionamento de Equivalência — Partição inválida (P1): administrador vazio
    Dado que o usuario acessa a tela de registro de dose
    E seleciona o primeiro medicamento disponivel
    E informa quem administrou    ${EMPTY}
    Quando solicita o registro
    Então a mensagem deve conter    obrigatório

CT03 - Deve validar sem medicamento selecionado
    [Documentation]    Particionamento de Equivalência — Partição inválida (P2): nenhum medicamento selecionado
    Dado que o usuario acessa a tela de registro de dose
    E nao seleciona medicamento
    E informa quem administrou    João
    Quando solicita o registro
    Então a mensagem deve conter    obrigatório

*** Keywords ***

Preparar Ambiente
    Open Browser    ${URL_CADASTRAR}    ${BROWSER}
    Maximize Browser Window
    # Cadastra medicamento para o teste
    Wait Until Element Is Visible    id=nome    timeout=10s
    Input Text    id=nome        Losartana
    Input Text    id=dosagem     50mg
    Input Text    id=horario     08:00
    Click Button  id=btn-cadastrar
    Sleep    1s

Fechar Navegador
    Close Browser

Dado que o usuario acessa a tela de registro de dose
    Go To    ${URL_DOSE}
    Wait Until Element Is Visible    ${BTN_REGISTRAR}    timeout=10s

E seleciona o primeiro medicamento disponivel
    Wait Until Element Is Visible    ${SELECT_MED}    timeout=5s
    ${options}=    Get List Items    ${SELECT_MED}
    ${tamanho}=    Get Length    ${options}
    Run Keyword If    ${tamanho} > 1    Select From List By Index    ${SELECT_MED}    1

E nao seleciona medicamento
    Select From List By Index    ${SELECT_MED}    0

E informa quem administrou
    [Arguments]    ${nome}=${EMPTY}
    Clear Element Text    ${INPUT_ADM}
    Run Keyword If    '${nome}' != '${EMPTY}'    Input Text    ${INPUT_ADM}    ${nome}

Quando solicita o registro
    Click Button    ${BTN_REGISTRAR}
    Sleep    1s

Então a mensagem deve ser
    [Arguments]    ${texto}
    Wait Until Element Is Visible    ${MENSAGEM}    timeout=5s
    Element Should Contain    ${MENSAGEM}    ${texto}

Então a mensagem deve conter
    [Arguments]    ${texto}
    Wait Until Element Is Visible    ${MENSAGEM}    timeout=5s
    Element Should Contain    ${MENSAGEM}    ${texto}
