let ex = document.querySelector('.exercicios');
let ts = document.querySelector('.testes');
let btn_ex = document.querySelector('.btn-ex');
let btn_ts = document.querySelector('.btn-ts');
let title = document.querySelector('.title');

btn_ex.addEventListener('click', () => {
    ts.style.display = 'none'
    ex.style.display = 'block'
    title.innerHTML = 'Exercícios'
})

btn_ts.addEventListener('click', () => {
    ex.style.display = 'none'
    ts.style.display = 'block'
    title.innerHTML = 'Testes'
})