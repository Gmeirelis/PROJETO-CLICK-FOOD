// ===== DADOS DO PEDIDO =====
const dadosCompra = JSON.parse(localStorage.getItem("compraAtual")) || {};
const dadosUsuario = JSON.parse(localStorage.getItem("usuarioLogado")) || [];
const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// ===== INICIALIZAR PÁGINA =====
document.addEventListener('DOMContentLoaded', function() {
    renderizarDadosPedido();
    renderizarItens();
    renderizarEndereco();
    atualizarTimeline();
});

// ===== FUNÇÃO: RENDERIZAR DADOS DO PEDIDO =====
function renderizarDadosPedido() {
    // Número do pedido (pode ser aleatório ou do servidor)
    const numeroPedido = gerarNumeroPedido();
    document.getElementById('numero-pedido').textContent = `#${numeroPedido}`;

    // Tempo estimado de entrega
    const tempoEntrega = calcularTempoEntrega();
    document.getElementById('tempo-entrega').textContent = tempoEntrega;

    // Valor total
    const valorTotal = calcularTotal();
    document.getElementById('valor-total').textContent = `R$ ${formatarMoeda(valorTotal)}`;
}

// ===== FUNÇÃO: RENDERIZAR ITENS =====
function renderizarItens() {
    const itemsContainer = document.getElementById('items-lista');
    
    if (!Array.isArray(carrinho) || carrinho.length === 0) {
        itemsContainer.innerHTML = '<p>Nenhum item no carrinho</p>';
        return;
    }

    let htmlItens = '';
    carrinho.forEach(item => {
        const quantidade = item.quantidade || 1;
        htmlItens += `<p>${quantidade}x ${item.nome}</p>`;
    });

    itemsContainer.innerHTML = htmlItens;
}

// ===== FUNÇÃO: RENDERIZAR ENDEREÇO =====
function renderizarEndereco() {
    const enderecoData = dadosUsuario.endereco?.[0] || {};
    const rua = enderecoData.rua || "Rua não informada";
    const numero = enderecoData.numero || "S/N";
    const bairro = enderecoData.bairro || "Bairro não informado";
    const cidade = enderecoData.cidade || "Cidade";
    const estado = enderecoData.estado || "UF";

    const enderecoInfo = document.getElementById('endereco-info');
    enderecoInfo.innerHTML = `
        <p class="endereco-rua">${rua}, ${numero}</p>
        <p class="endereco-bairro">${bairro}, ${cidade} - ${estado}</p>
    `;
}

// FUNÇÃO: ATUALIZAR TIMELINE 
function atualizarTimeline(etapa = 2) {
    // etapa 1 = Confirmado
    // etapa 2 = Preparando (atual)
    // etapa 3 = Saiu para entrega
    
    const labels = document.querySelectorAll('.timeline-label-item');
    labels.forEach((label, index) => {
        label.classList.remove('completed', 'active');
        
        if (index + 1 < etapa) {
            label.classList.add('completed');
        } else if (index + 1 === etapa) {
            label.classList.add('active');
        }
    });
}

//  FUNÇÃO: CALCULAR TEMPO ESTIMADO
function calcularTempoEntrega() {
    
    const minutos = Math.floor(Math.random() * 120) + 60; // 60 a 180 minutos
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;

    if (horas === 0) {
        return `${mins}min`;
    }
    return `${horas}h ${mins}min`;
}

// ===== FUNÇÃO: CALCULAR TOTAL =====
function calcularTotal() {
    if (!Array.isArray(carrinho) || carrinho.length === 0) {
        return 0;
    }

    let total = 0;
    carrinho.forEach(item => {
        const quantidade = item.quantidade || 1;
        const preco = parseFloat(item.preco) || 0;
        total += quantidade * preco;
    });

    // Adicionar frete
    const frete = dadosUsuario.endereco?.[0]?.frete || 25;
    total += frete;

    return total;
}

// ===== FUNÇÃO: GERAR NÚMERO DO PEDIDO =====
function gerarNumeroPedido() {
    // Usar número salvo ou gerar novo
    const pedidoExistente = sessionStorage.getItem('numeroPedido');
    if (pedidoExistente) {
        return pedidoExistente;
    }

    const numero = Math.floor(Math.random() * 90000) + 10000;
    sessionStorage.setItem('numeroPedido', numero);
    return numero;
}

// ===== FUNÇÃO: FORMATAR MOEDA =====
function formatarMoeda(valor) {
    return parseFloat(valor).toFixed(2).replace('.', ',');
}

//  FUNÇÃO: LIGAR PARA RESTAURANTE 
function ligarParaRestaurante() {
    const telefone = "1133334444"; // Número do restaurante
    
    // Se for mobile, abrir dialer
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        window.location.href = `tel:${telefone}`;
    } else {
        // Em desktop, mostrar mensagem
        alert(`Telefone do restaurante: (${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(7)}`);
    }
}

// FUNÇÃO: RASTREAR PEDIDO 
function rastrearPedido() {
    
    console.log('Rastreando pedido...');
    
   
    mostrarRastreamento();
}

// FUNÇÃO: MOSTRAR RASTREAMENTO 
function mostrarRastreamento() {
    // Simulação de rastreamento
    const rastreamento = document.createElement('div');
    rastreamento.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: flex-end;
        z-index: 1000;
    `;

    rastreamento.innerHTML = `
        <div style="
            background: white;
            width: 100%;
            border-radius: 12px 12px 0 0;
            padding: 2rem;
            animation: slideUp 0.3s ease;
        ">
            <button onclick="this.closest('div').parentElement.remove()" style="
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: transparent;
                border: none;
                font-size: 24px;
                cursor: pointer;
            ">×</button>
            
            <h3 style="margin-bottom: 1rem; color: #1a1a1a;">Rastreamento em tempo real</h3>
            <div style="height: 300px; background: #f0f0f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                <p style="color: #666; text-align: center;">
                    Mapa carregando...<br/>
                    Seu pedido está a <strong>2.5 km</strong> de você
                </p>
            </div>
            
            <div style="background: #f9f9f9; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                <p style="margin: 0; font-size: 13px; color: #666;">ETA de entrega</p>
                <p style="margin: 0.5rem 0 0; font-size: 16px; font-weight: 600; color: #d4a541;">18 minutos</p>
            </div>
            
            <button onclick="this.closest('div').parentElement.remove()" style="
                width: 100%;
                padding: 0.75rem;
                background: #d4a541;
                color: white;
                border: none;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
            ">Fechar</button>
        </div>
    `;

    document.body.appendChild(rastreamento);

    // Remover ao clicar fora
    rastreamento.addEventListener('click', (e) => {
        if (e.target === rastreamento) {
            rastreamento.remove();
        }
    });
}


function salvarDados(){
    localStorage.setItem('historico', JSON.stringify(dadosCompra));
      window.location.href = '../index.html';
}





// ===== FUNÇÃO: SIMULAR ATUALIZAÇÃO DE STATUS =====
function simularProgresso() {
    
    const etapas = [
        { numero: 2, tempo: 5000, mensagem: 'Preparando...' },
        { numero: 3, tempo: 15000, mensagem: 'Saiu para entrega!' }
    ];

    etapas.forEach(etapa => {
        setTimeout(() => {
            atualizarTimeline(etapa.numero);
            console.log(etapa.mensagem);
           
        }, etapa.tempo);
    });
}


// ===== FUNÇÕES AUXILIARES =====

function formatarData(data) {
    const opcoes = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(data).toLocaleDateString('pt-BR', opcoes);
}

/**
 * Obter tempo decorrido desde um evento
 */
function tempoDecorrido(dataInicio) {
    const agora = new Date();
    const inicio = new Date(dataInicio);
    const diferenca = agora - inicio;
    
    const minutos = Math.floor(diferenca / 60000);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    
    if (dias > 0) return `${dias} dia${dias > 1 ? 's' : ''} atrás`;
    if (horas > 0) return `${horas} hora${horas > 1 ? 's' : ''} atrás`;
    if (minutos > 0) return `${minutos} minuto${minutos > 1 ? 's' : ''} atrás`;
    return 'agora mesmo';
}


// ===== ANIMATION STYLES =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            transform: translateY(100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);