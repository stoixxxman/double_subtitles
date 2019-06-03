/*function remove_duplicates(array_){
  var ret_array = new Array();
  for (var a = 0 ; a < array_.length ;  a += 1) {
      for (var b = 0; b < array_.length;  b+=1) {
          if(array_[a] == array_[b] && a != b){
              delete array_[b];
          }
      };
      if(array_[a] != undefined)
          ret_array.push(array_[a]);
  };
  return ret_array;
}*/
const { parse } = require('subtitle');
const unique = require('unique-words');
// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}
// Read the file and print its contents.
var fs = require('fs'), filename = process.argv[2];

let cleanedArray = [];
let parsedSubs = [];
let phrase = [];
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
    //console.log(phrase.match(/\b \b/));
  }

  cleanedArray = unique(cleanedArray);
  const cambridgeDictionary = require('cambridge-dictionary');

  for (let i = 0; i < 5/*cleanedArray.length*/; i += 1) {
    cambridgeDictionary.getExplanation(cleanedArray[i])
      .then(
        res => {
            let word = res.word;
            let wordPos = res.explanations[0].pos;
            let guideWord = res.explanations[0].senses[0].guideWord;
            
            let expText = res.explanations[0].senses[0].definations[0].text;
            let wordExample = res.explanations[0].senses[0].definations[0].examples[0];
            
            fs.appendFileSync('out.srt', `${word}`);
            fs.appendFileSync('out.srt', ` \(${guideWord}\)`);

            fs.appendFileSync('out.srt', ` ${wordPos}`);
            fs.appendFileSync('out.srt', `\n${expText}`);
            fs.appendFileSync('out.srt', `\n${wordExample}\n`);
        }, 
        
        error => {
          console.log(error);
        }
      )
      .catch(console.error);

  }

});