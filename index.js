const { parse } = require('subtitle');
// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}
// Read the file and print its contents.
var fs = require('fs'), filename = process.argv[2];

fs.readFile(filename, 'utf8', function (err, data) {
  if (err) throw err;
  const parsedSubs = parse(data);
  let i = 0;
  while(parsedSubs[i].text) {
  const phrase = parsedSubs[i].text;
  const arrayOfWords = phrase.split(/[' '|'\n']/i);
  const cleanedArray = [];
  arrayOfWords.forEach((el) => {
    cleanedArray.push(el.replace(/[\,|\.|\!|\-]/i, ''));
    //Я крч сделал но почемуто файл ломается с 4 субтитра
    //Также так и не понял как удалять 's 're  а так в принципе все выводит вроде
    
  });

  console.log(i, arrayOfWords);
  console.log(i, cleanedArray);
  i=i+1;

  //console.log(parsedSubs[i].text);

  //console.log(parsedSubs);
}});





