const { parse, stringify } = require('subtitle');
const unique = require('unique-words');
var fs = require('fs'), filename = process.argv[2];



if (process.argv.length < 3) {
    console.log('Usage: node ' + process.argv[1] + ' FILENAME');
    process.exit(1);
  }
  
  let cleanedArray = [];
  let parsedSubs = [];
  let phrase = [];
  let forOutCleanArray = [];
  let phraseArray = [];
  fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err;
    parsedSubs = parse(data);
    let wordsFromSub = []; 
    var arrEl = [];
    for (let i = 0; i < parsedSubs.length; i += 1) {
        phrase = parsedSubs[i].text;
        phrase = phrase.replace(/<i>/gi, '').replace(/<\/i>/gi, '').replace(/\-/gi, '');
        
        phraseArray[i] = phrase;
        const arrayOfWords = phrase.split(/[' '|'\n']/i);  

        wordsFromSub = arrayOfWords.map((el) => {
        el = el.replace(/[\,\.\/\!\<\?\>\"\♪\-]/gi, '').toLowerCase();
        if(el != '' & el != 's' & el != 'a' & el != 'i' & el != 'll' & el != 't' & arrEl.indexOf(el) == -1 ){
            console.log(el);
            arrEl.push(el);
            fs.appendFileSync('./sourse/sortCleanedArray.txt', `${el} \n`);
            return el;
        };
        });
        fs.appendFileSync('./sourse/sortCleanedArray.txt', `${phrase} \n`);
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