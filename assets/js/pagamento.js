
const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
const dadosUsuario = JSON.parse(localStorage.getItem("usuarioLogado")) || [];

let metodoPagamentoSelecionado = 'pix';


function renderizarEndereco() {
    const rua = dadosUsuario.endereco?.[0]?.rua || "Rua não informada";
    const numero = dadosUsuario.endereco?.[0]?.numero || "S/N";
    const bairro = dadosUsuario.endereco?.[0]?.bairro || "Bairro não informado";
    const cidade = dadosUsuario.endereco?.[0]?.cidade || "Cidade não informada";
    const estado = dadosUsuario.endereco?.[0]?.estado || "UF";
    const cep = dadosUsuario.endereco?.[0]?.cep || "00000-000";

    const container = document.querySelector('.renerizar-endereco');

    if (container) {
        container.innerHTML = `
            <div class="endereco">
                <div class="container-endereco">
                    <i class="fas fa-map-marker-alt"></i>
                    <div class="descricao">
                        <h2>${rua}, ${numero}</h2>
                        <p>${bairro}, ${cidade} - ${estado}<br/>CEP: ${cep}</p>
                    </div>
                </div>
            </div>
        `;
    }
}


function renderizarResumo() {
    // Verifique se o carrinho é um array e se tem itens
    if (!Array.isArray(carrinho) || carrinho.length === 0) {
        console.warn("O carrinho está vazio.");
        return;
    }

    const container = document.querySelector('.container-resumo');

    if (container) {
        let total = 0;
        let htmlGerado = '';

        
        carrinho.forEach(item => {
            const quantidade = item.quantidade || 1;
            const preco = parseFloat(item.preco) || 0;
            const subtotal = quantidade * preco;
            total += subtotal;

            htmlGerado += `
                <div class="resumo-item">
                    <span class="resumo-label">${quantidade}x ${item.nome}</span>
                    <span class="resumo-valor">R$ ${subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
            `;
        });

     
        const frete = dadosUsuario.endereco?.[0]?.frete || 25.00;
        htmlGerado += `
            <div class="resumo-item">
                <span class="resumo-label">Frete</span>
                <span class="resumo-valor">R$ ${frete.toFixed(2).replace('.', ',')}</span>
            </div>
        `;

        total += frete;

      
        htmlGerado += `
            <div class="resumo-item total">
                <span>Total:</span>
                <span>R$ ${total.toFixed(2).replace('.', ',')}</span>
            </div>
        `;

        container.innerHTML = htmlGerado;
    }
}

//FUNÇÃO: ATUALIZAR INFO DO PAGAMENTO (NOVA)
function atualizarInfoPagamento(metodo) {
    const infoBox = document.querySelector('.payment-info-box');
    
    if (!infoBox) return;

    const informacoes = {
        pix: {
            titulo: 'Pix Selecionado:',
            descricao: 'Você receberá um código QR para escanear no seu banco. Pagamento em tempo real, sem taxa.'
        },
        cartao: {
            titulo: 'Cartão Selecionado:',
            descricao: 'Você pode parcelar em até 2x sem juros.'
        },
        dinheiro: {
            titulo: 'Dinheiro Selecionado:',
            descricao: 'Pagamento na entrega. 5% de desconto se pagar à vista. Sem taxa adicional.'
        }
    };

    const info = informacoes[metodo];
    if (info) {
        const nameElement = document.getElementById('payment-method-name');
        const infoElement = document.getElementById('payment-method-info');
        
        if (nameElement) nameElement.textContent = info.titulo;
        if (infoElement) infoElement.textContent = info.descricao;
    }
}

// FUNÇÃO: GERENCIAR TROCO (NOVA) 
function gerenciarTroco(metodo) {
    const campoTroco = document.getElementById('campo-troco');
    const inputTroco = document.getElementById('troco-valor');

    if (!campoTroco) return;

    if (metodo === 'dinheiro') {
        campoTroco.style.display = 'block';
        if (inputTroco) {
            setTimeout(() => inputTroco.focus(), 100);
        }
    } else {
        campoTroco.style.display = 'none';
        if (inputTroco) inputTroco.value = '';
    }
}

// ===== FUNÇÃO: SELECIONAR PAGAMENTO (Seu código + novas funcionalidades) =====
function selecionarPagamento(tipo, elemento) {
    // Guardar método selecionado
    metodoPagamentoSelecionado = tipo;

    // Remove a classe 'ativo' de todos e adiciona no selecionado
    document.querySelectorAll('.metodo-card').forEach(card => {
        card.classList.remove('ativo');
    });

    if (elemento) {
        elemento.classList.add('ativo');
        // Marcar radio button
        const radio = elemento.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;
    }

    // NOVO: Atualizar informações
    atualizarInfoPagamento(tipo);

    // NOVO: Gerenciar troco
    gerenciarTroco(tipo);

    console.log('Método selecionado:', tipo);
}

// ===== FUNÇÃO: VALIDAR TROCO (NOVA) =====
function validarTroco() {
    if (metodoPagamentoSelecionado !== 'dinheiro') {
        return true;
    }

    const inputTroco = document.getElementById('troco-valor');
    if (!inputTroco) return true;

    const troco = inputTroco.value;

    if (!troco || isNaN(troco) || parseFloat(troco) <= 0) {
        alert('Por favor, digite um valor válido para o troco');
        inputTroco.focus();
        return false;
    }

    return true;
}

// ===== FUNÇÃO: OBTER DADOS DO PAGAMENTO (NOVA) =====
function obterDadosPagamento() {
    const trocoInput = document.getElementById('troco-valor');
    
    return {
        metodo: metodoPagamentoSelecionado,
        troco: metodoPagamentoSelecionado === 'dinheiro' && trocoInput 
            ? parseFloat(trocoInput.value) 
            : null,
        endereco: dadosUsuario.endereco?.[0] || null,
        carrinho: carrinho,
        usuario: {
            id: dadosUsuario.id,
            nome: dadosUsuario.nome,
            email: dadosUsuario.email
        }
    };
}

// ===== FUNÇÃO: ATUALIZAR PASSOS (NOVA) =====
function atualizarPassosCheckout(etapaAtual) {
    const steps = document.querySelectorAll('.step');

    steps.forEach((step, index) => {
        step.classList.remove('active', 'completed');

        if (index + 1 < etapaAtual) {
            step.classList.add('completed');
        } else if (index + 1 === etapaAtual) {
            step.classList.add('active');
        }
    });
}

// ===== INICIALIZAÇÃO (Chamar ao carregar a página) =====
document.addEventListener('DOMContentLoaded', function() {
    // Renderizar endereço
    renderizarEndereco();

    // Renderizar resumo
    renderizarResumo();

    // Atualizar passos (etapa 2 - Pagamento)
    atualizarPassosCheckout(2);

    // Inicializar com Pix selecionado
    const primeiroCard = document.querySelector('.metodo-card');
    if (primeiroCard) {
        selecionarPagamento('pix', primeiroCard);
    }

    // Event listener para radio buttons (opcional, melhora acessibilidade)
    document.querySelectorAll('input[name="pagamento"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const card = this.closest('.metodo-card');
            selecionarPagamento(this.value, card);
        });
    });

    // Event listener para botão de finalizar compra
    const btn = document.querySelector('#btnEntrar');
    if (btn) {
        btn.addEventListener('click', function() {
            // Validar troco se dinheiro selecionado
            if (!validarTroco()) {
                return;
            }

            // Adicionar estado de loading
            btn.classList.add('loading');
            btn.disabled = true;

            // Coletar dados
            const dadosPagamento = obterDadosPagamento();

            // Aqui você pode fazer a requisição para seu servidor
            console.log('Dados a enviar:', dadosPagamento);

            // Simulação: Aguardar 4 segundos (seu código original)
            setTimeout(() => {
                btn.classList.remove('loading');
                btn.disabled = false;

                // Salvar dados da compra antes de redirecionar (opcional)
                localStorage.setItem('compraAtual', JSON.stringify(dadosPagamento));

                // Redirecionar para próxima página
                window.location.href = "entrega.html";
            }, 4000);
        });
    }
});

// ===== FUNÇÃO AUXILIAR: Formatar moeda =====
function formatarMoeda(valor) {
    return parseFloat(valor).toFixed(2).replace('.', ',');
}

// ===== EXPORTAR FUNÇÕES (se usar módulos) =====
// export { renderizarEndereco, renderizarResumo, selecionarPagamento, validarTroco, obterDadosPagamento };