let numsForCalculate = [];
let operatorVal;
let prevAnswer = null;

function multiply(x, y) {
    return Math.round((x * y) * 100000) / 100000;
}
function add(x, y) {
    return Math.round((x + y) * 100000) / 100000;
}
function divide(x, y) {
    return Math.round((x / y) * 100000) / 100000;
}
function subtract(x, y) {
    return Math.round((x - y) * 100000) / 100000;
}
function operate(operator) {
    if (operator.toLowerCase() === 'x') return multiply(numsForCalculate[0], numsForCalculate[1]);
    else if (operator.toLowerCase() === '+') return add(numsForCalculate[0], numsForCalculate[1]);
    else if (operator.toLowerCase() === '/') return divide(numsForCalculate[0], numsForCalculate[1]);
    else if (operator.toLowerCase() === '-') return subtract(numsForCalculate[0], numsForCalculate[1]);
}

function displayNums() {
    const output = document.querySelector('.output');
    const nums = document.querySelectorAll('.numpad');
    for (const num of nums) {
        num.addEventListener('click', () => {
            //starts a new operation if one was previously done
            if (numsForCalculate.length > 1) {
                output.textContent = '';
                numsForCalculate = [];
                prevAnswer = null;
            }
            //if an operator was chosen, clear the output screen and operator selection to begin logging second number
            if (checkOperator() === true) {
                removeSelectedOperator();
                output.textContent = '';
            }
            //log number in ouput
            output.textContent += num.textContent;


        })
    }
}
function removeSelectedOperator() {
    const operators = document.querySelectorAll('.operator');
    for (const op of operators) {
        op.classList.remove('selected');
    }
}
//checks to see if an operator is selected
function checkOperator() {
    const operators = document.querySelectorAll('.operator');
    for (const op of operators) {
        if (op.classList.contains('selected')) return true;
    }
    return false;
}

function checkrepeatOperation(operator) {
    const output = document.querySelector('.output');
    if (numsForCalculate.length > 1) {
        numsForCalculate.pop()
    }
    else if (numsForCalculate.length === 1) {
        numsForCalculate.push(parseFloat(output.textContent));
        output.textContent = operate(operatorVal);
        if(+output.textContent > 999999999999 || +output.textContent < -999999999999) output.textContent = operate(operatorVal).toExponential(2);
        operatorVal = operator.textContent.toLowerCase();
        numsForCalculate = [];
        numsForCalculate.push(+output.textContent);
        return true;
    };
}
function getOperator() {
    const operators = document.querySelectorAll('.operator');
    const output = document.querySelector('.output');
    for (const operator of operators) {
        operator.addEventListener('click', () => {
            if (output.textContent === '-'){
                output.textContent = '';
                return
            }
            removeSelectedOperator();
            operator.classList.add('selected');
            if (checkrepeatOperation(operator) === true) {
                return
            };
            operatorVal = operator.textContent.toLowerCase();
            if (prevAnswer === null) {
                numsForCalculate.push(+output.textContent);
            }
        })
    }
}
document.querySelector('.clear').addEventListener('click', () => {
    numsForCalculate = [];
    prevAnswer = null;
    document.querySelector('.output').textContent = '';
    removeSelectedOperator();
})
document.querySelector('.equals').addEventListener('click', () => {
    if (numsForCalculate.length > 0) {
        const output = document.querySelector('.output');
        numsForCalculate.push(+output.textContent);
        output.textContent = operate(operatorVal);
        if(+output.textContent > 999999999999 || +output.textContent < -999999999999) output.textContent = operate(operatorVal).toExponential(2);
        prevAnswer = +output.textContent;
        numsForCalculate.shift();
        numsForCalculate.unshift(prevAnswer);
        if (numsForCalculate.length > 2) {
            numsForCalculate.pop();
        }
    }
})
document.querySelector('.negative').addEventListener('click', () =>{
    let output = document.querySelector('.output');
    if(checkOperator() === false){
        if(parseFloat(output.textContent) === prevAnswer){
            numsForCalculate[0] = parseFloat(output.textContent) * -1
        }
    let negOutput = parseFloat(output.textContent) * -1;
    output.textContent = negOutput;
    }
    else{
        output.textContent = '-';
        removeSelectedOperator();
    }
})

document.querySelector('.percent').addEventListener('click', () =>{
    let output = document.querySelector('.output');
    
        if(parseFloat(output.textContent) === prevAnswer){
            numsForCalculate[0] = parseFloat(output.textContent) / 100;
        }
    let negOutput = parseFloat(output.textContent) / 100;
    output.textContent = negOutput;
    
  
    removeSelectedOperator();
    
})
displayNums();
getOperator();