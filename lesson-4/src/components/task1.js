'use strict';

function regExpText() {
    const sourceText = document.querySelector('#source').value;
    const regExpAllPoints = /\'/gm;
    const regExpApos = /\b\"\b/gm;
    let newStr = sourceText.replace(regExpAllPoints, '"');
    newStr = newStr.replace(regExpApos, '\'');
    document.querySelector('#output').value = newStr;
}

document.querySelector('#source').addEventListener('keyup', regExpText);

