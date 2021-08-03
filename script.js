const digitBtn = document.querySelectorAll('.btn-input');
const opBtn = document.querySelectorAll('.btn-op');
const ctrlBtn = document.querySelectorAll('.btn-ctrl');
const disp = document.querySelector('#display');
const maxLength = 11;
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
    if(disp.textContent === '.') disp.textContent = '0.';
}

function evaluate(){
    if(num1 === '' || op === '') return;
    reset = true;
    num2 = disp.textContent;
    num1 = operate(op, num1, num2);
    
    if(isNaN(num1) || num1 === undefined) return disp.textContent = 'Error';
    if(num1 === null) return disp.textContent = '>:(';
    if(num1 === Infinity) return disp.textContent = 'Big BOIIII!!!';
    
    if(isDecimal(num1)) num1 = roundDec(num1, decPrec);
    if(num1.toString().length > maxLength) num1 = resize(num1);
    
    display(num1);
}

function resize(x){
    let str = x.toString();

    if(isDecimal(x)){
        let y = str.length - maxLength+1;
        str = str.split('.');
        x = roundDec(x, str[1].length - y);
        return x;
    }

    if(str.indexOf('e') === -1) str = x.toExponential();
    str = str.split('e');
    x = roundDec(str[0], 5);
    x += 'e' + str[1];
    return x;
}

function roundDec(x, p){
    p = Math.pow(10, p);
    return Math.round(x * p) / p;
}

function isDecimal(x){
    if(x%1 === 0) return false;
    return true;
}

function clear(){
    num1 = '';
    num2 = '';
    op = '';
}

function allClear(){
    clear();
    disp.textContent = '0';
    console.log(reset);
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

function delLast(str){
    return str.substring(0, str.length - 1);
}

digitBtn.forEach(btn => btn.addEventListener('click', () => {
    if(!reset){
        if(disp.textContent.length > maxLength) return;
        if(disp.textContent.indexOf('.') !== -1 && btn.textContent === '.') return;
    }
    if(disp.textContent === '0') reset = true;
    display(btn.textContent);
}));

opBtn.forEach(btn => btn.addEventListener('click', () => {
    if(!reset){
        if(num1 === '') num1 = disp.textContent;
        if(op !== '') evaluate();
        num2 = '';
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