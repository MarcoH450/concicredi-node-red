# Revisão da massa de 750 vendas

O autor forneceu `Teste_importacao.csv - Página1.csv` e confirmou que os registros são fictícios. O arquivo foi incluído como evidência de teste, acompanhado de uma cópia compatível com o motor.

## Compatibilidade

| Característica | Exportação recebida | Formato esperado pelo ETL |
| --- | --- | --- |
| Separador | Vírgula, com campos monetários entre aspas | Ponto e vírgula |
| Valores | Prefixo `R$`, separador de milhar e vírgula decimal | Números brasileiros sem `R$` |
| Cabeçalho | Alguns nomes contêm barra invertida antes de `_` | Nomes informativos; primeira linha é descartada |
| Colunas | Dez, na ordem correta | Dez, por posição |

O export recebido possui os campos corretos, mas o parser original divide as linhas por `;`. Importá-lo diretamente não produz as 750 vendas: o motor ignora as linhas e substitui a base por uma lista vazia. Por isso, para a demonstração, use **`examples/vendas-750.csv`**.

`examples/vendas-750-origem.csv` preserva a exportação original para comparação. Não o selecione na tela de importação do protótipo.

## Conversão reproduzível

O script apenas normaliza a representação de datas, separadores e números. Não recalcula taxas nem líquidos e não sobrescreve arquivos existentes.

```bash
python3 scripts/preparar_csv.py examples/vendas-750-origem.csv /tmp/vendas-750-convertidas.csv
```

Se esse destino já existir, escolha outro nome. Compare o resultado com `examples/vendas-750.csv`.

## Conteúdo conferido

- 750 registros e dez colunas por registro.
- Datas de venda entre 01/01/2026 e 30/05/2026; todas as datas de venda/previsão puderam ser interpretadas.
- 396 vendas da Matriz e 354 da Filial 1.
- Janeiro: 149 vendas; fevereiro: 151; março, abril e maio: 150 cada.
- Nenhuma duplicata exata de linha identificada. O arquivo não tem identificador único de transação para uma verificação de duplicidade de negócio.
- A confirmação de dados fictícios veio do autor; não decorre apenas da ausência de nomes ou documentos no arquivo.

| Recorte | Vendas | Bruto | Tarifa informada | Líquido informado |
| --- | --- | --- | --- | --- |
| Matriz | 396 | R$ 185.870,66 | R$ 2.955,06 | R$ 179.845,54 |
| Filial 1 | 354 | R$ 172.458,29 | R$ 3.094,75 | R$ 163.619,65 |
| Total | 750 | R$ 358.328,95 | R$ 6.049,81 | R$ 343.465,19 |
| Filial 1 em maio | 60 | R$ 24.798,71 | R$ 390,00 | R$ 23.288,71 |

## Qualidade financeira

Nas 750 linhas, `bruto - tarifa` difere do líquido informado por mais de R$ 0,01. Em todas elas, a aplicação do percentual informado ao bruto também difere da tarifa por mais de R$ 0,01. Isso pode refletir a geração fictícia ou componentes não descritos no arquivo; não é possível deduzir uma regra financeira confiável apenas desses campos.

No total, bruto menos tarifas resulta em **R$ 352.279,14**, enquanto a coluna de líquidos soma **R$ 343.465,19**: diferença de **R$ 8.813,95**. O ETL preserva os valores importados. A conversão não corrige essa diferença.

O prompt da IA fixa o líquido da Filial 1 em maio como R$ 23.689,58. O novo arquivo soma R$ 23.288,71 nesse recorte, uma diferença de R$ 400,87. Mesmo quando bruto e quantidade coincidem, a resposta da IA pode contradizer o CSV devido à referência fixa. Esta inconsistência foi documentada, não mascarada por alterações nos dados.

## Uso recomendado

Use o exemplo pequeno para demonstrar conferência aritmética e a base de 750 linhas para demonstrar volume, filtros e aprendizado sobre qualidade de dados. As duas massas são fictícias. Nenhuma delas transforma os lotes aleatórios de recebimentos em conciliação bancária real.
