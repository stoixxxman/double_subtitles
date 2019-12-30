var fs = require('fs');

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

module.exports = mainStarter();