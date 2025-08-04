// Sistema MedControl Personal - JavaScript Principal

// Variáveis globais
let currentUser = null;
let exames = JSON.parse(localStorage.getItem('healthExams')) || [];
let medicamentos = JSON.parse(localStorage.getItem('healthMedications')) || [];
let vacinas = JSON.parse(localStorage.getItem('healthVaccines')) || [];
let consultasDentista = JSON.parse(localStorage.getItem('healthDental')) || [];

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se usuário está logado
    const savedUser = localStorage.getItem('currentHealthUser') || sessionStorage.getItem('currentHealthUser');
    if (!savedUser) {
        window.location.href = 'index.html';
        return;
    }
    
    try {
        currentUser = JSON.parse(savedUser);
        document.getElementById('user-name').textContent = currentUser.fullName || currentUser.username;
    } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        window.location.href = 'index.html';
        return;
    }
    
    // Inicializar sistema
    initializeSystem();
});

// Inicializar sistema
function initializeSystem() {
    updateDashboardStats();
    loadExames();
    loadMedicamentos();
    loadVacinas();
    loadConsultasDentista();
    
    console.log('Sistema MedControl Personal carregado com sucesso!');
}

// Navegação entre abas
function showTab(tabName) {
    // Remover classe active de todas as abas
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Ativar aba selecionada
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
    
    // Atualizar dados específicos da aba
    switch(tabName) {
        case 'dashboard':
            updateDashboardStats();
            break;
        case 'exames':
            loadExames();
            break;
        case 'medicamentos':
            loadMedicamentos();
            break;
        case 'vacinas':
            loadVacinas();
            break;
        case 'dentista':
            loadConsultasDentista();
            break;
    }
}

// Atualizar estatísticas do dashboard
function updateDashboardStats() {
    document.getElementById('total-exames').textContent = exames.length;
    document.getElementById('total-medicamentos').textContent = medicamentos.filter(m => m.ativo).length;
    document.getElementById('total-vacinas').textContent = vacinas.length;
    document.getElementById('total-consultas').textContent = consultasDentista.length;
}

// Carregar exames
function loadExames() {
    const tbody = document.querySelector('#exames-table tbody');
    tbody.innerHTML = '';
    
    exames.forEach(exame => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${exame.nome}</td>
            <td>${formatDate(exame.data)}</td>
            <td>${exame.medico}</td>
            <td><span class="status-badge status-${exame.status.toLowerCase()}">${exame.status}</span></td>
            <td>
                <button class="btn-action" onclick="editExame(${exame.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-action btn-danger" onclick="deleteExame(${exame.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Carregar medicamentos
function loadMedicamentos() {
    const grid = document.getElementById('medications-grid');
    grid.innerHTML = '';
    
    medicamentos.filter(m => m.ativo).forEach(med => {
        const card = document.createElement('div');
        card.className = 'medication-card';
        card.innerHTML = `
            <h4>${med.nome}</h4>
            <p><strong>Dosagem:</strong> ${med.dosagem}</p>
            <p><strong>Frequência:</strong> ${med.frequencia}</p>
            <p><strong>Médico:</strong> ${med.medico}</p>
            <p><strong>Próxima dose:</strong> ${formatDateTime(med.proximaDose)}</p>
            <div class="medication-actions">
                <button class="btn-primary" onclick="marcarDoseTomada(${med.id})">
                    <i class="fas fa-check"></i> Dose Tomada
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Carregar vacinas
function loadVacinas() {
    const tbody = document.querySelector('#vacinas-table tbody');
    tbody.innerHTML = '';
    
    vacinas.forEach(vacina => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${vacina.nome}</td>
            <td>${formatDate(vacina.data)}</td>
            <td>${vacina.dose}</td>
            <td>${vacina.local}</td>
            <td>
                <button class="btn-action" onclick="editVacina(${vacina.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-action btn-danger" onclick="deleteVacina(${vacina.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Carregar consultas dentista
function loadConsultasDentista() {
    const tbody = document.querySelector('#dental-table tbody');
    tbody.innerHTML = '';
    
    consultasDentista.forEach(consulta => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${consulta.procedimento}</td>
            <td>${formatDate(consulta.data)}</td>
            <td>${consulta.dentista}</td>
            <td>R$ ${consulta.custo.toFixed(2)}</td>
            <td>
                <button class="btn-action" onclick="editConsulta(${consulta.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-action btn-danger" onclick="deleteConsulta(${consulta.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Funções de modal (placeholder)
function openExamModal() {
    alert('Modal de exames em desenvolvimento!');
}

function openMedicationModal() {
    alert('Modal de medicamentos em desenvolvimento!');
}

function openVaccineModal() {
    alert('Modal de vacinas em desenvolvimento!');
}

function openDentalModal() {
    alert('Modal de consultas em desenvolvimento!');
}

// Funções de edição (placeholder)
function editExame(id) {
    alert(`Editar exame ID: ${id}`);
}

function editVacina(id) {
    alert(`Editar vacina ID: ${id}`);
}

function editConsulta(id) {
    alert(`Editar consulta ID: ${id}`);
}

// Funções de exclusão (placeholder)
function deleteExame(id) {
    if (confirm('Tem certeza que deseja excluir este exame?')) {
        exames = exames.filter(e => e.id !== id);
        localStorage.setItem('healthExams', JSON.stringify(exames));
        loadExames();
        updateDashboardStats();
    }
}

function deleteVacina(id) {
    if (confirm('Tem certeza que deseja excluir esta vacina?')) {
        vacinas = vacinas.filter(v => v.id !== id);
        localStorage.setItem('healthVaccines', JSON.stringify(vacinas));
        loadVacinas();
        updateDashboardStats();
    }
}

function deleteConsulta(id) {
    if (confirm('Tem certeza que deseja excluir esta consulta?')) {
        consultasDentista = consultasDentista.filter(c => c.id !== id);
        localStorage.setItem('healthDental', JSON.stringify(consultasDentista));
        loadConsultasDentista();
        updateDashboardStats();
    }
}

// Marcar dose como tomada
function marcarDoseTomada(id) {
    const medicamento = medicamentos.find(m => m.id === id);
    if (medicamento) {
        // Calcular próxima dose (exemplo: +8 horas)
        const agora = new Date();
        medicamento.proximaDose = new Date(agora.getTime() + 8 * 60 * 60 * 1000);
        
        localStorage.setItem('healthMedications', JSON.stringify(medicamentos));
        loadMedicamentos();
        
        showAlert('Dose marcada como tomada!', 'success');
    }
}

// Logout
function goToLogin() {
    if (confirm('Tem certeza que deseja sair?')) {
        localStorage.removeItem('currentHealthUser');
        sessionStorage.removeItem('currentHealthUser');
        window.location.href = 'index.html';
    }
}

// Funções utilitárias
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR');
}

function showAlert(message, type = 'info') {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#007bff'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 3000);
}

// Dados de exemplo para demonstração
function loadSampleData() {
    if (exames.length === 0) {
        exames = [
            {
                id: 1,
                nome: 'Hemograma Completo',
                data: '2024-08-01',
                medico: 'Dr. Silva',
                status: 'Realizado'
            },
            {
                id: 2,
                nome: 'Raio-X Tórax',
                data: '2024-08-15',
                medico: 'Dr. Santos',
                status: 'Agendado'
            }
        ];
        localStorage.setItem('healthExams', JSON.stringify(exames));
    }
    
    if (medicamentos.length === 0) {
        medicamentos = [
            {
                id: 1,
                nome: 'Losartana',
                dosagem: '50mg',
                frequencia: '1x ao dia',
                medico: 'Dr. Silva',
                ativo: true,
                proximaDose: new Date(Date.now() + 2 * 60 * 60 * 1000)
            }
        ];
        localStorage.setItem('healthMedications', JSON.stringify(medicamentos));
    }
}

// Carregar dados de exemplo na primeira execução
loadSampleData();

console.log('Sistema MedControl Personal - Script principal carregado!');

