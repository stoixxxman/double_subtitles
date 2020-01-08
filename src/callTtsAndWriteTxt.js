var fs = require('fs')
const tts = require('./googleTTS.js');

function forWord(el){
    tts(el);
    fs.appendFileSync('./sourse/sortCleanedArray.txt', `${el} \n`);
    fs.appendFileSync('./sourse/mp3/newWords.txt', `file ${el}.m4a \n`);
    fs.appendFileSync('./sourse/mp3/trackWithSilence.bat', `ffmpeg -i "${el}.mp3" -af "apad=pad_dur=2" ${el}.m4a \n`);
    fs.appendFileSync('./sourse/mp3/glueAudioFFMPEG.txt', `file ${el}.m4a \n`);
}

function forWholeText(Text){
    tts(Text);
    fs.appendFileSync('./sourse/mp3/wholeText.txt', `${Text}`);

}


module.exports.forWord = forWord;
module.exports.forWholeText = forWholeText;