// script.js

let carrinho = [];
let total = 0;

// Selecionar o modal e o botão de fechar
const modal = document.getElementById("info-modal");
const closeModal = document.getElementsByClassName("close")[0];

// Selecionar o botão de fechar do carrinho
const closeCarrinho = document.getElementsByClassName("close-carrinho")[0];

// Função para adicionar itens ao carrinho
function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome: nome, preco: preco });
    total += preco;
    alert("Item " + nome + " adicionado ao carrinho com sucesso!")
    atualizarCarrinho();
}

// Função para atualizar o carrinho na interface
function atualizarCarrinho() {
    const listaCarrinho = document.getElementById('itens-carrinho');
    const totalCarrinho = document.getElementById('total-carrinho');
    listaCarrinho.innerHTML = '';
    
    carrinho.forEach(item => {
        const li = document.createElement('li');
        li.innerText = `${item.nome} - R$${item.preco.toFixed(2)}`;
        listaCarrinho.appendChild(li);
    });
    
    totalCarrinho.innerText = total.toFixed(2);
}

// Função para abrir e fechar o carrinho
function toggleCarrinho() {
    const carrinhoElement = document.getElementById('carrinho');
    carrinhoElement.classList.toggle('aberto');
}

// Função para fechar o carrinho ao clicar no "x"
closeCarrinho.onclick = function() {
    document.getElementById('carrinho').classList.remove('aberto');
}


// Função para abrir o modal com as informações passadas
function abrirModal(nome, ingredientes, preco, imagem) {
    document.getElementById("modal-nome").innerText = nome;
    document.getElementById("modal-ingredientes").innerText = `Ingredientes: ${ingredientes}`;
    document.getElementById("modal-preco").innerText = `Preço: R$${preco.toFixed(2)}`;
    document.getElementById("modal-img").src = imagem;
    modal.style.display = "block";
}


// Função para fechar o modal
closeModal.onclick = function() {
    modal.style.display = "none";

}

// Fecha o modal clicando fora dele
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}