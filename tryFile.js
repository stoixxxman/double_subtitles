var fs = require('fs');
const getMP3Duration = require('get-mp3-duration')
const buffer = fs.readFileSync('sourse/ability.mp3')
const duration = getMP3Duration(buffer)
 
console.log(duration, 'ms')

for (let i = 0; i < 1; i++) {
    phrase.push(el);
    if(phrase.length = 2){
      tts(phrase);
      fs.appendFileSync('./sourse/sortCleanedArray.txt', `${phrase} \n`);
      fs.appendFileSync('./sourse/mp3/trackWithSilence.bat', `ffmpeg -i "${phrase}.mp3" -af "apad=pad_dur=2" ${el}_S.m4a \n`);
      fs.appendFileSync('./sourse/mp3/glueAudioFFMPEG.bat', `file "${phrase}_S.m4a" \n`);
      phrase = [];
    }
  }
  str=str.replace(/^\s*/,'').replace(/\s*$/,'');