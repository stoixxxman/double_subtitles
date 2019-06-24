const { parse, stringify } = require('subtitle');
const unique = require('unique-words');
const cambridgeDictionary = require('cambridge-dictionary');

const msToTime = (duration) => {
  let milliseconds = parseInt((duration % 1000) / 1);
  let seconds = parseInt((duration / 1000) % 60);
  let minutes = parseInt((duration / (1000 * 60)) % 60);
  let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  //milliseconds = (milliseconds < 10) ? "00" + milliseconds : milliseconds;
  

  return hours + ":" + minutes + ":" + seconds + "," + milliseconds;
}


const ffmpeg = require('ffmpeg');

if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}

var fs = require('fs'), filename = process.argv[2];

let cleanedArray = [];
let parsedSubs = [];
let phrase = [];
let forOutCleanArray = [];

fs.readFile(filename, 'utf8', function (err, data) {
  if (err) throw err;
  parsedSubs = parse(data);

  let wordsFromSub = [];

  for (let i = 0; i < parsedSubs.length; i += 1) {

    phrase = parsedSubs[i].text;
    const arrayOfWords = phrase.split(/[' '|'\n']/i);
    
    wordsFromSub = arrayOfWords.map((el) => {
      el = el.replace(/[\,\.\/\!\<\?\>\"\♪\-]/gi, '').toLowerCase();
      if(el != '' & el != 's' & el != 'a' & el != 'i' & el != 'll' & el != 't' ){
          return el;
      };
    });
    wordsFromSub = unique(wordsFromSub);
    cleanedArray[i] = wordsFromSub;
  }

  cleanedArray = unique(cleanedArray);
  let sortCleanedArray = cleanedArray;
  
  sortCleanedArray.sort(function(a, b){
    // ASC  -> a.length - b.length
    // DESC -> b.length - a.length
    return b.length - a.length;
  });
  //console.log(sortCleanedArray);
  // sortCleanedArray.length

  for (let i = 0; i < sortCleanedArray.length; i += 1) {
    fs.appendFileSync('./sourse/txt/sortCleanedArray.txt', `${sortCleanedArray[i]} `);
    fs.appendFileSync('./sourse/txt/mylist.txt', `file '${sortCleanedArray[i]}.wav' \n`);
    fs.appendFileSync('./sourse/txt/mylist.txt', `file '${sortCleanedArray[i]}_s.wav' \n`);
  }
  

  var path = require('path');
  let mp3 = [];
  let wordsMp3 = [];
  function fromDir(startPath,filter){
  
     // console.log('Starting from dir '+startPath+'/');
  
      if (!fs.existsSync(startPath)){
          console.log("no dir ",startPath);
          return;
      }

      //const mp3Duration = require('mp3-duration');
      //var audioconcat = require('audioconcat');
      //const getMP3Duration = require('get-mp3-duration');

      let files=fs.readdirSync(startPath);
      
      //console.log(files.length);
      for(let i=0, timing = 0;i<files.length;i++){
          let filename=path.join(startPath,files[i]);
          let stat = fs.lstatSync(filename);
          if (stat.isDirectory()){
              fromDir(filename,filter); //recurse
          }
          else if (filename.indexOf(filter)>=0) {
            
            lastSpace = filename.indexOf(' ');
            fileRename = filename.substring(0, lastSpace).toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\d]/g,"") + '.mp3';
            let word = filename.substring(0, lastSpace);
            wordsMp3.push(word);
            fs.renameSync(filename, fileRename);
            
            mp3.push(fileRename);
            
          };
      };
  };
  
  fromDir('./sourse/','.mp3');

  mp3.sort(function(a, b){
    // ASC  -> a.length - b.length
    // DESC -> b.length - a.length
    return b.length - a.length;
  });

  wordsMp3.sort(function(a, b){
    // ASC  -> a.length - b.length
    // DESC -> b.length - a.length
    return b.length - a.length;
  });

  console.log(mp3.length);
  // console.log(wordsMp3.lenght);
  // console.log(mp3, wordsMp3);

  

  async function* asyncGenerator() {
    var i = 0;
    while (i < mp3.length) {
      yield i++;
    }
  }

  var util = require('util');
  let countErr = 0;
  console.log(mp3);
  (async function() {
    for await (let num of asyncGenerator()) {
      for( let t = 1; t < 3; t += 1 ){
        fs.appendFileSync('./sourse/txt/mylistMP3.txt', `file '${mp3[num]}'  \n`  );
        fs.appendFileSync('./sourse/txt/mylistMP3.txt', `file 'silence3sec.mp3' \n`  );
      }    
      lastDot = mp3[num].indexOf('.');
      opositeSlash = mp3[num].indexOf('\\');
      let word = mp3[num].substring(opositeSlash, lastDot).replace(/\\/,'');
     
      
      //console.log('el =', word);
      let timeChange = 3000; 
      
      
      
      await cambridgeDictionary.getExplanation(word)
        .then(
          res => {
            if(res.explanations.length === 0){
              countErr = countErr + 1;
              console.log(res, res.word);
            }
            
            let timeEnd = timeChange*(num+1) - countErr*timeChange;
            let timeStart = timeEnd - timeChange;
            let iterator = num + 1 - countErr;

            let start = msToTime(timeStart);
            let end = msToTime(timeEnd);
            
            let word = util.inspect(res.word, {showHidden: false, depth: 10});
            let wordPos = util.inspect(res.explanations[0].pos,{showHidden: false, depth: 10});
            let guideWord = util.inspect(res.explanations[0].senses[0].guideWord,{showHidden: false, depth: 10});
            let level = util.inspect(res.explanations[0].senses[0].definations[0].level, {showHidden: false, depth: 10});
            let expText = util.inspect(res.explanations[0].senses[0].definations[0].text,{showHidden: false, depth: 10});
            let wordExample = util.inspect(res.explanations[0].senses[0].definations[0].examples[0],{showHidden: false, depth: 10});
            console.log(word);
            console.log(util.inspect(res.explanations[0].senses[0].definations[0].text, {showHidden: false, depth: 10}));
            //let utilWord = util.inspect(,{showHidden: false, depth: 10});
            
            fs.appendFileSync('outAsync.srt', `${iterator}`); 
            fs.appendFileSync('outAsync.srt', `\n${start} \-\-\> `);
            fs.appendFileSync('outAsync.srt', `${end}\n`);
            //fs.appendFileSync('outAsync.srt', `${utilWord}\n`);

            fs.appendFileSync('outAsync.srt', `${word}`);
            fs.appendFileSync('outAsync.srt', ` \(${guideWord}\)`);
            fs.appendFileSync('outAsync.srt', ` \<${level}\>`);
            fs.appendFileSync('outAsync.srt', ` ${wordPos}`);
            fs.appendFileSync('outAsync.srt', `\n${expText}`);
            fs.appendFileSync('outAsync.srt', `\n${wordExample}\n\n`);
          })
        .catch(console.error);
    }
  })();
})