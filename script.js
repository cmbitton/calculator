let numsForCalculate = [];
let operatorVal;
let prevAnswer;
function multiply(x, y) {
    return x * y;
}
function operate(operator) {
    if (operator.toLowerCase() === 'x') return multiply(numsForCalculate[0], numsForCalculate[1]);
}

function displayNums() {
    const output = document.querySelector('.output');
    const nums = document.querySelectorAll('.numpad');
    for (const num of nums) {
        num.addEventListener('click', () => {
            if (checkOperator() === true){
                removeOperator();
                output.textContent = '';
            }
            output.textContent += num.textContent;
            
            
        })
    }
}
function removeOperator(){
    const operators = document.querySelectorAll('.operator');
    for (const op of operators) {
        op.classList.remove('selected');
    }
}
function checkOperator(){
    const operators = document.querySelectorAll('.operator');
    for (const op of operators) {
        if (op.classList.contains('selected')) return true;
    }
    return false;
}

function getOperator() {
    const operators = document.querySelectorAll('.operator');
    const output = document.querySelector('.output');
    for (const operator of operators) {
        operator.addEventListener('click', () => {
            if(numsForCalculate.length > 1) numsForCalculate.pop();
            removeOperator();
            operator.classList.add('selected');
            operatorVal = operator.textContent.toLowerCase();
            if(prevAnswer === undefined){
            numsForCalculate.push(+output.textContent);
            }
        })
    }
}

document.querySelector('.equals').addEventListener('click', () => {
    const output = document.querySelector('.output');

    numsForCalculate.push(+output.textContent);
    
    output.textContent = operate(operatorVal);
    prevAnswer = +output.textContent;
    numsForCalculate.shift();
    numsForCalculate.unshift(prevAnswer);
    if(numsForCalculate.length > 2){
        numsForCalculate.pop();
    }
})

displayNums();
getOperator();