let carrinho = [];
let total = 0;

function adicionarAoCarrinho(item, preco) {
    carrinho.push({ nome: item, preco: preco });
    total += preco;
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const lista = document.getElementById('lista-carrinho');
    lista.innerHTML = '';
    carrinho.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.nome} - R$ ${item.preco}`;
        const removerBtn = document.createElement('button');
        removerBtn.textContent = 'Remover';
        removerBtn.onclick = () => removerDoCarrinho(index);
        li.appendChild(removerBtn);
        lista.appendChild(li);
    });
    document.getElementById('total').textContent = total;
}

function removerDoCarrinho(index) {
    total -= carrinho[index].preco;
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function limparCarrinho() {
    carrinho = [];
    total = 0;
    atualizarCarrinho();
}

document.getElementById('form-pedido').addEventListener('submit', function(e) {
    e.preventDefault();
    if (carrinho.length === 0) {
        alert('Adicione itens ao carrinho antes de enviar o pedido!');
        return;
    }
    const nome = document.getElementById('nome').value;
    const endereco = document.getElementById('endereco').value;
    const telefone = document.getElementById('telefone').value;
    
    // Monta a mensagem no formato do WhatsApp
    let mensagem = `Pedido Sol Lanches\n`;
    mensagem += `Nome: ${nome}\n`;
    mensagem += `Endereço: ${endereco}\n`;
    mensagem += `Telefone: ${telefone}\n`;
    mensagem += `Itens:\n`;
    carrinho.forEach(item => {
        mensagem += `- ${item.nome} (R$ ${item.preco})\n`;
    });
    mensagem += `Total: R$ ${total}\n`;
    mensagem += `\nObrigado pela preferência! Se precisar de algo é só chamar.`;

    // Codifica a mensagem para URL
    const mensagemUrl = encodeURIComponent(mensagem);
    // Número da lanchonete
    const numero = '5513955405500';
    // Abre o WhatsApp com a mensagem pronta
    window.open(`https://wa.me/${numero}?text=${mensagemUrl}`, '_blank');

    // Limpa carrinho e formulário
    limparCarrinho();
    document.getElementById('form-pedido').reset();
});