# Demonstração e validação

## Roteiro para apresentação

1. Abra o README e explique o problema: reunir vendas e recebimentos para facilitar a conferência financeira.
2. Mostre uma tela do [protótipo inicial](PROTOTIPAGEM.md) e explique a evolução para Node-RED.
3. No editor, apresente o caminho HTTP In → Motor ETL → Processador de vendas → Template → HTTP Response.
4. Acesse o sistema local, entre com a conta de demonstração e abra Vendas.
5. Importe `examples/vendas-demo.csv`. Mostre 6 vendas, bruto R$ 3.000,00, taxas R$ 68,60 e líquido R$ 2.931,40.
6. Filtre Matriz: 3 vendas e bruto R$ 1.800,00. Limpe os filtros antes de continuar.
7. Abra o dashboard e explique que seus indicadores leem o CSV. Informe que a comparação com 2025 é simulada.
8. Abra Recebimentos, selecione um lote e demonstre validar, reverter e adicionar/remover um encargo. Explique que os lotes são gerados para demonstração e não correspondem ao CSV.
9. Abra o consultor. Sem chave, mostre o aviso de configuração. Com chave, use apenas dados fictícios e apresente a integração como experimental; respostas podem divergir por causa de referências fixas no prompt.
10. Termine com as próximas melhorias: autenticação, persistência e conciliação sobre uma base única.

## Evidências para o GitHub e a disciplina

Registre as telas de vendas e dashboard usando exclusivamente o CSV fictício. Uma captura do fluxo no editor, uma dos resultados e uma do histórico Git ajudam a comprovar funcionamento e versionamento. Salve-as em `docs/imagens/` com nomes descritivos e acrescente links ao README após revisar o conteúdo.

As capturas acadêmicas de execução não foram incluídas no pacote. Posteriormente, o autor forneceu e confirmou como fictícia uma base de 750 vendas. Ela está disponível em `examples/vendas-750.csv`, com a [revisão correspondente](REVISAO-CSV.md).

Para demonstrar essa base, substitua o passo de importação pelo arquivo de 750 vendas. Os resultados esperados são bruto de R$ 358.328,95, tarifas de R$ 6.049,81 e líquido importado de R$ 343.465,19. A diferença entre bruto menos tarifas e líquido deve ser explicada como inconsistência da massa fictícia ou ausência de outros componentes, sem apresentar a base como conciliada.

## Teste automatizado

```bash
node tests/validar.cjs
```

O teste carrega as funções diretamente do JSON e simula `msg`, contexto global e variáveis de ambiente. Verifica JSON e referências, sintaxe JavaScript, importação, totais, filtro Matriz, dashboard, geração de 300 lotes, validação/reversão, encargos, avisos e payload da IA, resposta simulada e redirecionamentos do login.

Não há chamada ao provedor nos testes. O resultado não confirma a qualidade da resposta do modelo, compatibilidade visual entre navegadores ou segurança da aplicação.

## Registro desta preparação

Ambiente utilizado: Node-RED 5.0.7 e Node.js 24.21.0. Os testes das funções passaram. Em instância isolada, as sete rotas de leitura responderam HTTP 200, o upload multipart funcionou e os totais do exemplo pequeno apareceram nas páginas de vendas e dashboard. O chat sem chave respondeu com aviso, sem conexão ao provedor.

A validação HTTP foi repetida com `vendas-750.csv`: upload e apresentação dos totais no dashboard passaram. Os testes isolados também confirmaram que o CSV original com vírgulas resulta em zero vendas nesse parser, enquanto a cópia normalizada gera 750 registros. O conversor reproduziu byte a byte a cópia publicada e recusou sobrescrever um destino já existente.

Consulte o resultado do comando no seu ambiente ao reproduzir. Nenhuma chave real é necessária para os testes; a integração autenticada com Groq exige validação separada. Os testes HTTP não validam integralmente aparência, interação visual ou resposta do modelo.
