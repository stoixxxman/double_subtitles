const ttsAndWrite = require('./callTtsAndWriteTxt.js');
const arrFrequency = require('./wordsFromSub.js');
var fs = require('fs');
const tts = require('./googleTTS.js');
const nlp = require('compromise');
nlp.extend(require('compromise-adjectives'));
nlp.extend(require('compromise-ngrams'));

function fromSrt(parsedSubs, parseUserWords) {
    var arrWords = [];
    let subText = [];
    let wholeText = '';
    let editText = [];
    let allWords = '';

    for (let i = 0; i < parsedSubs.length; i += 1) {
        subText = parsedSubs[i].text;
        subText = subText.replace(/<i>/gi, '').replace(/<\/i>/gi, '').replace(/\r?\n/g, ' ').replace(/ {1,}/g, ' ').replace(/^\s*/, '').replace(/\s*$/, '');
        wholeText = wholeText + subText + ' ';
    }
    wholeText = wholeText.replace(/[^a-zA-Z ?,.']/g, '');
    const nlpWholeText = nlp(wholeText);
    const ngramsForWholeText = nlp(wholeText);
    
    console.log(nlp(wholeText).ngrams({ size: 4 }));

    nlpWholeText.verbs().toInfinitive();
    nlpWholeText.nouns().toSingular();
    let termSortByLengthAndFreq = nlpWholeText.terms().sort((a, b) => {
        //sort by length of normalized text
        if (a.text('reduced').length > b.text('reduced').length) {
            return -1
        }
        return 1
    }).out('freq').map((d) => {
        if (d.reduced.length > 3) {
            return d;
        }

    }).filter(function (item) {
        return item != undefined && !parseUserWords.includes(item.reduced); 
            
    });
    

    fs.appendFileSync('./sourse/File 1 wholeText.txt', `$`);
    fs.appendFileSync('./sourse/File 2 subsInCourse.txt', `$`);
    fs.appendFileSync('./sourse/File 3 ngrams.txt', `$`);

    fs.appendFileSync('./sourse/ngramsForWholeText.txt', `${ngramsForWholeText}`);
    fs.appendFileSync('./sourse/termSortByLength.txt', `${termSortByLengthAndFreq.map(d => d.reduced)}`);


}

module.exports.fromSrt = fromSrt;
const defaults = {
    trim: false,          // remove leading/trailing whitespace
    whitespace: false,    // tabs, double-spaces
    unicode: false,       // ü → u
    lowercase: false,     // co-erce everything to lowercase
    titlecase: false,     // titlecase proper-nouns, acronyms, sentence-starts
    punctuation: false,   // '?!' → ?
    acronyms: false,      // F.B.I. → FBI
    abbreviations: false, // Mrs. → Mrs
    implicit: false,      // didn't → 'did not'
}