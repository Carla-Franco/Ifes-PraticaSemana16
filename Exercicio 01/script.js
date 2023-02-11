const contato1 = {
    nome: "Carla",
    telefone: "(27)99991-4216"
}

const contato2 = {
    nome: "Rondonito",
    telefone: "(27)99739-4482"
}

const bd_contatos = [contato1, contato2];

localStorage.setItem('bd_contatos', JSON.stringify(bd_contatos));

const contatos = JSON.parse(localStorage.getItem('bd_contatos'));

for (let c of contatos) {
    document.write("<p>" + c.nome);
    document.write("<p>" + c.telefone);
}