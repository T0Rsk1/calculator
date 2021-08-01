const digitBtn = document.querySelectorAll('.btn-input');
const opBtn = document.querySelectorAll('.btn-op');
const ctrlBtn = document.querySelectorAll('.btn-ctrl');
const disp = document.querySelector('#display');
const decPrec = 6;
let num1 = '';
let num2 = '';
let op = '';
let reset = false;

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
    if(y === 0) return null;
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
    if(reset){
        disp.textContent = '';
        reset = false;
    } 
    disp.textContent += str;
}

function evaluate(){
    if(num1 === '' || op === '') return;
    reset = true;
    num2 = disp.textContent;
    num1 = operate(op, num1, num2);
    console.log(num1);
    if(num1 === null) return disp.textContent = '>:(';
    let str = num1.toString();
    if(str.indexOf('.') !== -1 && str.indexOf('e') === -1) num1 = roundDec(num1, decPrec);
    if(num1.toString().length > 11) num1 = resize(num1);
    display(num1);
}

function clear(){
    num1 = '';
    num2 = '';
    op = '';
}

function allClear(){
    clear();
    disp.textContent = '0';
}

function percent(){
    disp.textContent /= 100;    
}

function del(){
    disp.textContent = delLast(disp.textContent);
    if(disp.textContent[disp.textContent.length-1] === '.')
        disp.textContent = delLast(disp.textContent);
    if(disp.textContent === '' || disp.textContent === '-0' || disp.textContent === '-') 
        disp.textContent = '0';
}

function resize(x){
    let str = x.toString();
    if(str.indexOf('e') === -1) str = x.toExponential();
    str = str.split('e');
    x = roundDec(str[0], 5);
    x += 'e' + str[1];
    return x;
}

function delLast(str){
    return str.substring(0, str.length - 1);
}

function roundDec(x, p){
    p = Math.pow(10, p);
    return Math.round(x * p) / p;
}

digitBtn.forEach(btn => btn.addEventListener('click', () => {
    if(disp.textContent.length > 11 && !reset) return; 
    if(disp.textContent === '0') disp.textContent = '';
    display(btn.textContent);
}));

opBtn.forEach(btn => btn.addEventListener('click', () => {
    if(!reset){
        if(num1 === '') num1 = disp.textContent;
        if(op !== '') evaluate();
        op = btn.textContent;
    }   
    reset = true;
}));

ctrlBtn.forEach(btn => btn.addEventListener('click', () => {
    if(btn.textContent === '='){
        evaluate();
        clear();
    }
    else if(btn.textContent === 'C') allClear();
    else if(btn.textContent === '%') percent();
    else del();
}));

window.addEventListener('keydown', e => {
    if(e.keyCode === 82) window.location.reload();
});