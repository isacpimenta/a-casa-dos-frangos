// Supondo que o carrinho seja armazenado no localStorage
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Função para mostrar os itens do carrinho
function mostrarCarrinho() {
    console.log("Carregando itens do carrinho...");
    const carrinhoItens = document.getElementById('carrinho-itens');
    carrinhoItens.innerHTML = ''; // Limpa a lista atual

    let total = 0; // Inicializa total

    carrinho.forEach(item => {
        total += item.preco * item.quantidade; // Calcula o total
        const li = document.createElement('li');
        li.innerText = `${item.nome} - R$${item.preco.toFixed(2)} (x${item.quantidade})`;
        carrinhoItens.appendChild(li);
    });

    // Atualiza o total no localStorage e na página
    localStorage.setItem('totalAPagar', JSON.stringify(total));
    document.getElementById('total-a-pagar').innerText = `Total a Pagar: R$${total.toFixed(2)}`;

    if (carrinho.length === 0) {
        carrinhoItens.innerHTML = '<li>Nenhum item no carrinho.</li>';
    }
}

// Função para verificar se todos os campos estão preenchidos
function verificarCampos() {
    const metodoPagamento = document.getElementById('metodo-pagamento').value;
    const opcaoEntrega = document.querySelector('.option button.active')?.id;
    const numero = document.getElementById('numero').value;
    const cep = document.getElementById('cep').value;

    const finalizarButton = document.querySelector('#finalizar-button');
    
    if (metodoPagamento && opcaoEntrega && numero && cep) {
        finalizarButton.style.display = 'block'; // Exibe o botão se todas as condições forem atendidas
    } else {
        finalizarButton.style.display = 'none'; // Esconde o botão se não atender as condições
    }
}

// Função para selecionar a opção de entrega
function selecionarEntrega(opcao) {
    const enderecoDiv = document.getElementById('endereco-div');
    if (opcao === 'entrega') {
        enderecoDiv.style.display = 'block';
        document.getElementById('endereco').required = true;
    } else {
        enderecoDiv.style.display = 'none';
        document.getElementById('endereco').required = false;
    }
    
    verificarCampos(); // Chama a função para verificar se todos os campos estão preenchidos
}

// Função para finalizar a compra
function finalizarCompra() {
    const metodoPagamento = document.getElementById('metodo-pagamento').value;
    const opcaoEntrega = document.querySelector('.option button.active')?.id === 'btn-entrega' ? 'entrega' : 'retirar';
    
    if (!opcaoEntrega) {
        document.getElementById('mensagem').innerText = 'Por favor, selecione uma opção de entrega.';
        return;
    }

    const numero = document.getElementById('numero').value;
    const pontoReferencia = document.getElementById('ponto-referencia').value;
    const mensagem = `Compra finalizada! Método de pagamento: ${metodoPagamento}. Opção de entrega: ${opcaoEntrega}. Número: ${numero}. Ponto de Referência: ${pontoReferencia}.`;
    document.getElementById('mensagem').innerText = mensagem;

    // Aqui você pode adicionar a lógica para processar o pagamento ou salvar os dados no servidor.


}

// Função para buscar endereço pelo CEP
function buscarEndereco() {
    const cep = document.getElementById('cep').value;
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => response.json())
    .then(data => {
        if(data.erro) {
            alert('CEP não encontrado!');
            return;
        }
        const endereco = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
        document.getElementById('endereco-confirmacao').innerText = endereco;
        abrirModalEndereco();
    })
    .catch(error => {
        alert('Erro ao buscar o endereço.');
        console.error('Erro ao buscar o endereço:', error);
    });
}

// Função para abrir o modal de confirmação de endereço
function abrirModalEndereco() {
    const modal = document.getElementById('modal-confirmacao');
    modal.style.display = "block";
}

// Função para confirmar o endereço
function confirmarEndereco() {
    const modal = document.getElementById('modal-confirmacao');
    modal.style.display = "none";
    alert('Endereço confirmado e entrega programada!');

    // Exibir o modal de compra finalizada
    document.getElementById('modal-finalizado').style.display = 'flex';

    // Esconder o formulário de compra
    document.querySelector('.form-container').style.display = 'none';
}

// Fechar modal ao clicar no botão 'X'
document.getElementsByClassName('close')[0].onclick = function() {
    document.getElementById('modal-confirmacao').style.display = "none";
}

// Fechar modal ao clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById('modal-confirmacao');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Fechar modal de compra finalizada ao clicar no botão 'X'
document.getElementsByClassName('close-finalizado')[0].onclick = function() {
    document.getElementById('modal-finalizado').style.display = "none";
}

// Fechar modal ao clicar fora dele
window.onclick = function(event) {
    const modalFinalizado = document.getElementById('modal-finalizado');
    if (event.target == modalFinalizado) {
        modalFinalizado.style.display = "none";
    }
}

// Chame a função para mostrar o carrinho ao carregar a página
mostrarCarrinho();
