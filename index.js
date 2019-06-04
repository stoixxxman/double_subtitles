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

  return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

const run = () => {
  if (process.argv.length < 3) {
    console.log('Usage: node ' + process.argv[1] + ' FILENAME');
    process.exit(1);
  }
  // Read the file and print its contents.
  const fs = require('fs');
  const filename = process.argv[2];
  
  let cleanedArray = [];
  let parsedSubs = [];
  let phrase = [];
  let forOutCleanArray = [];
  
  fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err;
    parsedSubs = parse(data);
    console.log(parsedSubs);
    (async () => {
      try{

        for await (sub of parsedSubs){
          const phrase = sub.text;
    
          const arrExplWithWords = [];
    
          const arrayOfWords = phrase.split(/[' '|'\n']/i);
          
    
          //TODO: rewrite to [].map
          arrayOfWords.map((el) => {
            cleanedArray.push(el.replace(/[\,\.\/\!\<\?\>\"\♪]/gi, '').toLowerCase());
            cleanedArray = cleanedArray.filter(function (el) { return el != '-' });
            cleanedArray = cleanedArray.filter(function (el) { return el != '--' });
            cleanedArray = cleanedArray.filter(function (el) { return el != '' });
            cleanedArray = cleanedArray.filter(function (el) { return el != '\s' });
          });
          
          
          for await (word of cleanedArray){
            cambridgeDictionary.getExplanation(word).then(
              res => {
                const wordC = ' ' + res.word + ' ';
                  const wordPos = res.explanations[0].pos;
                  const guideWord = res.explanations[0].senses[0].guideWord;
                  const level = res.explanations[0].senses[0].definations[0].level;
                  const expText = res.explanations[0].senses[0].definations[0].text;
                  const wordExample = res.explanations[0].senses[0].definations[0].examples[0];
    
                const obj = {wordC, expText};
                console.log(obj);
                arrExplWithWords.push({word, expText});
              },
              err => {
                arrExplWithWords.push({word, err});
              }
            )
          }
    
          await console.log(arrExplWithWords);
          return;
          arrExplWithWords.forEach((expWithWord) => {
    
          })
    
    
        }

      }catch(e){
        console.log(e.stack);
      }
    })();
   
  });

}

run();