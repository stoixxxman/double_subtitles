const { parse } = require('subtitle');
const unique = require('unique-words');

const msToTime = (duration) => {
  var milliseconds = parseInt((duration % 1000) / 1),
    seconds = parseInt((duration / 1000) % 60),
    minutes = parseInt((duration / (1000 * 60)) % 60),
    hours = parseInt((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

const run = () => {
  if (process.argv.length < 3) {
    console.log('Usage: node ' + process.argv[1] + ' FILENAME');
    process.exit(1);
  }
  // Read the file and print its contents.
  var fs = require('fs'), filename = process.argv[2];
  
  let cleanedArray = [];
  let parsedSubs = [];
  let phrase = [];
  let forOutCleanArray = [];
  
  fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err;
    parsedSubs = parse(data);
  
  
  
    for (let i = 0; i < parsedSubs.length; i += 1) {
  
      phrase = parsedSubs[i].text;
      const arrayOfWords = phrase.split(/[' '|'\n']/i);
  
      arrayOfWords.forEach((el) => {
        cleanedArray.push(el.replace(/[\,\.\/\!\<\?\>\"\♪]/gi, '').toLowerCase());
        cleanedArray = cleanedArray.filter(function (el) { return el != '-' });
        cleanedArray = cleanedArray.filter(function (el) { return el != '--' });
        cleanedArray = cleanedArray.filter(function (el) { return el != '' });
        cleanedArray = cleanedArray.filter(function (el) { return el != '\s' });
  
  
      });
  
    }
  
    cleanedArray = unique(cleanedArray);
  
    const cambridgeDictionary = require('cambridge-dictionary');
  
    for (let i = 0; i < parsedSubs.length; i += 1) {
      let start = msToTime(parsedSubs[i].start);
      let end = msToTime(parsedSubs[i].end);
      let phrase = parsedSubs[i].text, index = 0;
  
      fs.appendFileSync('out.srt', `${i + 1}`);
      fs.appendFileSync('out.srt', `\n${start} \-\-\> `);
      fs.appendFileSync('out.srt', `${end}\n`);
      fs.appendFileSync('out.srt', `${phrase}\n\n`);
  
      for (let j = 0; j < cleanedArray.length; j += 1) {
        cambridgeDictionary.getExplanation(cleanedArray[j])
          .then(
            res => {
              let word = ' ' + res.word + ' ';
              let wordPos = res.explanations[0].pos;
              let guideWord = res.explanations[0].senses[0].guideWord;
              let level = res.explanations[0].senses[0].definations[0].level;
              let expText = res.explanations[0].senses[0].definations[0].text;
              let wordExample = res.explanations[0].senses[0].definations[0].examples[0];
  
             // if (word.test(phrase) === true) {
  
                fs.appendFileSync('out.srt', `${word}`);
                fs.appendFileSync('out.srt', ` \(${guideWord}\)`);
                fs.appendFileSync('out.srt', ` \<${level}\>`);
                fs.appendFileSync('out.srt', ` ${wordPos}`);
                fs.appendFileSync('out.srt', `\n${expText}`);
                fs.appendFileSync('out.srt', `\n${wordExample}\n\n`);
              //}
            },
  
            error => {
              console.log(error);
            }
          )
          .catch(console.error);
      }
  
    }
  
  });

}

run();