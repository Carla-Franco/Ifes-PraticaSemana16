(function() {
    'use strict'

    var forms = document.querySelectorAll('.needs-validation')

    Array.prototype.slice.call(forms).forEach(function(form) {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                form.classList.add('was-validated')
            } else {
                inserir()
                form.classList.remove('was-validated')
                form.reset()
            }
            event.preventDefault()
            event.stopPropagation()
        }, false)
    })
}) ()

function getLocalStorage() {
    return JSON.parse(localStorage.getItem('bd_maquiagens')) ?? [];
}

function setLocalStorage(bd_maquiagens) {
    localStorage.setItem('bd_maquiagens', JSON.stringify(bd_maquiagens));
}

function limparTabela() {
    var elemento = document.querySelector("#tabela>tbody");
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
}

function atualizarTabela() {
    limparTabela();
    const bd_maquiagens = getLocalStorage();
    let index = 0;
    for (maquiagem of bd_maquiagens) {
        const novaLinha = document.createElement('tr');
        novaLinha.innerHTML = `
        <th scope="row">${index}</th>
        <td>${maquiagem.codigo}</td>
        <td>${maquiagem.quantidade}</td>
        <td>${maquiagem.produto}</td>
        <td>${maquiagem.marca}</td>
        <td>${maquiagem.categoria}</td>
        <td>${maquiagem.preco}</td>
        <td>
        <button type="button" class="btn btn-danger" id="${index}" onclick="excluir(${index})">Excluir</button>
        </td>
        `
        document.querySelector('#tabela>tbody').appendChild(novaLinha)
        index++;
    }
}

function inserir() {
    const maquiagem = {
        codigo: document.getElementById('codigo').value,
        quantidade: document.getElementById('quantidade').value,
        produto: document.getElementById('produto').value,
        marca: document.getElementById('marca').value,
        categoria: document.getElementById('categoria').value,
        preco: document.getElementById('preco').value
    }
    const bd_maquiagens = getLocalStorage();
    bd_maquiagens.push(maquiagem);
    setLocalStorage(bd_maquiagens);
    atualizarTabela();
}

function excluir(index) {
    const bd_maquiagens = getLocalStorage();
    bd_maquiagens.splice(index, 1);
    setLocalStorage(bd_maquiagens);
    atualizarTabela();
}

function validarCodigo() {
    const bd_maquiagens = getLocalStorage();
    for (maquiagem of bd_maquiagens) {
        if (codigo.value == maquiagem.codigo) {
            codigo.setCustomValidity("Este código já foi cadastrado!");
            feedbackCodigo.innerText = "Este código já foi cadastrado!";
            return false;
        } else {
            codigo.setCustomValidity("");
            feedbackCodigo.innerText = "Informe o código corretamente.";
        }
    }
    return true;
}

atualizarTabela();

const codigo = document.getElementById("codigo");
const  feedbackCodigo = document.getElementById("feedbackCodigo");
codigo.addEventListener('input', validarCodigo);