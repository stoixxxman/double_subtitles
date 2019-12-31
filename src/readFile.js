const { parse, stringify } = require('subtitle');
const unique = require('unique-words');
var fs = require('fs'), filename = process.argv[2];

const json = require('./srt-bot.json');
// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');
// Import other required libraries
const util = require('util');
async function main(phrase) {
  // Creates a client
  const client = new textToSpeech.TextToSpeechClient();
  // The text to synthesize
  const text = phrase;
  // Construct the request
  const request = {
    input: {text: text},
    // Select the language and SSML Voice Gender (optional)
    voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
    // Select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };
  // Performs the Text-to-Speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(`sourse/mp3/${text}.mp3`, response.audioContent, 'binary');
  console.log(`Audio content written to file: ${text}.mp3`);
}

async function mainStarter(phrase){
  try{
    let oneSub = await main(phrase);
    console.log(oneSub);
  } catch(err){
    console.log(err);
  }
} 

if (process.argv.length < 3) {
    console.log('Usage: node ' + process.argv[1] + ' FILENAME');
    process.exit(1);
  }
  
  let cleanedArray = [];
  let parsedSubs = [];
  let phrase = [];
  let forOutCleanArray = [];
  let phraseArray = [];
  fs.appendFileSync('./sourse/mp3/pronunciation-finder.bat', `pronunciation-finder `); 
  fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err;
    parsedSubs = parse(data);
    let wordsFromSub = []; 
    var arrEl = [];
    for (let i = 0; i < parsedSubs.length; i += 1) {
        phrase = parsedSubs[i].text;
        phrase = phrase.replace(/<i>/gi, '').replace(/<\/i>/gi, '').replace(/\\n\'/gi, '').replace(/[^\w .]/gi, '');
        mainStarter(phrase);
        phraseArray[i] = phrase;
        const arrayOfWords = phrase.split(/[' '|'\n'|.|!|?|,]/i); 
        wordsFromSub = arrayOfWords.map((el) => {
        el = el.replace(/[\,\.\/\!\<\?\>\"\♪\-]/gi, '').toLowerCase();
        if(el != '' & el != 's' & el != 'a' & el != 'i' & el != 'll' & el != 't' & arrEl.indexOf(el) == -1 ){
            console.log(el);
            arrEl.push(el);
            mainStarter(el);
            fs.appendFileSync('./sourse/sortCleanedArray.txt', `${el} \n`);
            fs.appendFileSync('./sourse/mp3/glueAudioFFMPEG.bat', `file '${el}.mp3' \n`);
            fs.appendFileSync('./sourse/mp3/glueAudioFFMPEG.bat', `file \'silence3sec.mp3\' \n`);
            fs.appendFileSync('./sourse/mp3/pronunciation-finder.bat', ` ${el} `);
            return el;
        };
        });
        fs.appendFileSync('./sourse/sortCleanedArray.txt', `${phrase} \n`);
        fs.appendFileSync('./sourse/mp3/glueAudioFFMPEG.bat', `file \'${phrase}.mp3\' \n`);
        fs.appendFileSync('./sourse/mp3/glueAudioFFMPEG.bat', `file \'silence3sec.mp3\' \n`);
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
