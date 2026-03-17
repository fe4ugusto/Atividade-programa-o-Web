// criando vetor de vendas
let vendas = [];
let idAtual = 1;

// Função para atualizar a lista
function atualizarTabela() {
    const tabela = document.getElementById('tabelaVendas');

    // Limpa a lista
    tabela.innerHTML = '';

    // Se estiver vazio
    if (vendas.length === 0) {
        tabela.innerHTML = `<div class="vazio">Nenhuma venda cadastrada</div>`;
        return;
    }

    // Percorre o vetor
    for (let i = 0; i < vendas.length; i++) {
        const venda = vendas[i];

        const linha = document.createElement('div');
        linha.className = 'linha-venda';

        linha.innerHTML = `
            <div>${venda.id}</div>
            <div>${venda.vendedor}</div>
            <div>R$ ${venda.valor.toFixed(2)}</div>
            <div>R$ ${venda.desconto.toFixed(2)}</div>
            <div>R$ ${venda.total.toFixed(2)}</div>
            <div>${venda.data}</div>
            <div>
                <button onclick="removerVenda(${i})">Excluir</button>
            </div>
        `;

        tabela.appendChild(linha);
    }

    console.log('Vendas:', vendas);
}

// Função para adicionar venda
function adicionarVenda() {
    const vendedorInput = document.getElementById('vendedor');
    const valorInput = document.getElementById('valor');

    const vendedor = vendedorInput.value.trim();
    const valor = parseFloat(valorInput.value);

    // Validação se esta preenchido
    if (vendedor === '' || isNaN(valor)) {
        alert('Preencha todos os campos corretamente!');
        return;
    }

    // função para aplicar desconto
    let desconto = 0;
    if (valor > 100) {
        desconto = valor * 0.1;
    }

    const total = valor - desconto;

    // data
    
    const data = new Date().toLocaleString();

    // criacaoçao do objeto venda
    const venda = {
        id: idAtual++,
        vendedor: vendedor,
        valor: valor,
        desconto: desconto,
        total: total,
        data: data
    };

    // Adiciona no vetor
    vendas.push(venda);

    // Limpar input
    vendedorInput.value = '';
    valorInput.value = '';
    vendedorInput.focus();

    // Atualiza tebela
    atualizarTabela();
}

// Remover venda
function removerVenda(index) {
    if (vendas.length === 0) {
        alert('Não há vendas para remover!');
        return;
    }

    if (confirm('Deseja excluir esta venda?')) {
        const removida = vendas.splice(index, 1);
        atualizarTabela();
        alert(`Venda do vendedor ${removida[0].vendedor} removida!`);
    }
}

// Limpar tudo
function limparVendas() {
    if (vendas.length === 0) {
        alert('A lista já está vazia!');
        return;
    }

    if (confirm('Deseja apagar todas as vendas?')) {
        vendas = [];
        atualizarTabela();
    }
}

// Inicializa a lista
atualizarTabela();