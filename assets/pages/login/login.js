// Verificar se o usuário está logado
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('loggedInUser')) {
        alert('Você já está logado!');
        window.location.href = "index.html"; // Redireciona para a página principal se o usuário já estiver logado
    }
});

// Função de Registro
function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const message = document.getElementById('register-message');

    if (!username || !password) {
        message.textContent = "Todos os campos são obrigatórios.";
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Verifica se o usuário já existe
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        message.textContent = "Nome de usuário já existe.";
        return;
    }

    // Adicionar o novo usuário
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    message.textContent = "Registro bem-sucedido! Faça o login.";
}

// Função de Login
function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const message = document.getElementById('login-message');

    if (!username || !password) {
        message.textContent = "Todos os campos são obrigatórios.";
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Verificar se o usuário existe e a senha está correta
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        localStorage.setItem('loggedInUser', username); // Salvar o usuário logado
        message.textContent = "Login bem-sucedido!";
        window.location.href = "../cardapio/index.html"; // Redirecionar para a página principal após o login
    } else {
        message.textContent = "Nome de usuário ou senha incorretos.";
    }
}

// Função de Logout (pode ser usada em qualquer página após o login)
function logout() {
    localStorage.removeItem('loggedInUser');
    alert('Você foi desconectado.');
    window.location.href = "login.html"; // Redireciona para a página de login
}


function toggleRegister() {
    document.querySelector('.form-container').style.display = 'none'; // Oculta o formulário de login
    document.getElementById('register-container').style.display = 'block'; // Mostra o formulário de registro
}

function toggleLogin() {
    document.querySelector('.form-container').style.display = 'block'; // Mostra o formulário de login
    document.getElementById('register-container').style.display = 'none'; // Oculta o formulário de registro
}