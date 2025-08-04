// Sistema de Login - MedControl Personal

// Dados de usuários (simulando um banco de dados)
let users = JSON.parse(localStorage.getItem('healthSystemUsers')) || [
    {
        id: 1,
        username: 'admin',
        password: 'admin123',
        fullName: 'Administrador',
        email: 'admin@saude.com',
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        username: 'demo',
        password: 'demo123',
        fullName: 'Usuário Demonstração',
        email: 'demo@saude.com',
        createdAt: new Date().toISOString()
    }
];

// Usuário atual logado
let currentUser = null;

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se já está logado
    const savedUser = localStorage.getItem('currentHealthUser') || sessionStorage.getItem('currentHealthUser');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            redirectToSystem();
            return;
        } catch (error) {
            localStorage.removeItem('currentHealthUser');
            sessionStorage.removeItem('currentHealthUser');
        }
    }
    
    // Configurar formulário de login
    setupLoginForm();
});

// Configurar formulário de login
function setupLoginForm() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

// Processar login
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
        showAlert('Por favor, preencha todos os campos.', 'error');
        return;
    }
    
    // Verificar credenciais
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        currentUser = user;
        
        // Salvar sessão
        const userData = JSON.stringify(user);
        localStorage.setItem('currentHealthUser', userData);
        
        showAlert('Login realizado com sucesso!', 'success');
        
        // Redirecionar após um breve delay
        setTimeout(() => {
            redirectToSystem();
        }, 1000);
    } else {
        showAlert('Usuário ou senha incorretos.', 'error');
    }
}

// Login como demonstração
function loginAsDemo() {
    const demoUser = users.find(u => u.username === 'demo');
    if (demoUser) {
        currentUser = demoUser;
        localStorage.setItem('currentHealthUser', JSON.stringify(demoUser));
        showAlert('Entrando na demonstração...', 'success');
        setTimeout(() => {
            redirectToSystem();
        }, 1000);
    }
}

// Redirecionar para o sistema principal
function redirectToSystem() {
    window.location.href = 'dashboard.html';
}

// Mostrar alertas
function showAlert(message, type = 'info') {
    // Remover alertas existentes
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Criar novo alerta
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Adicionar estilos
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(alert);
    
    // Remover após 3 segundos
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 3000);
}

// Adicionar animação CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

console.log('Sistema de login carregado!');
console.log('Usuários disponíveis:');
console.log('- admin / admin123');
console.log('- demo / demo123');

