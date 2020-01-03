const { parse, stringify } = require('subtitle');
const unique = require('unique-words');
var fs = require('fs'), srtFile = process.argv[2], userVocab = process.argv[3];
const tts = require('./googleTTS.js');
const callTts = require('./callTtsIfLengthSub.js');

if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}

let cleanedArray = [];
let parsedSubs = [];
let sub = [];
let parseUserWords = [];
fs.appendFileSync('./sourse/mp3/startGlue.bat', `ffmpeg  -f concat -i glueAudioFFMPEG.bat -auto_convert 1 1output.m4a`);
fs.readFile(userVocab, 'utf8', function (err, data) {
  if (err) throw err;
  parseUserWords = data.toString().split("\r\n");
  console.log(parseUserWords);
});

fs.readFile(srtFile, 'utf8', function (err, data) {
  if (err) throw err;
  parsedSubs = parse(data);
  let wordsFromSub = [];
  var arrEl = [];
  for (let i = 0; i < parsedSubs.length; i += 1) {
    sub = parsedSubs[i].text;
    sub = sub.replace(/<i>/gi, '').replace(/<\/i>/gi, '').replace(/\r?\n/g, ' ').replace(/\W/gm, ' ').replace(/ {1,}/g, ' ').replace(/^\s*/, '').replace(/\s*$/, '');
    const arrayOfWords = sub.split(/[' '|'\n'|.|!|?|,"]/i);
    sub = sub.replace(/\W/gm, ' ').replace(/^\s*/, '').replace(/\s*$/, '');
    const subWith_ = sub.replace(/ /gm, '_');
    let phrase = '';
    wordsFromSub = arrayOfWords.map((el) => {
      el = el.replace(/[\,\.\/\!\<\?\>\"\♪\-]/gi, '').toLowerCase();
      if (el.length >= 3 & arrEl.indexOf(el) == -1 & parseUserWords.indexOf(el) == -1 ) {
        arrEl.push(el);
        tts(el);
        fs.appendFileSync('./sourse/sortCleanedArray.txt', `${el} \n`);
        fs.appendFileSync('./sourse/mp3/newWords.txt', `file ${el}.m4a \n`);
        fs.appendFileSync('./sourse/mp3/trackWithSilence.bat', `ffmpeg -i "${el}.mp3" -af "apad=pad_dur=2" ${el}.m4a \n`);
        fs.appendFileSync('./sourse/mp3/glueAudioFFMPEG.bat', `file ${el}.m4a \n`);
        console.log(el, el.substring(el.length - 1, el.length) );
        word = el;
        phrase = phrase + word;
        if(sub.includes(phrase) == true & phrase.match(/\S+?\s|\S+?$/g).length >= 2){
          console.log('YES');
          const lengthSub = sub.match(/\S+?\s|\S+?$/g).length;
          phraseWith_ = phrase.replace(' ', '_')
          //callTts(lengthSub, arrayOfWords);
          tts(phrase);
          fs.appendFileSync('./sourse/sortCleanedArray.txt', `${phrase} \n`);
          fs.appendFileSync('./sourse/mp3/trackWithSilence.bat', `ffmpeg -i "${phrase}.mp3" -af "apad=pad_dur=4" "${phraseWith_}.m4a" \n`);
          fs.appendFileSync('./sourse/mp3/glueAudioFFMPEG.bat', `file ${phraseWith_}.m4a \n`);
          fs.appendFileSync('./sourse/sortCleanedArray.txt', `\n`);
          
        }else {console.log('error');}
        return el;
      };
    });
    
    wordsFromSub = unique(wordsFromSub);
    cleanedArray[i] = wordsFromSub;
  } 
});
  /*
  cleanedArray = unique(cleanedArray);
  let sortCleanedArray = cleanedArray;
  
  sortCleanedArray.sort(function(a, b){
    // ASC  -> a.length - b.length
    // DESC -> b.length - a.length
    return b.length - a.length;
  });*/



