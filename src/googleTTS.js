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
  let textWithoutMarks = phrase.replace(/\W/gm, ' ').replace(/^\s*/, '').replace(/\s*$/, '');
  if (text.split(' ').length <= 1) {
    fs.appendFileSync('./sourse/mp3/output/wholeText.txt', `${textWithoutMarks} \n`);
    fs.appendFileSync('./sourse/mp3/newWords.txt', `file ${textWithoutMarks}.m4a \n`);
    fs.appendFileSync('./sourse/mp3/trackWithSilence.bat', `ffmpeg -i "${textWithoutMarks}.mp3" -af "apad=pad_dur=2" ${textWithoutMarks}.m4a \n`);
    fs.appendFileSync('./sourse/mp3/glueAudioFFMPEG.txt', `file ${textWithoutMarks}.m4a \n`);
  } else if (textWithoutMarks.split(' ').length > 5) {
    let text = textWithoutMarks.split(' ');
    textWithoutMarks = text[0] + ' ' + text[1] + ' ' + text[3];
    fs.appendFileSync('./sourse/mp3/output/wholeText.txt', `${textWithoutMarks} \n`);
    fs.appendFileSync('./sourse/mp3/newWords.txt', `file ${textWithoutMarks}.m4a \n`);
    fs.appendFileSync('./sourse/mp3/trackWithSilence.bat', `ffmpeg -i "${textWithoutMarks}.mp3" -af "apad=pad_dur=2" ${textWithoutMarks}.m4a \n`);
    fs.appendFileSync('./sourse/mp3/glueAudioFFMPEG.txt', `file ${textWithoutMarks}.m4a \n`);
  }
  // Construct the request
  const request = {
    input: { text: text },
    // StextWithoutMarksect the language and SSML Voice Gender (optional)
    voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
    // StextWithoutMarksect the type of audio encoding
    audioConfig: { audioEncoding: 'MP3' },
  };
  // Performs the Text-to-Speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(`sourse/mp3/${textWithoutMarks}.mp3`, response.audioContent, 'binary');

  console.log(`Audio content written to file: ${textWithoutMarks}.mp3`);
}

module.exports = main;