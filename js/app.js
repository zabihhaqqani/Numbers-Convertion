function DecimalToBinaryConverter(baseTen) {
    let binaryNumber = []

    while (baseTen > 0) {
        let rem = baseTen % 2
        binaryNumber.push(rem)
        baseTen = Math.floor(baseTen / 2)
    }

    return parseInt(binaryNumber.reverse().join(""))
}

function BinaryToDecimalConverter(baseTwo) {
    let bin = baseTwo.toString().split("")
    let power = 0
    let num = 0
     
    for (let i = bin.length - 1; i >= 0; i--) {
        num += bin[i] * (2 ** power)
        power++
    }
    
    return num
}



function BaseNumberConverter(number, base, newbase) {
    if (base == newbase) {
        return number
    }
    else if (base == 2 && newbase == 10) {
        return BinaryToDecimalConverter(number)
    }
    else if (base == 2 && newbase == 8) {
        return BinaryToOctal(number)
    }
    else if (base == 2 && newbase == 16) {
        return BinaryToHexaDecimal(number)
    }
    else if (base == 8 && newbase == 10) {
        return OctalToDecimal(number)
    }
    else if (base == 8 && newbase == 2) {
        return OctalToBinary(number)
    }
    else if (base == 8 && newbase == 16) {
        return OctalToHexaDecimal(number)
    }
    else if (base == 16 && newbase == 10) {
        return HexaDecimalToDecimal(number)
    }
    else if (base == 16 && newbase == 8) {
        return HexaDecimalToOctal(number)
    }
    else if (base == 16 && newbase == 2) {
        return HexaDecimalToBinary(number)
    }
    else if (base == 10 && newbase == 2) {
        return DecimalToBinaryConverter(number)
    }
    else if (base == 10 && newbase == 16) {
        return DecimalToHexaDecimal(number)
    }
    else if (base == 10 && newbase == 8) {
        return DecimalToOctal(number)
    }
    else {
        return false;
    }
}

const form = document.querySelector('#form');
const number = document.querySelector('.input-num');
const currentBase = document.querySelector('#currentBase');
const newBase = document.querySelector('#newBase');
let text = document.querySelector('#answer-text');
let ans;
let arr = [number, currentBase, newBase];

window.onload = () => {
    let storedData = localStorage;

    if (storedData) {
        number.value = storedData.number;
        currentBase.value = storedData.base;
        // currentBase.value = SetCurrentBase(storedData.base)
        newBase.value = storedData.newBase;
        if (validateNumbers(number.value, currentBase.value)) {
            convert();
        } else {
            number.value = '';
            currentBase.value = '2';
            newBase.value = '10';
        }
    }
    // ans = convert();
}

const Converter =  {
    isHex: (num) => {
        return Boolean(num.match(/^0x[0-9a-f]+$/i))
    },
    isOctal: (str) => /^(0o)?[0-7]+$/i.test(str),
    isBinary: (s) => {
        for (let i = 0; i < s.length; i++) {
             if (s[i] !== "0" && s[i] !== "1") {
                return false;
             }
        }
        return true;
    }
}

const validateNumbers = (num, c) => {
    if (c == 2) {
        return Converter.isBinary(num);
    }
    if (c == 8) {
        let n = '0o' + num;
        return Converter.isOctal(num);
    }
    if (c == 10) {
        return Number.isInteger(Number(num));
    }
    if (c == 16) {
        let n = '0x' + num;
        return Converter.isHex(n);
    }
}

const SetCurrentBase = (num) => {
    let value;
    if (Converter.isBinary(num)) {
        value = 2;
    } else if (Converter.isOctal(num)) {
        value = 8;
    } else if (Number.isInteger(Number(num))) {
        value = 10;
    } else if (Converter.isHex(num)) {
        value = 16;
    }
    return '' + value;
}

const obj = {
    number: '',
    base: '',
    nBase: ''
}

arr.forEach((input) => {
    input.addEventListener('input', () => {
        obj.number = number.value;
        // currentBase.value = SetCurrentBase(obj.number);
        obj.base = currentBase.value;
        obj.nBase = newBase.value;
        localStorage.setItem('number', obj.number);
        localStorage.setItem('base', obj.base);
        localStorage.setItem('newBase', obj.nBase);
    })
})

const convert = () => {
    const num = number.value;
    const oldBase = Number(currentBase.value);
    const newerBase = Number(newBase.value);

    try {
        if (validateNumbers(num, oldBase)) {
            ans = BaseNumberConverter(num, oldBase, newerBase);

            if (!ans) {
                text.innerHTML = `Can't convert that!!`
            }
            else {
                text.innerHTML = `${ans} <small class="small">${newerBase}</small>`;
            }
        }
        else {
            text.innerHTML = `Can't convert that!!`
        }
        
    } catch (error) {
        if (error instanceof RangeError) {
            text.innerHTML = `Can't convert that!!`
        }
    }
    // return BaseNumberConverter(num, oldBase, newerBase);
}

const convertBtn = document.querySelector('.convert-btn');
const resetBtn = document.querySelector('.reset-btn');
const swapBtn = document.querySelector('.swap-btn');


convertBtn.addEventListener('submit', () => {
    ans = convert();
});

const swap = (c, n) => {
    let temp = c.value;
    c.value = n.value;
    n.value = temp;
}

swapBtn.addEventListener('click', swap(currentBase, newBase));

resetBtn.addEventListener('click', () => {
    localStorage.clear();
})