// FUNÇÕES DE VISIBILIDADE DO FORMULÁRIO
function mostrarCampos() {
    const tipo = document.getElementById("tipoProposta").value;
    const camposFinanceira = document.getElementById("camposFinanceira");
    const camposComuns = document.getElementById("camposComuns");
    if (camposFinanceira) camposFinanceira.style.display = (tipo === "financeira" || tipo === "ambos") ? "block" : "none";
    if (camposComuns) camposComuns.style.display = tipo ? "block" : "none";
}

function mostrarParcelamento(ativo) {
    // Esta função pode ser ajustada ou removida se não houver campos de parcelamento no HTML final
}

// FUNÇÕES DO MODAL
function fecharModal() {
    document.getElementById('modalConfirmacao').style.display = 'none';
}

// FUNÇÃO PRINCIPAL CHAMADA APÓS A CONFIRMAÇÃO
function confirmarGeracao() {
    fecharModal();

    const data = {
    instituicao: document.getElementById('instituicao-parceira').value,
    nome: document.getElementById('nome-parceiro').value,
    email: document.getElementById('email-parceiro').value,
    validade: document.getElementById('validade-proposta').value,
    duracao: document.getElementById('duracao-parceria').value,
    tipo: document.getElementById("tipoProposta").value,
    descricao: document.getElementById('descricao-proposta').value,
    objetivo: document.getElementById('objetivo-proposta').value
    };

    const hoje = new Date().toLocaleDateString('pt-BR');
    const query = new URLSearchParams(data).toString();

    const novaProposta = {
    data: hoje,
    instituicao: data.instituicao,
    nome: data.nome,
    email: data.email,
    tipo: data.tipo,
    status: "Pendente",
    query: query
    };

    // Salva no histórico do navegador
    const historico = JSON.parse(localStorage.getItem("propostasCEAP")) || [];
    historico.unshift(novaProposta);
    localStorage.setItem("propostasCEAP", JSON.stringify(historico));

    // Atualiza a tabela na tela
    atualizarHistorico();

    // Abre a nova página com a proposta
    window.open(`proposta2.html?${query}&autoPDF=1`, '_blank');

    // --- SIMULAÇÃO DE E-MAIL ---
    // Mostra o pop-up de sucesso
    const popup = document.getElementById('popup-sucesso');
    popup.classList.remove('hidden');

    // Esconde o pop-up depois de 3 segundos
    setTimeout(function() {
        popup.classList.add('hidden');
    }, 3000);

    // Limpa o formulário
    document.getElementById('propostaForm').reset();
}

// FUNÇÕES DO HISTÓRICO
function verProposta(query) {
    window.open(`proposta2.html?${query}&autoPDF=1`, '_blank');
}

function excluirProposta(index) {
    if (confirm("Tem certeza que deseja excluir esta proposta?")) {
        const historico = JSON.parse(localStorage.getItem("propostasCEAP")) || [];
        historico.splice(index, 1);
        localStorage.setItem("propostasCEAP", JSON.stringify(historico));
        atualizarHistorico();
    }
}

function atualizarHistorico() {
    const historico = JSON.parse(localStorage.getItem("propostasCEAP")) || [];
    const tbody = document.getElementById("tabelaHistorico");
    tbody.innerHTML = "";

    if (historico.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6">Nenhuma proposta cadastrada.</td></tr>';
    return;
    }

    historico.forEach((item, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${item.data}</td>
        <td>${item.instituicao}</td>
        <td>${item.email}</td>
        <td>${item.tipo}</td>
        <td>${item.status || 'Pendente'}</td>
        <td>
        <button onclick="verProposta('${item.query}')">Visualizar</button>
        <button onclick="excluirProposta(${index})" style="color:red">Excluir</button>
        </td>
    `;
    tbody.appendChild(tr);
    });
}

// --- Gatilhos e Eventos ---
// Este código só vai rodar depois que a página HTML carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    // Gatilho inicial para abrir o modal de confirmação
    const form = document.getElementById("propostaForm");
    if(form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            document.getElementById('modalConfirmacao').style.display = 'flex';
        });
    }

    // Carrega o histórico assim que a página é aberta
    atualizarHistorico();
});
