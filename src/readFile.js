const { parse, stringify } = require('subtitle');
const unique = require('unique-words');
var fs = require('fs'), inputFile = process.argv[2], userVocab = process.argv[3];
var natural = require('natural');
const callTts = require('./callTtsIfLengthSub.js');
const tts = require('./callTtsAndWriteTxt.js');

const dataParse = require('./textParse.js');
var path = require('path');

var NGrams = natural.NGrams;

if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}

fs.appendFileSync('./sourse/mp3/startGlueAll.bat', `ffmpeg  -f concat -i glueAudioFFMPEG.txt -auto_convert 1 output/all.m4a`);
fs.appendFileSync('./sourse/mp3/topWords.bat', `ffmpeg  -f concat -i topWords.txt -auto_convert 1 output/topWords.m4a`);

fs.readFile(userVocab, 'utf8', function (err, data) {
  if (err) throw err;
  parseUserWords = data.toString().split("\r\n");
});
let parsedSubs = [];

fs.readFile(inputFile, 'utf8', function (err, data) {
  if (err) throw err;
  if(path.extname(inputFile) == '.srt'){
    parsedSubs = parse(data);
    dataParse.fromSrt(parsedSubs);
  }
  else if(path.extname(inputFile) == '.txt'){
    parsedSubs = parse(data);
  }
  console.log(data);
  
  
  
 

  //tts.forWholeText(textFromSrt);
});