const { parse, stringify } = require('subtitle');
const unique = require('unique-words');
var fs = require('fs'), srtFile = process.argv[2], userVocab = process.argv[3];
const tts = require('./googleTTS.js');
//const funStdin = require('./funStdin.js');
const callTts = require('./callTtsIfLengthSub.js');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}


let cleanedArray = [];
let sub = [];
let parseUserWords = [];
fs.appendFileSync('./sourse/mp3/startGlueAll.bat', `ffmpeg  -f concat -i glueAudioFFMPEG.txt -auto_convert 1 output/all.m4a`);
fs.appendFileSync('./sourse/mp3/topWords.bat', `ffmpeg  -f concat -i topWords.txt -auto_convert 1 output/topWords.m4a`);


fs.readFile(userVocab, 'utf8', function (err, data) {
  if (err) throw err;
  parseUserWords = data.toString().split("\r\n");
});
let parsedSubs = [];
let wordsFromSub = [];
var arrWords = [];
fs.readFile(srtFile, 'utf8', function (err, data) {
  if (err) throw err;
  parsedSubs = parse(data);
  let topWords = [];
  for (let i = 0; i < parsedSubs.length; i += 1) {
    sub = parsedSubs[i].text;
    sub = sub.replace(/<i>/gi, '').replace(/<\/i>/gi, '').replace(/\r?\n/g, ' ').replace(/\W/gm, ' ').replace(/ {1,}/g, ' ').replace(/^\s*/, '').replace(/\s*$/, '');
    const arrayOfWords = sub.split(/[' '|'\n'|.|!|?|,"]/i);
    sub = sub.replace(/\W/gm, ' ').replace(/^\s*/, '').replace(/\s*$/, '');
    const subWith_ = sub.replace(/ /gm, '_');
    let phrase = ''; 
    wordsFromSub = arrayOfWords.map((el) => {
      el = el.replace(/[\,\.\/\!\<\?\>\"\♪\-]/gi, '').toLowerCase();
      if (el.length >= 3 & arrWords.indexOf(el) == -1 & parseUserWords.indexOf(el) == -1 ) {
        arrWords.push(el);
        tts(el);
        fs.appendFileSync('./sourse/sortCleanedArray.txt', `${el} \n`);
        fs.appendFileSync('./sourse/mp3/newWords.txt', `file ${el}.m4a \n`);
        fs.appendFileSync('./sourse/mp3/trackWithSilence.bat', `ffmpeg -i "${el}.mp3" -af "apad=pad_dur=2" ${el}.m4a \n`);
        fs.appendFileSync('./sourse/mp3/glueAudioFFMPEG.txt', `file ${el}.m4a \n`);
        return el;
      };
    });  
    callTts(arrayOfWords);
  } 
  topWords = arrWords;
  topWords.sort(function(a, b){
    return b.length - a.length;
  });
  let times;
   rl.question('how much times would you like repeat? ', (answer) => {
    times = answer;
    console.log(`repeat: ${answer} times`);
    topWords.map((word) => {
      for(let i = 1; i <= times; i = i + 1){
        fs.appendFileSync('./sourse/mp3/topWords.txt', `file ${word}.m4a \n`);
        fs.appendFileSync('./sourse/mp3/output/topWords.txt', `${word} \n`);
      }        
    });
    rl.close();
  }); 
});