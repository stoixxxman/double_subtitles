const ttsAndWrite = require('./callTtsAndWriteTxt.js');
const arrFrequency = require('./wordsFromSub.js');
var fs = require('fs');
const tts = require('./googleTTS.js');
const nlp = require('compromise');
nlp.extend(require('compromise-adjectives'));

function fromSrt(parsedSubs, parseUserWords) {
    var arrWords = [];
    let subText = [];
    let wholeText = '';
    let editText = [];
    let allWords = '';
    let helfPhraseOne = '';
    let helfPhraseTwo = '';
    let arrRemovedWords = [];
    for (let i = 0; i < parsedSubs.length; i += 1) {
        subText = parsedSubs[i].text;
        subText = subText.replace(/<i>/gi, '').replace(/<\/i>/gi, '').replace(/\r?\n/g, ' ').replace(/ {1,}/g, ' ').replace(/^\s*/, '').replace(/\s*$/, '');
        wholeText = wholeText + subText + ' ';
    }
    wholeText = wholeText.replace(/[^a-zA-Z ?,.']/g, '');
    let arrSentence = [];
    let arrPhrase = wholeText.split(/[.,?!]/);

    arrPhrase = arrPhrase.map((phrase) => {
        phrase = phrase.replace(/^\s*/, '').replace(/\s*$/, '');
        arrWords = phrase.split(' ');
        for (const i in arrWords) {
            arrWords[i] = arrWords[i].replace().replace(/\'(.*)\w/,'').replace(/^\s*/, '').replace(/\s*$/, '').toLowerCase();
            let iWord = nlp(arrWords[i]);
            iWord.verbs().toInfinitive();
            iWord.nouns().toSingular();
            arrWords[i]= iWord.text();    
            
            if (phrase.split(' ').length > 4) {
                let middle = Math.floor(phrase.length / 2);
                let before = phrase.lastIndexOf(' ', middle);
                let after = phrase.indexOf(' ', middle + 1);

                if (middle - before < after - middle) {
                    middle = before;
                } else {
                    middle = after;
                }

                helfPhraseOne = phrase.substr(0, middle);
                helfPhraseTwo = phrase.substr(middle + 1);
            }
            if (!parseUserWords.includes(arrWords[i]) && !editText.includes(phrase)) {
                if (arrWords.length <= 4) {
                    //console.log(arrWords[i], '\n', phrase);
                    editText.push(phrase);
                    
                }
                else if (!parseUserWords.includes(arrWords[i]) && !editText.includes(helfPhraseOne) && !editText.includes(helfPhraseTwo)) {
                    //console.log(arrWords[i], '\n', 'Part 1 : ', helfPhraseOne, 'Part 2 : ', helfPhraseTwo);
                    editText.push(helfPhraseOne);
                    editText.push(helfPhraseTwo);
                    
                }
            }
        }


    });

    console.log(wholeText,'\n',editText);
    fs.appendFileSync('./sourse/wholeText.txt', `${editText}`);
    let frequ = arrFrequency.getFrequency2(allWords, 20);
    fs.appendFileSync('./sourse/mp3/output/frequWords.txt', frequ);
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

module.exports.fromSrt = fromSrt;