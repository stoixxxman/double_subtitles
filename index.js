
const { parse, stringify } = require('subtitle');
const unique = require('unique-words');
const cambridgeDictionary = require('cambridge-dictionary');
const mp3Duration = require('mp3-duration');
const makeDir = require('make-dir');
const PowerShell = require("powershell");
const getMP3Duration = require('get-mp3-duration');

(async () => {
    const paths = await Promise.all([
        makeDir('sourse'),
        makeDir('sourse/txt'),
        makeDir('sourse/srt')
    ]);
 
    console.log(paths);
    /*
    [
        '/Users/sindresorhus/fun/unicorn/rainbow',
        '/Users/sindresorhus/fun/foo/bar'
    ]
    */
})();

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
    
    fs.appendFileSync('./sourse/sortCleanedArray.txt', `${sortCleanedArray[i]} \n`);
    
  }

    const parseOxford = require('./src/dictionaries/oxford');
    const parseCambridge = require('./src/dictionaries/cambridge');
    const downloadPromise = require('./src/downloadFile');
    const autoplayFile = require('./src/autoplay');
    const { addGap } = require('./src/audio');

    const program = require('commander');

    const bluebird = require('bluebird');
    const path = require('path');

    program
      .version('0.5.3', '-v, --version')
      .description(
        'An application for getting transcription and audio from Oxford Advanced Learner’s Dictionary, Cambridge Dictionary'
      )
      .usage('[options] <words>')
      .option('-p, --path [value]', 'Path for downloaded files', path.resolve('./'))
      .option(
        '-d, --dictionary [value]',
        'Dictionary [oxford, cambridge]',
        /^(oxford|cambridge)$/i,
        'cambridge'
      )
      .option('-g, --gap [value]', 'Add gap [value] sec to the end of file', 0)
      .option('--play', 'Auto play files after downloading', false)
      .option(
        '-c, --concurrency [value]',
        'Indicate how much process will start',
        5
      )
      .parse(sortCleanedArray);

    const destination = path.normalize('./sourse/');
    const words = program.args;
    const parser = program.dictionary === 'oxford' ? parseOxford : parseCambridge;
    const gap = program.gap;
    const concurrency = program.concurrency;
    const autoplay = program.play;
    //console.log(`Save to path: ${destination}, concurrency: ${concurrency}`);
    if (!destination) return;
    const constructFilePath = (
      destination,
      { word, transcription, main_transcription, mp3, main_mp3, title }
    ) => {
      const name = word === title ? word : title;
      if (process.platform === 'win32')
        return path.join(
          destination,
          `${name}.mp3`
        );
      return path.join(
        destination,
        `${name} |.mp3`
      );
    };
    bluebird
      .map(words, parser, { concurrency: +concurrency })
      .then((data) =>
        bluebird.map(
          data.filter((item) => item.main_mp3 || item.mp3),
          (result) =>
            downloadPromise(
              result.mp3 || result.main_mp3,
              constructFilePath(destination, result)
            ).then((file) => (gap > 0 && file ? addGap(file, +gap) : file)),
          { concurrency: +concurrency }
        )
      )
      .then(
        (files) =>
          autoplay
            ? bluebird.mapSeries(files.filter((file) => !!file), autoplayFile)
            : files
      )
      .then((result) => {
        console.log('Finish')
        mp3Rename(result);
      })
      .catch((error) => console.log('Error', error));
  
   function mp3Rename(a) {
    let mp3 = [];
    let wordsMp3 = [];
    function fromDir(startPath,filter){
      // console.log('Starting from dir '+startPath+'/');
        if (!fs.existsSync(startPath)){
            console.log("no dir ",startPath);
            return;
        }

        
        let files=fs.readdirSync(startPath);

        for(let i=0, timing = 0;i<files.length;i++){
            let filename=path.join(startPath,files[i]);
            let stat = fs.lstatSync(filename);
            if (stat.isDirectory()){
                fromDir(filename,filter); //recurse
            }
            else if (filename.indexOf(filter)>=0) {
              const buffer = fs.readFileSync(filename);
              const duration = getMP3Duration(buffer);
              mp3.push({filename, duration});
            };
        };
    };
    
    fromDir('./sourse/','.mp3');
    
    mp3.sort(function(a, b){
      // ASC  -> a.length - b.length
      // DESC -> b.length - a.length
      return b.filename.length - a.filename.length;
    });
    
    var util = require('util');
    let countErr = 0;
    //console.log(mp3);
   

    async function* asyncGenerator() {
      var i = 0;
      while (i < mp3.length) {
        yield i++;
      }
    }

    
    let timeEdit = 0;
    let timeChange = 0;
    (async function() {
          
      for await (let num of asyncGenerator()) {

        lastDot = mp3[num].filename.indexOf('.');
        opositeSlash = mp3[num].filename.indexOf('\\');
        let word = mp3[num].filename.substring(opositeSlash, lastDot).replace(/\\/,'').toLowerCase();
        for( let t = 1; t < 3; t += 1 ){
          fs.appendFileSync('./sourse/mylistMP3.txt', `file '${word}.mp3'  \n`  );
          fs.appendFileSync('./sourse/mylistMP3.txt', `file 'silence3sec.mp3' \n`  );
        }    
        
        timeChange = timeChange + mp3[num].duration + 3000; 
        //console.log(word, mp3[num].duration); 
        
        await cambridgeDictionary.getExplanation(word)
          .then(
            res => {
              if(res.explanations.length === 0){
                countErr = countErr + 1;
                timeEdit = timeEdit + mp3[num].duration;
                console.log(countErr, timeEdit);
              }
              
              let timeEnd = timeChange - timeEdit;
              let timeStart = timeEnd - mp3[num].duration - 3000 - timeEdit;
              let iterator = num + 1 - countErr;

              let start = msToTime(timeStart);
              let end = msToTime(timeEnd);
              console.log(mp3[num].filename, mp3[num].duration, timeChange, timeEdit)
              let word = util.inspect(res.word, {showHidden: false, depth: 20});
              let wordPos = util.inspect(res.explanations[0].pos,{showHidden: false, depth: 10});
              let guideWord = util.inspect(res.explanations[0].senses[0].guideWord,{showHidden: false, depth: 10});
              let level = util.inspect(res.explanations[0].senses[0].definations[0].level, {showHidden: false, depth: 10});
              let expText = util.inspect(res.explanations[0].senses[0].definations[0].text,{showHidden: false, depth: 10});
              let wordExample = util.inspect(res.explanations[0].senses[0].definations[0].examples[0],{showHidden: false, depth: 10});
              console.log(word);
              
              fs.appendFileSync('./sourse/srt/outAsync.srt', `${iterator}`); 
              fs.appendFileSync('./sourse/srt/outAsync.srt', `\n${start} \-\-\> `);
              fs.appendFileSync('./sourse/srt/outAsync.srt', `${end}\n`);
              
              //fs.appendFileSync('./sourse/txt/mylist.txt', `file '${word}.mp3' file 'silence3sec.mp3' file '${word}.mp3' file 'silence3sec.mp3'`);
              fs.appendFileSync('./sourse/srt/outAsync.srt', `${word}`);
              fs.appendFileSync('./sourse/srt/outAsync.srt', ` \(${guideWord}\)`);
              fs.appendFileSync('./sourse/srt/outAsync.srt', ` \<${level}\>`);
              fs.appendFileSync('./sourse/srt/outAsync.srt', ` ${wordPos}`);
              fs.appendFileSync('./sourse/srt/outAsync.srt', `\n${expText}`);
              fs.appendFileSync('./sourse/srt/outAsync.srt', `\n${wordExample}\n\n`);
            })
          .catch(console.error);
      }
    })();
    let  pronunciationFinder = new PowerShell("ffmpeg -f lavfi -i anullsrc=r=44100:cl=mono -t 3 -q:a 9 -acodec libmp3lame sourse/silence3sec.mp3 ffmpeg -f concat -i sourse/mylistMP3.txt -acodec copy 1output.wav");
    // Handle process errors (e.g. powershell not found)
    pronunciationFinder.on("error", err => {
          console.error(err);
      });
      
    // Stdout
    pronunciationFinder.on("output", data => {
        console.log(data);
        
    });
    
    // Stderr
    pronunciationFinder.on("error-output", data => {
        console.error(data);
    });
    
    // End
    pronunciationFinder.on("end", code => {
          // Do Something on end
    });
    
}
})