const { parse, stringify } = require('subtitle');
const unique = require('unique-words');
var fs = require('fs'), filename = process.argv[2];
const tts = require('./googleTTS.js');
const callTts = require('./callTtsIfLengthSub.js');

if (process.argv.length < 3) {
    console.log('Usage: node ' + process.argv[1] + ' FILENAME');
    process.exit(1);
  }
  
  let cleanedArray = [];
  let parsedSubs = [];
  let sub = [];
  
  fs.appendFileSync('./sourse/mp3/startGlue.bat', `ffmpeg  -f concat -i glueAudioFFMPEG.bat -auto_convert 1 1output.m4a`);
  
 
  fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err;
    parsedSubs = parse(data);
    let wordsFromSub = []; 
    var arrEl = [];
    for (let i = 0; i < parsedSubs.length; i += 1) {
        sub = parsedSubs[i].text;
        sub = sub.replace(/<i>/gi, '').replace(/<\/i>/gi, '').replace(/\r?\n/g, ' ').replace(/\W/gm,' ').replace(/ {1,}/g,' ').replace(/^\s*/,'').replace(/\s*$/,'');
       
        const arrayOfWords = sub.split(/[' '|'\n'|.|!|?|,"]/i);
        //console.log(arrayOfWords);
        wordsFromSub = arrayOfWords.map((el) => {
        el = el.replace(/[\,\.\/\!\<\?\>\"\♪\-]/gi, '').toLowerCase();
        if(el != '' & el != 's' & el != 'a' & el != 'i' & el != 'll' & el != 't' & arrEl.indexOf(el) == -1 ){
            console.log(el);
            arrEl.push(el);
            tts(el);
            fs.appendFileSync('./sourse/sortCleanedArray.txt', `${el} \n`);
            fs.appendFileSync('./sourse/mp3/trackWithSilence.bat', `ffmpeg -i "${el}.mp3" -af "apad=pad_dur=2" ${el}.m4a \n`);
            fs.appendFileSync('./sourse/mp3/glueAudioFFMPEG.bat', `file ${el}.m4a \n`);
            return el;
        };
        });
        const lengthSub = sub.match(/\S+?\s|\S+?$/g).length;
        callTts(lengthSub, arrayOfWords);
        tts(sub);
        const subWithoutMarks = sub.replace(/\W/gm,' ').replace(/^\s*/,'').replace(/\s*$/,'');
        fs.appendFileSync('./sourse/sortCleanedArray.txt', `${subWithoutMarks} \n`);
        fs.appendFileSync('./sourse/mp3/trackWithSilence.bat', `ffmpeg -i "${subWithoutMarks}.mp3" -af "apad=pad_dur=4" "${subWithoutMarks}.m4a" \n`);
        fs.appendFileSync('./sourse/mp3/glueAudioFFMPEG.bat', `file ${subWithoutMarks}.m4a \n`);
        fs.appendFileSync('./sourse/sortCleanedArray.txt', `\n`);
        console.log (sub);
        wordsFromSub = unique(wordsFromSub);
        cleanedArray[i] = wordsFromSub;
    }
  
  cleanedArray = unique(cleanedArray);
  let sortCleanedArray = cleanedArray;
  
  /*sortCleanedArray.sort(function(a, b){
    // ASC  -> a.length - b.length
    // DESC -> b.length - a.length
    return b.length - a.length;
  });*/
  
})
