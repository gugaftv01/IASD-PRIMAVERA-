/**
 * Planilha de pedidos de estudo bíblico — "Ouvindo a Voz de Deus"
 * IASD Primavera
 *
 * Cole este código em Extensões > Apps Script da sua Planilha Google.
 * Passo a passo completo no arquivo GOOGLE-PLANILHA.md.
 */

// TROQUE esta senha. É a senha que você vai digitar na "Área do administrador" do site.
const SENHA = 'troque-esta-senha';

const ABAS = { dar: 'Querem dar estudo', receber: 'Querem receber estudo' };
const CABECALHO = ['Data', 'Nome', 'WhatsApp', 'Dias', 'Horários', 'Contatado', 'ID'];

function aba_(tipo) {
  const nome = ABAS[tipo];
  if (!nome) throw new Error('tipo inválido');
  const planilha = SpreadsheetApp.getActiveSpreadsheet();
  let aba = planilha.getSheetByName(nome);
  if (!aba) {
    aba = planilha.insertSheet(nome);
    aba.appendRow(CABECALHO);
    aba.setFrozenRows(1);
    aba.getRange(1, 1, 1, CABECALHO.length).setFontWeight('bold');
  }
  return aba;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Limpa o texto e impede que vire fórmula na planilha
function texto_(valor, max) {
  const t = String(valor == null ? '' : valor).trim().slice(0, max);
  return /^[=+\-@]/.test(t) ? "'" + t : t;
}

// Recebe os formulários do site e as marcações de "Já contatado"
function doPost(e) {
  const trava = LockService.getScriptLock();
  trava.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);

    if (d.acao === 'status') {
      if (d.senha !== SENHA) return json_({ ok: false, erro: 'senha' });
      const aba = aba_(d.tipo);
      const linhas = Math.max(aba.getLastRow() - 1, 1);
      const ids = aba.getRange(2, 7, linhas, 1).getValues();
      for (let i = 0; i < ids.length; i++) {
        if (ids[i][0] === d.id) {
          aba.getRange(i + 2, 6).setValue(d.contatado ? 'Sim' : 'Não');
          return json_({ ok: true });
        }
      }
      return json_({ ok: false, erro: 'nao encontrado' });
    }

    const nome = texto_(d.nome, 100);
    const telefone = texto_(d.telefone, 30);
    if (nome.length < 2 || telefone.replace(/\D/g, '').length < 10) return json_({ ok: false, erro: 'dados' });
    const dias = texto_((d.dias || []).join(', '), 200);
    const horarios = texto_((d.horarios || []).join(', '), 200);

    aba_(d.tipo).appendRow([new Date(), nome, telefone, dias, horarios, 'Não', Utilities.getUuid()]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, erro: String(err) });
  } finally {
    trava.releaseLock();
  }
}

// Entrega a lista para a Área do administrador (só com a senha certa)
function doGet(e) {
  if ((e.parameter.senha || '') !== SENHA) return json_({ ok: false, erro: 'senha' });
  const dados = {};
  Object.keys(ABAS).forEach(function (tipo) {
    dados[tipo] = aba_(tipo).getDataRange().getValues().slice(1)
      .filter(function (r) { return r[6]; })
      .map(function (r) {
        return {
          data: r[0] instanceof Date ? r[0].toISOString() : String(r[0]),
          nome: String(r[1]),
          telefone: String(r[2]),
          dias: String(r[3]),
          horarios: String(r[4]),
          contatado: r[5] === 'Sim',
          id: String(r[6])
        };
      });
  });
  return json_({ ok: true, dados: dados });
}
