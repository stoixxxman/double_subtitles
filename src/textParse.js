const tts = require('./callTtsAndWriteTxt.js');
const arrFrequency = require('./frequency.js');
var fs = require('fs');

function fromSrt(parsedSubs) {
    var arrWords = [];
    let sub = [];
    let parseUserWords = [];
    let textFromSrt = '';
    let allWords = '';
    for (let i = 0; i < parsedSubs.length; i += 1) {
        sub = parsedSubs[i].text;
        sub = sub.replace(/<i>/gi, '').replace(/<\/i>/gi, '').replace(/\r?\n/g, ' ').replace(/ {1,}/g, ' ').replace(/^\s*/, '').replace(/\s*$/, '');
        textFromSrt = textFromSrt + sub + ' ';
        sub = sub.replace(/\W/gm, ' ').replace(/^\s*/, '').replace(/\s*$/, '');
        const arrayOfWords = sub.split(/\W/i);
        wordsFromSub = arrayOfWords.map((word) => {
            word = word.replace(/\W/gm, '').toLowerCase();
            if (word.length >= 3 & parseUserWords.indexOf(word) == -1) {
                allWords = allWords + word + ' ';
                if (arrWords.indexOf(word) == -1) {
                    arrWords.push(word);
                    tts.forWord(word);
                    return word;
                };
            } else if (parseUserWords.indexOf(word) !== -1) { console.log('Слова которые удалены: ', word, ' '); }
        });
        //callTts(arrayOfWords);
    }
    fs.appendFileSync('./sourse/textFromSrt.txt', `${textFromSrt}`);
    let frequ = arrFrequency(allWords, 20);
    let topWords = [];
    topWords = arrWords;
    topWords.sort(function (a, b) {
        return b.length - a.length;
    });

    let times = 2;
    topWords.map((word) => {
        for (let i = 1; i <= times; i = i + 1) {
            fs.appendFileSync('./sourse/mp3/topWords.txt', `file ${word}.m4a \n`);
            fs.appendFileSync('./sourse/mp3/output/topWords.txt', `${word} \n`);
        }
    });
}

function fromTxt() {

}
module.exports.fromSrt = fromSrt;