let numsForCalculate = [];
let operatorVal;
let prevAnswer = null;
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
            if(numsForCalculate.length > 1){
                output.textContent = '';
                numsForCalculate = [];
                prevAnswer = null;
            }
            if (checkOperator() === true){
                removeSelectedClass();
                output.textContent = '';
            }
            output.textContent += num.textContent;
            
            
        })
    }
}
function removeSelectedClass(){
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

function checkrepeatOperation(){
    const output = document.querySelector('.output');
    if(numsForCalculate.length > 1) {
        numsForCalculate.pop()}
    else if (numsForCalculate.length === 1){
        numsForCalculate.push(+output.textContent);
        output.textContent = operate(operatorVal);
        numsForCalculate = [];
        numsForCalculate.push(output.textContent);
        return true;
    };
}
function getOperator() {
    const operators = document.querySelectorAll('.operator');
    const output = document.querySelector('.output');
    for (const operator of operators) {
        operator.addEventListener('click', () => {
            removeSelectedClass();
            operator.classList.add('selected');
            operatorVal = operator.textContent.toLowerCase();
            if (checkrepeatOperation() === true) return;
            if(prevAnswer === null){
            numsForCalculate.push(+output.textContent);
            }
        })
    }
}
document.querySelector('.clear').addEventListener('click', () => {
    numsForCalculate = [];
    prevAnswer = null;
    document.querySelector('.output').textContent = '';
    removeSelectedClass();
})
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