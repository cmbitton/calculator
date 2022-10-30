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
function operate(operator) {
    if (operator.toLowerCase() === 'x') return multiply(numsForCalculate[0], numsForCalculate[1]);
    if (operator.toLowerCase() === '+') return add(numsForCalculate[0], numsForCalculate[1]);
    if (operator.toLowerCase() === '/') return divide(numsForCalculate[0], numsForCalculate[1]);
}

function displayNums() {
    const output = document.querySelector('.output');
    const nums = document.querySelectorAll('.numpad');
    for (const num of nums) {
        num.addEventListener('click', () => {
            if (numsForCalculate.length > 1) {
                output.textContent = '';
                numsForCalculate = [];
                prevAnswer = null;
            }
            if (checkOperator() === true) {
                removeSelectedClass();
                output.textContent = '';
            }
            output.textContent += num.textContent;


        })
    }
}
function removeSelectedClass() {
    const operators = document.querySelectorAll('.operator');
    for (const op of operators) {
        op.classList.remove('selected');
    }
}
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
        numsForCalculate.push(+output.textContent);
        output.textContent = operate(operatorVal);
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
            removeSelectedClass();
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
    removeSelectedClass();
})
document.querySelector('.equals').addEventListener('click', () => {
    if (numsForCalculate.length > 0) {
        const output = document.querySelector('.output');
        numsForCalculate.push(+output.textContent);
        output.textContent = operate(operatorVal);
        prevAnswer = +output.textContent;
        numsForCalculate.shift();
        numsForCalculate.unshift(prevAnswer);
        if (numsForCalculate.length > 2) {
            numsForCalculate.pop();
        }
    }
})

displayNums();
getOperator();