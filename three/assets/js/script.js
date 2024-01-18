let ex = document.querySelector('.exercicios');
let ts = document.querySelector('.testes');
let btn_ex = document.querySelector('.btn-ex');
let btn_ts = document.querySelector('.btn-ts');
let title = document.querySelector('.title');

const exercises = () => {
    ts.style.display = 'none'
    ex.style.display = 'block'
    title.innerHTML = 'Exercícios'
    document.cookie = "selected = exercises";
}

const tests = () => {
    ex.style.display = 'none'
    ts.style.display = 'block'
    title.innerHTML = 'Testes'
    document.cookie = "selected = tests";
}

btn_ex.addEventListener('click',exercises)
btn_ts.addEventListener('click',tests)

if(document.cookie.includes('tests')){
    tests()
}
