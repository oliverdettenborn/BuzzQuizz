function trocarDeTela(telaAtual,proximaTela){
    var desabilitarTela = document.querySelector(telaAtual);
    desabilitarTela.style.display = "none";
    var habilitarTela = document.querySelector(proximaTela);
    habilitarTela.style.display = "block";
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

}

function removerEspaçosInicioFim(string){
    return string.trim();
}

function primeiraLetraEmMaiusculo(string){
    var texto = string[0].toUpperCase();
    texto += string.slice(1)
    return texto;
}

function transformarParaClasse(i){
    if(i === 1) return ".um";
    else if(i === 2) return '.dois';
    else if(i === 3) return '.tres';
}