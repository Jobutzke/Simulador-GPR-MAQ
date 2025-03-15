function calcular() {
    const valorEquipamentoText = document.getElementById("valorEquipamento").value;
    const valorEntradaText = document.getElementById("valorEntrada").value;
    const numParcelas = parseInt(document.getElementById("numParcelas").value, 10);

    const valorEquipamento = parseFloat(valorEquipamentoText.replace(/\D/g, '')) / 100;
    const valorEntrada = parseFloat(valorEntradaText.replace(/\D/g, '')) / 100;

    if (!valorEquipamento || !valorEntrada || !numParcelas) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    calcularPercentualEntrada();

    const valorCredito = valorEquipamento - valorEntrada;
    const valorTAC = Math.max(valorCredito * 0.01, 2000);
    const valorOperacao = valorCredito + valorTAC;

    let taxaJuros;
    if (numParcelas >= 6 && numParcelas <= 24) {
        taxaJuros = 0.03; // 3% ao mês
    } else if (numParcelas > 24 && numParcelas <= 36) {
        taxaJuros = 0.032; // 3.2% ao mês
    } else {
        alert("Número de parcelas deve estar entre 6 e 36.");
        return;
    }

    const valorRastreador = 200;
    const valorSeguro = (valorEquipamento * 0.011) / 12; // Dividido para 12 meses

    const valorParcelaBase = calcularParcela(valorOperacao, taxaJuros, numParcelas);
    const valorParcelaTotal = valorParcelaBase + valorRastreador + valorSeguro;

    document.getElementById("valorCreditoField").innerText = `Valor Total do Crédito: ${valorCredito.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
    document.getElementById("valorOperacaoField").innerText = `Valor Total da Operação: ${valorOperacao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} (TAC: ${valorTAC.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })})`;
    document.getElementById("valorParcelaBaseField").innerHTML = `<span class="highlight">Valor Parcelas: ${valorParcelaBase.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>`;
    document.getElementById("valorSeguroField").innerText = `Valor do Seguro: ${valorSeguro.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
    document.getElementById("valorRastreadorField").innerText = `Valor do Rastreador: ${valorRastreador.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
    document.getElementById("valorParcelaCompletoField").innerHTML = `<span class="highlight">Valor Parcela Completo: ${valorParcelaTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>`;
}

function calcularParcela(valor, taxaMensal, parcelas) {
    return (valor * taxaMensal) / (1 - Math.pow(1 + taxaMensal, -parcelas));
}

function formatCurrency(input) {
    const entrada = input.value.replace(/\D/g, '');
    const num = parseFloat(entrada) / 100;
    input.value = num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function calcularValorMinimoEntrada() {
    const valorEquipamentoText = document.getElementById("valorEquipamento").value;
    const valorEquipamento = parseFloat(valorEquipamentoText.replace(/\D/g, '')) / 100;
    const valorMinimoEntrada = valorEquipamento * 0.35;

    const valorMinimoEntradaElem = document.getElementById("valorMinimoEntrada");
    valorMinimoEntradaElem.innerHTML = `(Valor Mínimo de Entrada: ${valorMinimoEntrada.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })})`;
}

function calcularPercentualEntrada() {
    const valorEquipamentoText = document.getElementById("valorEquipamento").value;
    const valorEntradaText = document.getElementById("valorEntrada").value;

    const valorEquipamento = parseFloat(valorEquipamentoText.replace(/\D/g, '')) / 100;
    const valorEntrada = parseFloat(valorEntradaText.replace(/\D/g, '')) / 100;
    const percentualEntrada = (valorEntrada / valorEquipamento) * 100;

    const percentualEntradaElem = document.getElementById("percentualEntrada");
    if (percentualEntrada < 35) {
        percentualEntradaElem.style.color = "red";
        percentualEntradaElem.innerHTML = `(${percentualEntrada.toFixed(2)}%)`;
    } else {
        percentualEntradaElem.style.color = "green";
        percentualEntradaElem.innerHTML = `(${percentualEntrada.toFixed(2)}%)`;
    }
}