let metodoSelecionado = "";

function alterarQuantidade(id, valor) {
  const quantidadeSpan = document.getElementById(`quantidade-${id}`);
  let atual = parseInt(quantidadeSpan.innerText);
  atual = Math.max(0, atual + valor);
  quantidadeSpan.innerText = atual;
}

function selecionarPagamento(botao, metodo) {
  document.querySelectorAll('.payment-btn').forEach(btn => btn.classList.remove('selected'));
  botao.classList.add('selected');
  metodoSelecionado = metodo;
}

function enviarMensagem() {
  if (!metodoSelecionado) {
    alert("Por favor, selecione um método de pagamento.");
    return;
  }

  const itens = [
    { id: 1, nome: "Croissant", preco: 9.00 },
    { id: 2, nome: "Pão de queijo", preco: 8.00 },
    { id: 3, nome: "Pão de Batata", preco: 9.00 },
    { id: 4, nome: "Suco", preco: 8.00 },
    { id: 5, nome: "café", preco: 8.00 },
    { id: 6, nome: "refrigerante", preco: 8.00 },
    { id: 7, nome: "Buffet Completo", preco: 300.00 },
    { id: 8, nome: "Reposição de café", preco: 70.00 },
    { id: 9, nome: "Reposição de Água", preco: 30.00 },
  ];

  let mensagem = "Olá! Gostaria de fazer um pedido:%0A\n";
  let total = 0;

  itens.forEach(item => {
    const quantidade = parseInt(document.getElementById(`quantidade-${item.id}`).innerText);
    if (quantidade > 0) {
      mensagem += `• ${item.nome} ${quantidade}x = R$ ${(item.preco * quantidade).toFixed(2)}%0A\n`;
       total += item.preco * quantidade;
    }
  });

  if (total === 0) {
    alert("Adicione ao menos um item ao pedido.");
    return;
  }

  mensagem += `Total: R$ ${total.toFixed(2)}%0APagamento: ${metodoSelecionado}`;
  const telefone = "967746927"; // Substitua aqui com seu número no formato 5511999999999
  window.open(`https://wa.me/${telefone}?text=${mensagem}`, "_blank");
}

function scrollPara(id) {
  const destino = document.getElementById(id);
  destino.scrollIntoView({ behavior: 'smooth' });
}

function verificarHorario() {
  const agora = new Date();
  const dia = agora.getDay(); // 0 = Domingo, 6 = Sábado
  const hora = agora.getHours();
  const minuto = agora.getMinutes();
  
  const dentroDoHorario = (
    dia >= 1 && dia <= 6 && // de segunda a sábado
    (
      (hora > 7 && hora < 15) ||
      (hora === 7 && minuto >= 30) ||
      (hora === 15 && minuto === 0)
    )
  );

  const botao = document.querySelector('.whatsapp-btn');
  const aviso = document.getElementById('aviso-horario');

  if (!dentroDoHorario) {
    botao.disabled = true;
    botao.textContent = "Fora do horário de atendimento";
    botao.style.backgroundColor = "gray";
    botao.style.cursor = "not-allowed";

    // Mostrar aviso animado
    aviso.style.display = "block";
  }
}

// Executar ao carregar a página
verificarHorario();



