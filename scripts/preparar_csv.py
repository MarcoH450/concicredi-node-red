"""Converte a exportação fornecida para o contrato posicional do ETL.

Não recalcula taxas/líquidos. Não substitui o arquivo original.
Uso: python3 scripts/preparar_csv.py entrada.csv saida.csv
"""
import csv
import sys
from pathlib import Path
from decimal import Decimal, InvalidOperation
from datetime import datetime

HEADER = ['DATA', 'LOJA', 'BANDEIRA', 'MODALIDADE', 'MODULO', 'VALOR_BRUTO',
          'TAXA_PERCENTUAL', 'VALOR_TAXA', 'DATA_PREVISTA', 'VALOR_LIQUIDO']

def decimal_br(value):
    value = value.replace('R$', '').replace('%', '').replace('\u00a0', '').strip()
    result = Decimal(value.replace('.', '').replace(',', '.'))
    if not result.is_finite():
        raise ValueError('Valor não finito')
    return result

def convert(source, destination):
    if source.resolve() == destination.resolve() or destination.exists():
        raise ValueError('Escolha um destino novo; nenhum arquivo será sobrescrito.')
    content = source.read_text(encoding='utf-8-sig')
    first_line = content.splitlines()[0]
    delimiter = ';' if first_line.count(';') >= 9 else ','
    rows = list(csv.reader(content.splitlines(), delimiter=delimiter))
    normalized = []
    differences = 0
    for line, row in enumerate(rows[1:], 2):
        if not row or all(not c.strip() for c in row):
            continue
        if len(row) != 10:
            raise ValueError(f'Linha {line}: esperadas 10 colunas, recebidas {len(row)}.')
        row = [v.strip() for v in row]
        for i in (0, 8):
            row[i] = datetime.strptime(row[i], '%d/%m/%Y').strftime('%d/%m/%Y')
        numbers = {i: decimal_br(row[i]) for i in (5, 6, 7, 9)}
        if abs(numbers[5] - numbers[7] - numbers[9]) > Decimal('0.01'):
            differences += 1
        for i, number in numbers.items():
            row[i] = format(number, 'f').replace('.', ',') + ('%' if i == 6 else '')
        if any(';' in c or '\n' in c or '\r' in c or '"' in c for c in row):
            raise ValueError(f'Linha {line}: caractere incompatível com o parser simplificado do ETL.')
        normalized.append(row)
    if not normalized:
        raise ValueError('Nenhuma venda encontrada; conversão cancelada.')
    destination.parent.mkdir(parents=True, exist_ok=True)
    with destination.open('x', encoding='utf-8', newline='') as handle:
        writer = csv.writer(handle, delimiter=';', lineterminator='\n')
        writer.writerow(HEADER)
        writer.writerows(normalized)
    print(f'Conversão concluída: {len(normalized)} vendas. Valores preservados.')
    print(f'Linhas em que bruto - tarifa difere de líquido por mais de R$ 0,01: {differences}.')
    print('A diferença não é corrigida: pode exigir regras ou campos que não constam no CSV.')

if __name__ == '__main__':
    if len(sys.argv) != 3:
        raise SystemExit(__doc__)
    try:
        convert(Path(sys.argv[1]), Path(sys.argv[2]))
    except (ValueError, InvalidOperation, OSError, IndexError) as error:
        raise SystemExit(str(error))
