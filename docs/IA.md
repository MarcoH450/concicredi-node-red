# Consultor IA e engenharia de prompt

## Implementação identificada

O nó `function 1` lê vendas, filtros e lotes do contexto global, calcula agregados em JavaScript e prepara uma chamada POST para `https://api.groq.com/openai/v1/chat/completions`. O payload indica `llama-3.3-70b-versatile`, temperatura 0,1 e duas mensagens: uma de sistema e a pergunta atual.

O nó HTTP Request faz a chamada; `function 2` lê `choices[0].message.content`, adiciona a resposta ao histórico global e devolve JSON com `status`, `dataAnalise`, `insights` e `historico`. O uso da API segue o formato descrito na [compatibilidade OpenAI da Groq](https://console.groq.com/docs/openai).

O componente acessa o provedor Groq; o formato compatível não significa que o projeto utiliza a API da OpenAI.

## O que é calculado e o que chega ao modelo

O código constrói indicadores globais, totais por loja, agregados mensais e combinações de bandeira/modalidade/loja/mês. Entretanto, o prompt final envia apenas parte dessas informações: indicadores resumidos, faturamento das lojas, uma consulta específica sobre a menor bandeira na Filial 1 em maio e referências fixas.

O relatório acadêmico descreve regras de alerta para taxa média acima de 2,2% e participação da filial abaixo de 40%. Essas regras não aparecem como decisões efetivas no prompt final exportado. Também há contagem de status de lotes calculada, mas não incluída no contexto final enviado.

## Limitações importantes para a apresentação

- O prompt fixa janeiro a maio de 2026 e inclui totais históricos escritos literalmente no código. Esses números podem contradizer um CSV novo, incluindo o exemplo deste repositório.
- O histórico exibido na tela não é encaminhado como conversa completa na requisição. O modelo recebe a pergunta atual, e não todas as mensagens anteriores.
- O código acrescenta respostas da IA ao histórico global, mas não armazena as perguntas do usuário nesse mesmo caminho.
- Uma temperatura baixa e instruções rígidas não garantem respostas corretas ou ausência de invenções.
- Agregados financeiros e o texto da pergunta saem do computador quando a chamada à Groq acontece. Use somente dados fictícios nesta demonstração.
- A consulta usa GET e inclui a pergunta na URL, que pode aparecer em registros do servidor/navegador.

Use o chat para demonstrar a integração e discutir suas limitações. Não utilize suas respostas como validação de valores financeiros.

## Preparação da versão pública

A chave literal encontrada no export foi substituída por `env.get("GROQ_API_KEY")`. Sem chave, a função devolve aviso local. A segunda saída foi conectada ao formatador de resposta para que avisos não deixem a requisição esperando.

O arquivo [`prompt-desenvolvimento.txt`](prompt-desenvolvimento.txt) é um artefato histórico de orientação de um assistente de desenvolvimento. Ele não é o system prompt executado pelo consultor financeiro e não é carregado automaticamente pelo fluxo.

## Evolução sugerida

Remover os números fixos, fornecer apenas métricas calculadas e identificadas por período, alinhar os filtros da IA aos da tela, transmitir histórico limitado quando necessário e validar respostas com casos de referência. Isso constitui trabalho futuro, não correção já concluída nesta documentação.
