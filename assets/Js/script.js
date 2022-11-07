'use strict'

const limparForm = (endereco) => {

    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

const preencherForm = (endereco) => {

    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}
const eNumero = (numero) => /^[0-9]+$/.test(numero)

const cepValido = (cep) => cep.length == 8 && eNumero(cep); //validação para ler somente os oito numeros e nao considerar letras//

const pesquisarCep = async() => {
    limparForm();
    const cep = document.getElementById('cep').value;
    const url = `http://viacep.com.br/ws/${cep}/json/`
    if (cepValido(cep)) {
        const dados = await fetch(url);
        const endereco = await dados.json();
        if (endereco.hasOwnProperty('erro')) {
            document.getElementById('endereco').value = 'CEP não encontrado'
        } else {
            preencherForm(endereco)
        }

    } else {
        document.getElementById('endereco').value = 'CEP incorreto'
    }



}

document.getElementById('cep')
    .addEventListener('focusout', pesquisarCep);