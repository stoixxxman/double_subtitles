const ttsAndWrite = require('./callTtsAndWriteTxt.js');
const arrFrequency = require('./wordsFromSub.js');
var fs = require('fs');
const tts = require('./googleTTS.js');
const nlp = require('compromise');
nlp.extend(require('compromise-adjectives'));
nlp.extend(require('compromise-ngrams'));
nlp.extend(require('compromise-sentences'))

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
    wholeText = wholeText.replace(/[^a-zA-Z ?,.!']/g, '');
    const nlpWholeText = nlp(wholeText);
    let ngramsForWholeText = nlp(wholeText);
    ngramsForWholeText.verbs().toInfinitive();
    ngramsForWholeText.nouns().toSingular();
    ngramsForWholeText.ngrams({size: 3}).map(ng => {
        return ng.normal.normalize();
    });
    
    nlpWholeText.verbs().toInfinitive();
    nlpWholeText.nouns().toSingular();
    let termSortByLengthAndFreq = nlpWholeText.unigrams().filter(function (item) {
        return item != undefined && !parseUserWords.includes(item.normal) && item.normal.length > 3;     
    }).map(el => {
        return tts(el.normal);
    });
    

    console.log(ngramsForWholeText);

    fs.appendFileSync('./sourse/File 1 wholeText.txt', `${wholeText}`);
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