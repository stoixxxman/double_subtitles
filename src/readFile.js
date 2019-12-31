const { parse, stringify } = require('subtitle');
const unique = require('unique-words');
var fs = require('fs'), filename = process.argv[2];
const tts = require('./googleTTS.js');

if (process.argv.length < 3) {
    console.log('Usage: node ' + process.argv[1] + ' FILENAME');
    process.exit(1);
  }
  
  let cleanedArray = [];
  let parsedSubs = [];
  let phrase = [];
  let forOutCleanArray = [];
  let phraseArray = [];
  fs.appendFileSync('./sourse/mp3/pronunciation-finder.bat', `pronunciation-finder `);
  fs.appendFileSync('./sourse/mp3/trackWithSilence.bat', `ffmpeg \-f lavfi \-i aevalsrc=0:duration=2 \-ab 320k silence.mp3 \n`);
 
  fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err;
    parsedSubs = parse(data);
    let wordsFromSub = []; 
    var arrEl = [];
    for (let i = 0; i < parsedSubs.length; i += 1) {
        phrase = parsedSubs[i].text;
        phrase = phrase.replace(/<i>/gi, '').replace(/<\/i>/gi, '').replace(/\\n\'/gi, ' ').replace(/[^\w ]/gi, '');
        let contrlPhrase = phrase.replace(/ /gi,'_');
        tts(phrase);
        phraseArray[i] = phrase;
        const arrayOfWords = phrase.split(/[' '|'\n'|.|!|?|,]/i); 
        wordsFromSub = arrayOfWords.map((el) => {
        el = el.replace(/[\,\.\/\!\<\?\>\"\♪\-]/gi, '').toLowerCase();
        if(el != '' & el != 's' & el != 'a' & el != 'i' & el != 'll' & el != 't' & arrEl.indexOf(el) == -1 ){
            console.log(el);
            arrEl.push(el);
            tts(el);
            fs.appendFileSync('./sourse/sortCleanedArray.txt', `${el} \n`);
            fs.appendFileSync('./sourse/mp3/trackWithSilence.bat', `ffmpeg -i "${el}.mp3" -af "apad=pad_dur=2" ${el}_S.m4a \n`);
            fs.appendFileSync('./sourse/mp3/glueAudioFFMPEG.bat', `file "${el}_S.m4a" \n`);
            //fs.appendFileSync('./sourse/mp3/glueAudioFFMPEG.bat', `file \'silence3sec.mp3\' \n`);
            fs.appendFileSync('./sourse/mp3/pronunciation-finder.bat', ` ${el} `);
            return el;
        };
        });
        fs.appendFileSync('./sourse/sortCleanedArray.txt', `${phrase} \n`);
        fs.appendFileSync('./sourse/mp3/trackWithSilence.bat', `ffmpeg -i "${phrase}.mp3" -af "apad=pad_dur=4" "${contrlPhrase}_S.m4a" \n`);
        fs.appendFileSync('./sourse/mp3/glueAudioFFMPEG.bat', `file "${contrlPhrase}_S.m4a" \n`);
        fs.appendFileSync('./sourse/sortCleanedArray.txt', `\n`);
        console.log(phrase);
        wordsFromSub = unique(wordsFromSub);
        cleanedArray[i] = wordsFromSub;
        //console.log(wordsFromSub); 
    }
  console.log(phraseArray.length) ; 
  cleanedArray = unique(cleanedArray);
  let sortCleanedArray = cleanedArray;
  
  /*sortCleanedArray.sort(function(a, b){
    // ASC  -> a.length - b.length
    // DESC -> b.length - a.length
    return b.length - a.length;
  });*/
  
})
