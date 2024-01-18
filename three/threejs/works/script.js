// Voltar para tela inicial
console.log('Hello world!');

let voltar = () => {
    window.location.href = "/three/";
}

document.getElementById('btnVoltar').addEventListener('click', voltar);