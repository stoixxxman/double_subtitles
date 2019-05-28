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


  const phrase = parsedSubs[0].text;

  const arrayOfWords = phrase.split(/[' '|'\n']/i);
  const cleanedArray = [];
  arrayOfWords.forEach((el) => {
    cleanedArray.push(el.replace(/[,|\.|\!]/i, ''));
  });

  console.log(arrayOfWords);
  console.log(cleanedArray);

  //console.log(parsedSubs[0].text);

  //console.log(parsedSubs);
});





