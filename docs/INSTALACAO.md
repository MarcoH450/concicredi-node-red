# Instalação e configuração

## Ambiente

O projeto é um fluxo Node-RED, com HTML/CSS nos nós Template e JavaScript nos nós Function. Não há aplicação React, banco relacional ou pacote npm próprio para compilar.

Instale uma versão de Node.js suportada pelo Node-RED e siga a [instalação oficial](https://nodered.org/docs/getting-started/local). As versões do ambiente original não constam nos materiais recebidos; registre as versões utilizadas ao demonstrar seu ambiente.

Na preparação deste pacote, funções e rotas HTTP foram verificadas com Node-RED 5.0.7 e Node.js 24.21.0, sem chamada autenticada à Groq.

A cópia publicada contém apenas tipos de nós nativos. O export original declarava `@fdecourt/node-red-contrib-groq` 0.0.3, mas o único nó de configuração desse pacote não era referenciado. Ele foi removido nesta cópia: a integração efetiva usa o nó HTTP Request.

O navegador busca Chart.js em um CDN e uma fonte do Google. A IA depende de internet e de uma chave válida da Groq. ETL e tabelas podem ser demonstrados sem chave; os gráficos dependem do carregamento da biblioteca externa.

## Opção visual em uma instância de testes

1. Abra o editor Node-RED.
2. Use o menu **Importar → selecionar um arquivo**.
3. Selecione `flows/concicred.json` deste repositório e importe as abas.
4. Confira as abas login, menu, dashboard, vendas, recebimentos, suporte e agente consultor.
5. Clique em **Deploy / Implementar**.
6. Abra `http://localhost:1880/login` em outra aba.

Use uma instância local de testes. A configuração da instância existente não é modificada pela importação do JSON; `settings.demo.js` só vale quando selecionado explicitamente na inicialização.

## Opção com instância isolada

Com o comando `node-red` já disponível, abra o terminal na raiz deste repositório:

```bash
node-red --userDir .runtime --settings ./settings.demo.js
```

Importe o JSON pelo editor como descrito acima. O diretório `.runtime` é criado para o estado desta demonstração e está ignorado pelo Git. Se a porta 1880 estiver ocupada, acrescente `--port 1881` e use essa porta nos endereços.

O arquivo de configuração fornecido limita o servidor ao próprio computador. Ele não prepara autenticação de produção nem acesso por outros dispositivos.

## Contas demonstrativas

| Perfil | Login | Senha de teste |
| --- | --- | --- |
| Administrador | administrador@teste.com | 123456 |
| Consultoria | consultoria@teste.com | 123456 |
| Pessoa PJ | pj@teste.com | 123456 |
| Contabilidade | contabilidade@teste.com | 123456 |

Esses valores fazem parte do protótipo e não são contas reais. Os perfis previstos na modelagem não possuem controle efetivo de autorização por rota.

## IA opcional

A cópia publicada busca a variável `GROQ_API_KEY` no ambiente do processo Node-RED, por meio de `env.get`. Consulte [variáveis de ambiente no Node-RED](https://nodered.org/docs/user-guide/environment-variables).

No Linux/Bash, para informar a chave sem gravá-la no histórico do terminal:

```bash
read -rsp 'Chave Groq: ' GROQ_API_KEY
export GROQ_API_KEY
node-red --userDir .runtime --settings ./settings.demo.js
```

A chave deve estar no ambiente **antes** de iniciar o processo. Se o Node-RED roda como serviço, configure o ambiente desse serviço; executar `export` em outro terminal não altera um processo já iniciado. Não coloque a chave no JSON nem no arquivo de configuração versionado.

Sem chave, o chat mostra um aviso local. Com chave, importe o CSV antes de enviar perguntas. Chamadas ao serviço usam sua conta e suas condições de uso. O projeto mantém o modelo `llama-3.3-70b-versatile` indicado no export; caso a API não o disponibilize à sua conta, verifique o catálogo do provedor antes de alterar o nó.

## Problemas frequentes

| Sintoma | Verificação |
| --- | --- |
| Nó `groq-config` desconhecido | Foi importado um export antigo; a cópia deste repositório não usa esse nó |
| Dashboard zerado | Importe o CSV e limpe os filtros |
| Vendas não importam | Confira o formato de dez colunas e o upload habilitado no POST `/vendas` |
| Gráficos não aparecem | Verifique o carregamento de Chart.js e os erros no console do navegador |
| Chat avisa sobre configuração | Reinicie o processo com a variável `GROQ_API_KEY` definida |
| Chat apresenta erro da IA | Verifique a chave, acesso ao modelo e resposta HTTP sem compartilhar credenciais |
| Dados mudaram após reiniciar | O armazenamento padrão deste pacote é em memória |
| Rotas repetidas ou comportamento inesperado | Importe apenas uma versão em uma instância limpa |
