const digitBtn = document.querySelectorAll('.btn-digit');
const opBtn = document.querySelectorAll('.btn-op');
const ctrlBtn = document.querySelectorAll('.btn-ctrl');
const buttons = document.querySelectorAll('button');
const disp = document.querySelector('#display');
const maxLength = 15;
const ctrlMap = ['Enter', 'c', 'Backspace'];
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

function percent(x, y){
    return x * y / 100;
}

function operate(oper, x, y){
    x = +x;
    y = +y;

    const operations =
    {'+': add(x, y),
     '-': subtract(x, y),
     '*': multiply(x, y),
     '/': divide(x, y),
     '%': percent(x, y)};

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
    if(!num1 || !op) return;

    reset = true;
    num2 = disp.textContent;
    num1 = operate(op, num1, num2);

    if(isNaN(num1) || num1 === undefined) return disp.textContent = 'Error';
    if(num1 === null) return disp.textContent = '>:(';
    if(num1 === Infinity) return disp.textContent = 'Big BOIIII!!!';
    if(num1.toString().length >= maxLength) num1 = resize(num1);
    
    display(num1); 
}

function resize(x){
    let str = x.toString();

    if(isDecimal(x)){
        const y = str.length - maxLength;
        const arr = str.split('.');
        if(arr[0].length <= maxLength)
            return roundDec(x, arr[1].length - y);
    }

    if(str.indexOf('e') === -1) str = x.toExponential();
    str = str.split('e');
    x = roundDec(str[0], maxLength - 7);
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
}

function del(){
    disp.textContent = delLast(disp.textContent);

    if(disp.textContent[disp.textContent.length-1] === '.')
        disp.textContent = delLast(disp.textContent);

    if(!disp.textContent || disp.textContent === '-0' || disp.textContent === '-') 
        disp.textContent = '0';
}

function delLast(str){
    return str.substring(0, str.length - 1);
}

function convertCtrl(key){
    if(key === 'Enter') return '=';
    if(key === 'c') return 'C';
    return 'DEL'
}

function handleDigit(btn){
    if(!reset){
        if(disp.textContent.length >= maxLength) return;
        if(disp.textContent.indexOf('.') !== -1 && btn === '.') return;
    }
    if(disp.textContent === '0') reset = true;

    display(btn);
}

function handleOp(btn){
    if(!reset){
        if(!num1) num1 = disp.textContent;
        if(op) evaluate();
        op = btn;
    }   
    reset = true;
}

function handleCtrl(btn){
    if(btn === '='){
        if(reset) return;
        evaluate();
        clear();
    }
    else if(btn === 'C') allClear();
    else del();
}

function handleKey(e){
    const opMap = ['+', '-', '*', '/', '%'];

    if(e.key >= '0' && e.key <= '9' || e.key === '.') handleDigit(e.key);
    else if(opMap.indexOf(e.key) !== -1) handleOp(e.key);
    else if(ctrlMap.indexOf(e.key) !== -1) handleCtrl(convertCtrl(e.key));
}

function keyDown(e, btn){
    if(e.key === '=') return;

    let key = e.key;

    if(ctrlMap.indexOf(key) !== -1)
        key = convertCtrl(key); 

    if(btn.textContent === key){
        btn.classList.add('hover');
        handleKey(e);
    }
}

function keyUp(e, btn){
    let key = e.key;

    if(ctrlMap.indexOf(key) !== -1)
        key = convertCtrl(key);
        
    if(btn.textContent === key)
        btn.classList.remove('hover'); 
}

digitBtn.forEach(btn => btn.addEventListener('click', () => handleDigit(btn.textContent)));

opBtn.forEach(btn => btn.addEventListener('click', () => handleOp(btn.textContent)));

ctrlBtn.forEach(btn => btn.addEventListener('click', () => handleCtrl(btn.textContent)));

buttons.forEach(btn => {
    btn.addEventListener('mouseover', () => btn.classList.add('hover'));
    btn.addEventListener('mouseout', () => btn.classList.remove('hover'));
    document.addEventListener('keydown', e => keyDown(e, btn));
    document.addEventListener('keyup', e => keyUp(e, btn));
});