const diasSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

// --- TABELA DE HORÁRIOS ---
function adicionarLinha() {
  const tabela = document.getElementById('horariosTabela').querySelector('tbody');
  const diasAtuais = Array.from(tabela.querySelectorAll('tr td:first-child')).map(td => td.textContent.trim());
  const proximoDia = diasSemana.find(dia => !diasAtuais.includes(dia));
  if (!proximoDia) return alert('Todos os dias da semana já foram adicionados.');

  const novaLinha = document.createElement('tr');
  const tdDia = document.createElement('td');
  tdDia.textContent = proximoDia;
  tdDia.contentEditable = true;
  novaLinha.appendChild(tdDia);

  ['Categoria', 'Horário', 'Local'].forEach(() => {
    const td = document.createElement('td');
    td.contentEditable = true;
    novaLinha.appendChild(td);
  });

  const tdAcoes = document.createElement('td');
  const btnRemover = document.createElement('button');
  btnRemover.textContent = 'Remover';
  btnRemover.onclick = () => novaLinha.remove();
  tdAcoes.appendChild(btnRemover);
  novaLinha.appendChild(tdAcoes);

  tabela.appendChild(novaLinha);
}

function salvarHorarios() {
  const linhas = document.querySelectorAll('#horariosTabela tbody tr');
  const dados = Array.from(linhas).map(linha => {
    const celulas = linha.querySelectorAll('td');
    return {
      dia: celulas[0].textContent.trim(),
      categoria: celulas[1].textContent.trim(),
      horario: celulas[2].textContent.trim(),
      local: celulas[3].textContent.trim()
    };
  });
  localStorage.setItem('horarios', JSON.stringify(dados));
  alert('Horários salvos com sucesso!');
}

function carregarHorarios() {
  const dados = JSON.parse(localStorage.getItem('horarios')) || [];
  const tbody = document.querySelector('#horariosTabela tbody');
  tbody.innerHTML = '';
  dados.forEach(item => {
    const tr = document.createElement('tr');
    const tdDia = document.createElement('td');
    tdDia.textContent = item.dia;
    tdDia.contentEditable = true;
    tr.appendChild(tdDia);

    ['categoria', 'horario', 'local'].forEach(campo => {
      const td = document.createElement('td');
      td.textContent = item[campo];
      td.contentEditable = true;
      tr.appendChild(td);
    });

    const tdAcoes = document.createElement('td');
    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'Remover';
    btnRemover.onclick = () => tr.remove();
    tdAcoes.appendChild(btnRemover);
    tr.appendChild(tdAcoes);

    tbody.appendChild(tr);
  });
}

function limparTabela() {
  if (confirm('Tem certeza que deseja limpar a tabela de horários?')) {
    document.querySelector('#horariosTabela tbody').innerHTML = '';
    localStorage.removeItem('horarios');
  }
}

// --- TABELA DE PLANEAMENTO ---
function tornarPlaneamentoEditavel() {
  const tabela = document.querySelector('.planeamento-tabela');
  if (!tabela) return;

  const thead = tabela.querySelector('thead tr');
  if (!thead.querySelector('.acao')) {
    const th = document.createElement('th');
    th.classList.add('acao');
    th.textContent = 'Ações';
    thead.appendChild(th);
  }

  tabela.querySelectorAll('tbody tr').forEach(linha => {
    linha.querySelectorAll('td').forEach(td => td.contentEditable = true);

    if (!linha.querySelector('.acao')) {
      const tdAcao = document.createElement('td');
      tdAcao.classList.add('acao');
      const btn = document.createElement('button');
      btn.textContent = 'Remover';
      btn.onclick = () => linha.remove();
      tdAcao.appendChild(btn);
      linha.appendChild(tdAcao);
    }
  });
}

function adicionarLinhaPlaneamento() {
  const tbody = document.querySelector('.planeamento-tabela tbody');
  const novaLinha = document.createElement('tr');
  const colunas = document.querySelectorAll('.planeamento-tabela thead th').length;

  for (let i = 0; i < colunas - 1; i++) {
    const td = document.createElement('td');
    td.contentEditable = true;
    novaLinha.appendChild(td);
  }

  const tdAcao = document.createElement('td');
  tdAcao.classList.add('acao');
  const btn = document.createElement('button');
  btn.textContent = 'Remover';
  btn.onclick = () => novaLinha.remove();
  tdAcao.appendChild(btn);
  novaLinha.appendChild(tdAcao);

  tbody.appendChild(novaLinha);
}

function salvarPlaneamento() {
  const linhas = document.querySelectorAll('.planeamento-tabela tbody tr');
  const dados = Array.from(linhas).map(tr => {
    const celulas = tr.querySelectorAll('td');
    return Array.from(celulas).slice(0, -1).map(td => td.textContent.trim());
  });
  localStorage.setItem('planeamento', JSON.stringify(dados));
  alert('Planeamento salvo com sucesso!');
}

function carregarPlaneamento() {
  const dados = JSON.parse(localStorage.getItem('planeamento')) || [];
  const tbody = document.querySelector('.planeamento-tabela tbody');
  tbody.innerHTML = '';

  dados.forEach(linhaDados => {
    const tr = document.createElement('tr');
    linhaDados.forEach(texto => {
      const td = document.createElement('td');
      td.textContent = texto;
      td.contentEditable = true;
      tr.appendChild(td);
    });

    const tdAcao = document.createElement('td');
    tdAcao.classList.add('acao');
    const btn = document.createElement('button');
    btn.textContent = 'Remover';
    btn.onclick = () => tr.remove();
    tdAcao.appendChild(btn);
    tr.appendChild(tdAcao);

    tbody.appendChild(tr);
  });

  tornarPlaneamentoEditavel();
}

function limparPlaneamento() {
  if (confirm('Deseja apagar todos os dados do planeamento?')) {
    document.querySelector('.planeamento-tabela tbody').innerHTML = '';
    localStorage.removeItem('planeamento');
  }
}

// --- LOGIN E REGISTRO ---
function mostrarLogin() {
  document.getElementById('registroTela').style.display = 'none';
  document.getElementById('loginTela').style.display = 'block';
  document.getElementById('tabelaTela').style.display = 'none';
}

function mostrarRegistro() {
  document.getElementById('registroTela').style.display = 'block';
  document.getElementById('loginTela').style.display = 'none';
  document.getElementById('tabelaTela').style.display = 'none';
}

function registrar() {
  const usuario = document.getElementById('novoUsuario').value.trim();
  const senha = document.getElementById('novaSenha').value.trim();
  const msg = document.getElementById('msgRegistro');
  if (!usuario || !senha) {
    msg.textContent = 'Preencha todos os campos.';
    msg.style.color = 'yellow';
    return;
  }

  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  if (usuarios.some(u => u.usuario === usuario)) {
    msg.textContent = 'Usuário já existe.';
    msg.style.color = 'orange';
    return;
  }

  usuarios.push({ usuario, senha });
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  msg.textContent = 'Registrado com sucesso!';
  msg.style.color = 'lightgreen';
  document.getElementById('novoUsuario').value = '';
  document.getElementById('novaSenha').value = '';
}

function login() {
  const usuario = document.getElementById('loginUsuario').value.trim();
  const senha = document.getElementById('loginSenha').value.trim();
  const msg = document.getElementById('msgLogin');

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const user = usuarios.find(u => u.usuario === usuario && u.senha === senha);

  if (user) {
    document.getElementById('loginTela').style.display = 'none';
    document.getElementById('registroTela').style.display = 'none';
    document.getElementById('tabelaTela').style.display = 'block';
    carregarHorarios();
    carregarPlaneamento();
    tornarPlaneamentoEditavel();
  } else {
    msg.textContent = 'Usuário ou senha inválidos.';
    msg.style.color = 'red';
  }
}

function logout() {
  document.getElementById('tabelaTela').style.display = 'none';
  document.getElementById('loginTela').style.display = 'block';
}

// --- MODO ESCURO ---
function alternarModo() {
  const body = document.body;
  const botao = document.getElementById('modoToggle');
  body.classList.toggle('modo-escuro');

  if (body.classList.contains('modo-escuro')) {
    botao.textContent = '☀️ Ativar Modo Claro';
    localStorage.setItem('tema', 'escuro');
  } else {
    botao.textContent = '🌙 Ativar Modo Escuro';
    localStorage.setItem('tema', 'claro');
  }
}

// --- ONLOAD PRINCIPAL ---
window.onload = function () {
  mostrarLogin();
  const temaSalvo = localStorage.getItem('tema');
  if (temaSalvo === 'escuro') {
    document.body.classList.add('modo-escuro');
    const botao = document.getElementById('modoToggle');
    if (botao) botao.textContent = '☀️ Ativar Modo Claro';
  }
};
