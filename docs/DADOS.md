# Dados e motor ETL

ETL significa extrair, transformar e carregar. Aqui, extrair é ler o CSV enviado pelo formulário; transformar é organizar datas e valores; carregar é armazenar o resultado no contexto global `vendasTotais`.

## Contrato de entrada

Use UTF-8, separador ponto e vírgula (`;`), uma linha de cabeçalho e dez colunas nesta ordem. Os títulos não são interpretados: o motor descarta a primeira linha e usa a posição de cada coluna.

| Posição | Campo | Exemplo | Destino principal |
| --- | --- | --- | --- |
| 1 | Data da venda | 05/01/2026 | `data`, `dataIso` |
| 2 | Loja | Matriz | `loja` |
| 3 | Bandeira | Visa | `bandeira` |
| 4 | Modalidade | Crédito | `modalidade` |
| 5 | Módulo | POS | `modulo` |
| 6 | Valor bruto | 1.000,00 | `vBrutoRaw` |
| 7 | Percentual da taxa | 2,90% | `taxaPercentRaw`, `taxaPerc` |
| 8 | Valor da taxa | 29,00 | `vTaxaRaw` |
| 9 | Data prevista | 04/02/2026 | `dataPrevista` |
| 10 | Valor líquido | 971,00 | `vLiquidoRaw` |

O motor remove pontos de milhar e troca vírgula decimal por ponto. Use `100,50`, e não `100.50`, pois esse último valor seria interpretado incorretamente. Datas devem ter dia e mês com dois dígitos, para que filtros textuais funcionem como esperado.

Os controles da interface reconhecem principalmente `Matriz` e `Filial 1`; `Visa`, `Mastercard`, `Elo` e `PIX`; `Crédito` e `Débito`; `POS`, `TEF` e `Online`. O dashboard inclui Amex no gráfico, mas nem todas as opções possuem filtros equivalentes na interface. Preserve grafia, espaços e acentos dos exemplos.

## Regras efetivamente presentes

- Requisições sem arquivo passam pelo ETL sem substituir a base.
- Linhas vazias são descartadas; linhas com menos de dez colunas são ignoradas.
- A importação substitui toda a base de vendas e limpa `filtroVendas`.
- Não há deduplicação, identificação persistente da venda ou relatório de erros por linha.
- Taxa, líquido e data prevista são lidos do CSV. O ETL não recalcula nem valida a coerência desses três campos.
- O leitor usa divisão simples por `;`; não implementa um parser CSV completo com campos multilinha ou separadores dentro de aspas.

## Exemplo conferível

O arquivo [`vendas-demo.csv`](../examples/vendas-demo.csv) foi criado exclusivamente para esta documentação, com seis vendas fictícias de janeiro a maio de 2026.

Também está disponível a [massa fictícia de 750 vendas fornecida pelo autor](../examples/vendas-750.csv). Sua exportação foi normalizada; veja [a revisão e os totais](REVISAO-CSV.md). Não use `vendas-750-origem.csv` diretamente no motor, pois seu separador é diferente.

| Recorte | Vendas | Bruto | Taxas | Líquido |
| --- | --- | --- | --- | --- |
| Total | 6 | R$ 3.000,00 | R$ 68,60 | R$ 2.931,40 |
| Matriz | 3 | R$ 1.800,00 | R$ 45,20 | R$ 1.754,80 |
| Filial 1 | 3 | R$ 1.200,00 | R$ 23,40 | R$ 1.176,60 |
| Maio | 2 | R$ 1.000,00 | R$ 23,40 | R$ 976,60 |

O gráfico chamado 2025 é uma simulação calculada como 88% da série atual. Não deve ser apresentado como histórico importado do ano anterior. A série mensal agrupa janeiro a maio pelo mês, sem separar anos diferentes.

## Recebimentos

`lotesRecebimentoV3` é independente de `vendasTotais`. Quando vazio, o motor gera 300 lotes fictícios para março, abril e maio de 2026, com transações e valores aleatórios. As regras demonstrativas usam 2,9% e D+30 para crédito, e 1,5% e D+1 para as demais modalidades; não representam condições comerciais reais.

O líquido de um lote é bruto menos taxa menos soma de encargos. Validar e reverter modificam o status em memória. Não há consulta de extrato bancário ou confirmação de liquidação por um banco.
