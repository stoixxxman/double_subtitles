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
const reg = / .+? /g;
fs.readFile(filename, 'utf8', function (err, data) {
  if (err) throw err;
  const parsedSubs = parse(data);
  
  let cleanedArray = [];
  for (let i = 0; i < parsedSubs.length; i += 1) {
    const phrase = parsedSubs[i].text;
    const arrayOfWords = phrase.split(/[' '|'\n']/i);
    arrayOfWords.forEach((el) => {
      cleanedArray.push(el.replace(/[\,\.\/\!\<\?\>\"\♪]/gi, ''));
      cleanedArray = cleanedArray.filter(function(el){return el != '-' });
      cleanedArray = cleanedArray.filter(function(el){return el != '--' });
      cleanedArray = cleanedArray.filter(function(el){return el != '' });
      cleanedArray = cleanedArray.filter(function(el){return el != '\s' });
     
    });
    //console.log(phrase.match(/\b \b/));
  }
  cleanedArray = unique(cleanedArray);
  //console.log(parsedSubs);
 // console.log(remove_duplicates(cleanedArray));
  //console.log(cleanedArray);
  
  const cambridgeDictionary = require('cambridge-dictionary');
  
  

  for(let i = 0; i < cleanedArray.length; i+=1){
  cambridgeDictionary.getExplanation(cleanedArray[i])
  .then(console.log)
  .catch(console.error);
  }
  

  
  
});