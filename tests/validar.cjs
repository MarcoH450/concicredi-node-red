// Executa funções isoladas do export, sem servidor e sem chamadas à Groq.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const flows = JSON.parse(fs.readFileSync(path.join(root, 'flows/concicred.json'), 'utf8'));
const ids = new Set(flows.map(n => n.id));
assert.equal(ids.size, flows.length);
for (const n of flows) {
  if (n.z) assert(ids.has(n.z), `Aba ausente: ${n.z}`);
  for (const wire of (n.wires || []).flat()) assert(ids.has(wire), `Ligação ausente: ${wire}`);
  if (n.type === 'function') new vm.Script(`(function(msg){${n.func}\n})`);
}
assert(!/gsk_[A-Za-z0-9]{10,}/.test(JSON.stringify(flows)), 'Chave literal encontrada');
assert(!flows.some(n => n.type === 'groq-config'));
const memory = new Map();
function run(name, msg, env = {}) {
  const node = flows.find(n => n.type === 'function' && n.name === name);
  assert(node, name);
  const context = {
    msg, Buffer, console,
    global: { get: k => memory.get(k), set: (k, v) => memory.set(k, v) },
    env: { get: k => env[k] }
  };
  return vm.runInNewContext(`(function(msg){${node.func}\n})(msg)`, context, { timeout: 3000 });
}
function near(a, b) { assert(Math.abs(a - b) < 0.000001, `${a} != ${b}`); }
const csv = fs.readFileSync(path.join(root, 'examples/vendas-demo.csv'));
run('Motor ETL', { req: { method: 'POST', files: [{ buffer: csv }] } });
const sales = memory.get('vendasTotais');
assert.equal(sales.length, 6);
assert.equal(sales[0].dataIso, '2026-01-05');
near(sales.reduce((s, v) => s + v.vBrutoRaw, 0), 3000);
near(sales.reduce((s, v) => s + v.vTaxaRaw, 0), 68.6);
near(sales.reduce((s, v) => s + v.vLiquidoRaw, 0), 2931.4);
run('Motor ETL', { req: { method: 'GET' } });
assert.equal(memory.get('vendasTotais'), sales);
const view = run('Processador de vendas', { req: { method: 'POST', body: { loja: 'Matriz' } } });
assert.equal(view.payload.vendas.length, 3);
assert.equal(view.payload.subtotalBruto, 'R$ 1.800,00');
const dash = run('Cerebro do dashboard', { req: { method: 'GET' } });
assert.equal(dash.payload.totalBruto, '3.000,00');
assert.equal(dash.payload.totalLiquido, '2.931,40');
run('Motor de Auditoria', { req: { method: 'GET' } });
const lots = memory.get('lotesRecebimentoV3');
assert.equal(lots.length, 300);
const id = lots[0].id;
run('Motor de Auditoria', { req: { body: { action: 'validar', loteIds: String(id) } } });
assert.equal(lots[0].status, 'Validado');
run('Motor de Auditoria', { req: { body: { action: 'reverter', loteIds: String(id) } } });
assert.equal(lots[0].status, 'Pendente');
const feeView = run('Motor de Auditoria', { req: { body: { action: 'add_encargo', loteIds: String(id), valorEncargo: '10,00', nomeEncargo: 'Teste fictício' } } });
const feeLot = JSON.parse(feeView.payload.lotesJson).find(l => l.id === id);
near(feeLot.vEncargoRaw, 10);
near(feeLot.vLiquidoCalc, lots[0].vBrutoRaw - lots[0].vTaxaRaw - 10);
run('Motor de Auditoria', { req: { body: { action: 'remove_encargo', loteId: String(id), idEncargo: String(lots[0].encargos[0].id) } } });
assert.equal(lots[0].encargos.length, 0);
const noKey = run('function 1', { req: { query: {} } });
assert.equal(noKey[0], null);
assert.equal(noKey[1].payload.status, 'Aviso');
assert.equal(run('function 2', noKey[1]).payload.status, 'Aviso');
const ai = flows.find(n => n.name === 'function 1');
assert.equal(ai.outputs, 2);
assert.equal(ai.wires[1][0], flows.find(n => n.name === 'function 2').id);
const request = run('function 1', { req: { query: { pergunta: 'Qual é o faturamento?' } } }, { GROQ_API_KEY: 'fake-test-value' })[0];
assert.equal(request.headers.Authorization, 'Bearer fake-test-value');
assert.equal(request.payload.messages.length, 2);
assert.equal(request.payload.messages[1].content, 'Qual é o faturamento?');
memory.set('vendasTotais', []);
const empty = run('function 1', { req: { query: {} } }, { GROQ_API_KEY: 'fake-test-value' });
assert.equal(empty[0], null);
assert.equal(empty[1].payload.status, 'Aviso');
const response = run('function 2', { payload: { choices: [{ message: { content: 'Resposta simulada' } }] } });
assert.equal(response.payload.status, 'Sucesso');
assert.equal(response.payload.insights, 'Resposta simulada');
assert.equal(run('Validar Usuario', { payload: { email: 'administrador@teste.com', password: '123456' } }).headers.Location, '/menu');
assert.equal(run('Validar Usuario', { payload: { email: 'administrador@teste.com', password: 'incorreta' } }).headers.Location, '/login?error=true');
const originalCsv = fs.readFileSync(path.join(root, 'examples/vendas-750-origem.csv'));
run('Motor ETL', { req: { method: 'POST', files: [{ buffer: originalCsv }] } });
assert.equal(memory.get('vendasTotais').length, 0, 'Exportação com vírgulas não é compatível diretamente');
const normalizedCsv = fs.readFileSync(path.join(root, 'examples/vendas-750.csv'));
run('Motor ETL', { req: { method: 'POST', files: [{ buffer: normalizedCsv }] } });
const full = memory.get('vendasTotais');
assert.equal(full.length, 750);
near(full.reduce((s, v) => s + v.vBrutoRaw, 0), 358328.95);
near(full.reduce((s, v) => s + v.vTaxaRaw, 0), 6049.81);
near(full.reduce((s, v) => s + v.vLiquidoRaw, 0), 343465.19);
assert.equal(full.filter(v => Math.abs(v.vBrutoRaw - v.vTaxaRaw - v.vLiquidoRaw) > 0.01).length, 750);
const fullDash = run('Cerebro do dashboard', { req: { method: 'GET' } });
assert.equal(fullDash.payload.totalBruto, '358.328,95');
assert.equal(fullDash.payload.totalLiquido, '343.465,19');
const filialMaio = full.filter(v => v.loja === 'Filial 1' && v.dataIso.startsWith('2026-05'));
assert.equal(filialMaio.length, 60);
near(filialMaio.reduce((s, v) => s + v.vLiquidoRaw, 0), 23288.71);
console.log(`OK: ${flows.length} nós, sintaxe, ligações, ETL, filtros, dashboard, lotes, encargos, avisos IA e login.`);
console.log('OK: base de 750 vendas normalizada, totais e divergências preservadas; incompatibilidade do CSV original confirmada.');
console.log('Sem chamadas externas. Teste de funções isoladas; não equivale a teste completo da interface.');
