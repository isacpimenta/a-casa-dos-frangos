// Supondo que o carrinho seja armazenado no localStorage
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Função para mostrar os itens do carrinho
function mostrarCarrinho() {
    const carrinhoItens = document.getElementById('carrinho-itens');
    carrinhoItens.innerHTML = ''; // Limpa a lista atual

    if (carrinho.length === 0) {
        carrinhoItens.innerHTML = '<li>Nenhum item no carrinho.</li>';
    } else {
        carrinho.forEach(item => {
            const li = document.createElement('li');
            li.innerText = `${item.nome} - R$${item.preco.toFixed(2)} (x${item.quantidade})`;
            carrinhoItens.appendChild(li);
        });
    }
}

// Função para finalizar a compra
function finalizarCompra() {
    const metodoPagamento = document.getElementById('metodo-pagamento').value;
    const opcaoEntrega = document.querySelector('input[name="opcao-entrega"]:checked');
    
    if (!opcaoEntrega) {
        document.getElementById('mensagem').innerText = 'Por favor, selecione uma opção de entrega.';
        return;
    }

    const mensagem = `Compra finalizada! Método de pagamento: ${metodoPagamento}. Opção de entrega: ${opcaoEntrega.value}.`;
    document.getElementById('mensagem').innerText = mensagem;

    // Aqui você pode adicionar a lógica para processar o pagamento ou salvar os dados no servidor.
    // Por exemplo, salvar as informações no localStorage ou enviar para um servidor.
}

// Exibir o carrinho ao carregar a página
mostrarCarrinho();