const digitBtn = document.querySelectorAll('.btn-input');
const opBtn = document.querySelectorAll('.btn-op');
const ctrlBtn = document.querySelectorAll('.btn-ctrl');
const disp = document.querySelector('#display');
let num1 = '';
let num2 = '';
let op = '';
let typing = true;

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

function operate(oper, x, y){
    x = +x;
    y = +y;
    const operations =
    {'+': add(x, y),
     '-': subtract(x, y),
     '*': multiply(x, y),
     '/': divide(x, y)};
     return operations[oper];
}

function display(str){
    if(!typing){
        disp.textContent = '';
        typing = true;
    } 
    disp.textContent += str;
}

function evaluate(){
    if(op === '' || num1 === '') return;
    num2 = '';
    num2 = disp.textContent;
    num1 = operate(op, num1, num2);
    typing = false;
    display(num1);
}

function clear(){
    num1 = '';
    num2 = '';
    op = '';
    disp.textContent = '0';
}

function del(){
    disp.textContent = disp.textContent.substring(0, disp.textContent.length - 1);
    if(disp.textContent[disp.textContent.length-1] === '.')
        disp.textContent = disp.textContent.substring(0, disp.textContent.length - 1);
    if(disp.textContent === '' || disp.textContent === '-0' || disp.textContent === '-') 
        disp.textContent = '0';
}

digitBtn.forEach(btn => btn.addEventListener('click', () => {
    if(disp.textContent === '0') disp.textContent = '';
    display(btn.textContent);
}));

opBtn.forEach(btn => btn.addEventListener('click', () => {
    if(typing){
        if(num1 === '') num1 = disp.textContent;
        if(op === ''){
            op = btn.textContent;
        }
        else {
            evaluate();
            op = btn.textContent;
        }
    }   
    typing = false;
}));

ctrlBtn.forEach(btn => btn.addEventListener('click', () => {
    if(btn.textContent === '='){
        evaluate();
        num1 = '';
        num2 = '';
        op = '';
    }
    else if(btn.textContent === 'C') clear();
    else del();
}));

window.addEventListener('keydown', e => {
    if(e.keyCode === 82) window.location.reload();
});

/*  
    console.log('digitBtn');
    console.log('num1: ' + num1);
    console.log('num2: ' + num2);
    console.log('op: ' + op);
*/