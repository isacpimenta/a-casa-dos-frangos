// script.js
let carrinho = [];
let total = 0;
const modal = document.getElementById("info-modal");
const closeModal = document.getElementsByClassName("close")[0];
const closeCarrinho = document.getElementsByClassName("close-carrinho")[0];
const finalizarCompraBtn = document.getElementById('finalizar-compra');

function adicionarAoCarrinho(nome, preco, imagem) {
    // Verifica se o usuário está logado
    if (!localStorage.getItem('loggedInUser')) {
        alert('Você precisa estar logado para adicionar itens ao carrinho.');
        window.location.href = "../login/index.html"; // Redireciona para a página de login
        return;
    }

    const itemExistente = carrinho.find(item => item.nome === nome);
    
    if (itemExistente) {
        itemExistente.quantidade += 1; // Incrementa a quantidade
        total += preco; // Atualiza o total
    } else {
        carrinho.push({ nome, preco, imagem, quantidade: 1 });
        total += preco; // Atualiza o total
    }
    
    alert("Item " + nome + " adicionado ao carrinho com sucesso!");
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const listaCarrinho = document.getElementById('itens-carrinho');
    const totalCarrinho = document.getElementById('total-carrinho');
    const finalizarCompraBtn = document.getElementById('finalizar-compra');
    
    listaCarrinho.innerHTML = ''; // Limpa a lista de itens do carrinho

    carrinho.forEach(item => {
        const li = document.createElement('li');
        li.innerText = `${item.nome} - R$${item.preco.toFixed(2)} ${item.quantidade > 1 ? `(${item.quantidade}x)` : ''}`;
        
        const img = document.createElement('img');
        img.src = item.imagem;
        img.alt = `Imagem de ${item.nome}`;
        img.style.width = '50px'; 
        img.style.height = '50px'; 
        img.style.marginRight = '10px'; 

        li.prepend(img); // Adiciona a imagem antes do texto
        listaCarrinho.appendChild(li);
    });

    totalCarrinho.innerText = total.toFixed(2);
    finalizarCompraBtn.style.display = carrinho.length > 0 ? 'block' : 'none';
}


// Função para atualizar o carrinho na interface


function toggleCarrinho() {
    const carrinhoElement = document.getElementById('carrinho');
    carrinhoElement.classList.toggle('aberto');
}

closeCarrinho.onclick = function() {
    document.getElementById('carrinho').classList.remove('aberto');
}

function abrirModal(nome, ingredientes, preco, imagem) {
    document.getElementById("modal-nome").innerText = nome;
    document.getElementById("modal-ingredientes").innerText = `Ingredientes: ${ingredientes}`;
    document.getElementById("modal-preco").innerText = `Preço: R$${preco.toFixed(2)}`;
    document.getElementById("modal-img").src = imagem;
    modal.style.display = "block";
}

closeModal.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Área de Filtros 
document.addEventListener('DOMContentLoaded', function() {
    const filtrosPreco = document.querySelectorAll('.filtro-preco');
    const filtrosTipo = document.querySelectorAll('.filtro-tipo');
    const itens = document.querySelectorAll('.item');

    // Função para aplicar os filtros
    function aplicarFiltros() {
        itens.forEach(item => {
            item.style.display = 'none'; // Esconde todos os itens

            const preco = parseFloat(item.querySelector('p').innerText.replace('R$', '').replace(',', '.'));
            const tipoPrato = item.getAttribute('data-tipo');

            const precoValido = [...filtrosPreco].some(filtro => {
                return filtro.classList.contains('ativo') && (
                    (filtro.value === 'baixo' && preco <= 35) ||
                    (filtro.value === 'medio' && preco > 35 && preco <= 50) ||
                    (filtro.value === 'alto' && preco > 50)
                );
            }) || ![...filtrosPreco].some(filtro => filtro.classList.contains('ativo')); // Todos válidos se nenhum filtro ativo

            const tipoValido = [...filtrosTipo].some(filtro => {
                return filtro.classList.contains('ativo') && (tipoPrato === filtro.value || filtro.value === 'todos');
            }) || ![...filtrosTipo].some(filtro => filtro.classList.contains('ativo')); // Todos válidos se nenhum filtro ativo

            if (precoValido && tipoValido) {
                item.style.display = 'flex'; // Exibe o item se passar nos filtros
            }
        });
    }

    filtrosPreco.forEach(filtro => {
        filtro.addEventListener('click', () => {
            filtrosPreco.forEach(f => f.classList.remove('ativo')); // Remove classe ativo de todos
            filtro.classList.add('ativo'); // Adiciona ao filtro selecionado
            aplicarFiltros(); // Aplica os filtros
        });
    });

    filtrosTipo.forEach(filtro => {
        filtro.addEventListener('click', () => {
            filtrosTipo.forEach(f => f.classList.remove('ativo')); // Remove classe ativo de todos
            filtro.classList.add('ativo'); // Adiciona ao filtro selecionado
            aplicarFiltros(); // Aplica os filtros
        });
    });

    // Ativar o filtro "TUDO" por padrão
    const filtroTodos = document.querySelector('.filtro-tipo[value="todos"]');
    filtroTodos.click(); // Simula um clique para mostrar todos os itens
});

finalizarCompraBtn.onclick = function() {
    // Verifica se o usuário está logado
    if (!localStorage.getItem('loggedInUser')) {
        alert('Você precisa estar logado para finalizar a compra.');
        window.location.href = "login.html"; // Redireciona para a página de login
        return;
    }

    // Aqui você pode salvar os dados do carrinho, se necessário, ou preparar para o pagamento
    // Exemplo: localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Redireciona para a página de pagamento
    window.location.href = "../pay/index.html";
};
