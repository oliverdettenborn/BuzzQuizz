function trocarDeTela(telaAtual,proximaTela){
    var desabilitarTela = document.querySelector(telaAtual);
    desabilitarTela.style.opacity = '0';
    var carregando = document.querySelector('#carregando');
    carregando.style.display = 'flex';
    
    setTimeout(function(){
        carregando.style.display = 'none';
        var habilitarTela = document.querySelector(proximaTela);
        habilitarTela.style.opacity = '1';
        habilitarTela.style.display = "block";
        desabilitarTela.style.display = "none"; 
    },3500);
}

function pegarValorInput(identificador){
    var input = document.querySelector(identificador);
    var textoInput = input.value;
    
    if(textoInput !== ''){
        input.value = '';
        return textoInput;
    }else{
        input.style.border = "1px solid red";
        return "vazio"
    }
}

function verificarPerguntas(pergunta){
    //verificação se possui apenas 1 interrogação:
    var count = 0;
    var posicaoInterrogacao = pergunta.indexOf("?");

    while (posicaoInterrogacao !== -1){
        count++;
        posicaoInterrogacao = pergunta.indexOf( "?",posicaoInterrogacao + 1);
    };

    //verificação se interrogação está no fim e tem apenas 1:
    var estaNoFinal = pergunta.lastIndexOf("?") === (pergunta.length - 1);
    var temSoUm = count === 1;
    
    if(temSoUm && estaNoFinal) return true;
    else return false;
}

function removerEspaçosInicioFim(string){
    return string.trim();
}

function primeiraLetraEmMaiusculo(string){
    var texto = string[0].toUpperCase();
    texto += string.slice(1)
    return texto;
}

function sairTelaCriacao(){
    trocarDeTela('#tela-criacao','#tela-usuario');
}

function transformarParaClasse(i){
    if(i === 1) return ".um";
    else if(i === 2) return '.dois';
    else if(i === 3) return '.tres';
}

function comparador() { 
	return Math.random() - 0.5; 
}