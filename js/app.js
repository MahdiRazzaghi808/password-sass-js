const upperWord = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const lowerWord = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const symbols = ["~", "!", "@", "#", "$", "%", "^", "&", "*", "{", "}", "(", ")", "+", "-", "/", ":", ";", "_", ".", ",", "=", "?", ">", "<"];

let passwordLength = 6;
let upperCaseFlag = true;
let lowerCaseFlag = true;
let numbersFlag = true;
let symbolsFlag = true;
let array = [];

let showInput = document.querySelector(".show>input");
let aginGeneratorBtn = document.querySelector(".agin");
let copyBtn = document.querySelector(".copy");
let progress = document.querySelector(".progress>div");



aginGeneratorBtn.addEventListener("click", () => {
    mainGenerator(passwordLength)
})

copyBtn.addEventListener("click", () => {
    const toCopy = showInput.value
    navigator.clipboard.writeText(toCopy);
    iziToast.success({
        title: 'Copy',
        message: "This text was copied to the clipboard"
    });
})













function mainGenerator(length) {
    array = []
    let randomIndex = null;

    while (true) {

        if (array.length === length) {
            break;
        }

        if (lowerCaseFlag) {
            randomIndex = random(lowerWord.length)
            array.push(lowerWord[randomIndex])
        }

        if (upperCaseFlag && array.length < length) {
            randomIndex = random(upperWord.length)
            array.push(upperWord[randomIndex])
        }

        if (numbersFlag && array.length < length) {
            randomIndex = random(numbers.length)
            array.push(numbers[randomIndex])
        }
        if (symbolsFlag && array.length < length) {
            randomIndex = random(symbols.length)
            array.push(symbols[randomIndex])
        }

    }

    progressFunction()
    showInput.value = randomWordsList(randomNoRepetition(length), array).join('')
}




[...document.querySelectorAll(".change")].forEach(elem => {
    elem.addEventListener("change", generate);
})







let checkboxAction = null;
function generate(event) {
    const setSettingPass = event.target.value;




    if (+setSettingPass) {
        lengthFunction(+setSettingPass);
    } else {

        switch (setSettingPass) {
            case "uppercase": upperCaseFunction()
                break;
            case "lowercase": lowerCaseFunction()
                break;
            case "numbers": numbersFunction()
                break;
            case "symbols": symbolsFunction()
                break;
        }

        let flagsCount = upperCaseFlag + lowerCaseFlag + numbersFlag + symbolsFlag;



        if (flagsCount > 1) {
            mainGenerator(passwordLength);
            if (checkboxAction) {
                checkboxAction.disabled = false;
            }
        } else {
            [...optionsActive] = document.querySelectorAll("input[checked]")
            optionsActive.forEach(value => {
                if (value.checked) {
                    checkboxAction = value
                    value.disabled = true;
                    mainGenerator(passwordLength);
                }
            })

        }

    }




}






function lengthFunction(value) {
    if (value >= 4 && value < 100) {
        passwordLength = value;
        mainGenerator(passwordLength)
    } else {
        value = 4;
        [...document.querySelectorAll(".change")][0].value = 4;
        iziToast.error({
            title: 'Error',
            message: 'The input length is not allowed',
        });
    }
}

function upperCaseFunction() {
    upperCaseFlag ? upperCaseFlag = false : upperCaseFlag = true;
}

function lowerCaseFunction() {
    lowerCaseFlag ? lowerCaseFlag = false : lowerCaseFlag = true;
}

function numbersFunction() {
    numbersFlag ? numbersFlag = false : numbersFlag = true;
}

function symbolsFunction() {
    symbolsFlag ? symbolsFlag = false : symbolsFlag = true;
}


function progressFunction() {

    let flagsCount = upperCaseFlag + lowerCaseFlag + numbersFlag + symbolsFlag

    if (passwordLength > 20 && flagsCount === 4) {
        progress.style.backgroundColor = "#267815";
        progress.style.width = "99.5%";
    } else if (passwordLength >= 12 && flagsCount === 4) {
        progress.style.backgroundColor = "#267815";
        progress.style.width = "95%";
    } else if (passwordLength >= 10 && flagsCount >= 3) {
        progress.style.backgroundColor = "#3cb824";
        progress.style.width = "75%";
    } else if (passwordLength >= 8 && flagsCount >= 3) {
        progress.style.backgroundColor = "#f7d334";
        progress.style.width = "50%";
    } else if (passwordLength >= 6 && flagsCount >= 2) {
        progress.style.backgroundColor = "#f4471d";
        progress.style.width = "35%";
    } else if (passwordLength >= 4 && flagsCount >= 2) {
        progress.style.backgroundColor = "#ed2121";
        progress.style.width = "20%";
    } else {
        progress.style.backgroundColor = "red";
        progress.style.width = "10%";
    }







}




function random(length) {
    return Math.floor(Math.random() * length);
}



function randomNoRepetition(length) {
    let randomArray = [];
    while (randomArray.length < length) {
        let randomNumber = Math.floor(Math.random() * length);
        !randomArray.includes(randomNumber) ? randomArray.push(randomNumber) : null;
    }
    return randomArray
}


function randomWordsList(randomNumberArray, passwordArray) {
    let randomWordsList = [];
    randomNumberArray.forEach(value => {
        randomWordsList.push(passwordArray[value]);
    })
    return randomWordsList
}


window.addEventListener("load", () => {
    mainGenerator(6)
})

