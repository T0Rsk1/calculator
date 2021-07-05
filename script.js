function add(x, y){
    return x + y;
}

function subtract(x, y){
    return x - y;
}

function multiply(x, y){
    return x * y;
}

function divide(x, y){
    return x / y;
}

function operate(op, x, y){
    const operations =
    {'+': add(x, y),
     '-': subtract(x, y),
     '*': multiply(x, y),
     '/': divide(x, y)};
     return operations[op];
}
const num = document.querySelectorAll('.btn');
num.forEach(btn => btn.addEventListener('click', e => {
    console.log(btn.textContent);
}));