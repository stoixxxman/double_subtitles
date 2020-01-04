const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
function longWords(arrWords){
  arrWords.sort(function(a, b){
    return b.length - a.length;
  });
  let times;
   rl.question('how much times would you like repeat? ', (answer) => {
    times = answer;
    console.log(`repeat: ${answer} times`);
    arrWords.map((word) => {
      for(let i = 1; i <= times; i = i + 1){
        fs.appendFileSync('./sourse/mp3/longWordsForFFMPEG.txt', `file ${word}.m4a \n`);
        fs.appendFileSync('./sourse/mp3/output/longWords.txt', `${word} \n`);
      }        
    });
    rl.close();
  }); 
}
