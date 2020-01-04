
    var array = data.toString().split("\n");
    for(i in array) {
        console.log(array[i]);
    }

    for (var i = 0; i < parseUserWords.length; i++) {
      if (arr.indexOf(parseUserWords[i]) === -1) {
        arr.push(parseUserWords[i]);
      }
    }

    if(el.substring(el.length - 1, el.length) == 's'){
      elWithoutS = el.substring(0, el.length - 1);
    };


/*if(sub.includes(phrase) == true & phrase.match(/\S+?\s|\S+?$/g).length >= 2){
          console.log('YES');
    
          phraseWith_ = phrase.replace(' ', '_')
          
          tts(phrase);
          fs.appendFileSync('./sourse/sortCleanedArray.txt', `${phrase} \n`);
          fs.appendFileSync('./sourse/mp3/trackWithSilence.bat', `ffmpeg -i "${phrase}.mp3" -af "apad=pad_dur=4" "${phraseWith_}.m4a" \n`);
          fs.appendFileSync('./sourse/mp3/glueAudioFFMPEG.bat', `file ${phraseWith_}.m4a \n`);
          fs.appendFileSync('./sourse/sortCleanedArray.txt', `\n`);
          
        }//else {console.log('error');}*/


        /*
massiveOfPhrase.push();
tts(arrayOfWords[0] + ' ' + arrayOfWords[1] + ' ' + arrayOfWords[2]);
massiveOfPhrase.push();
tts(arrayOfWords[3] + ' ' + arrayOfWords[4]+ ' ' + arrayOfWords[5]);
massiveOfPhrase.push();
tts(arrayOfWords[6] + ' ' + arrayOfWords[7] + ' ' + arrayOfWords[8]);
massiveOfPhrase.push();
tts(arrayOfWords[10] + ' ' + arrayOfWords[11] + ' ' + arrayOfWords[12]);
massiveOfPhrase.push();
tts(arrayOfWords[13] + ' ' + arrayOfWords[14]);
*/
function forMakeTxt(arrayOfWords) {
  for (let i = 0; i <= arrayOfWords.length; i = i + 2) {
      if (massiveOfPhrase.includes(arrayOfWords[i] + ' ' + arrayOfWords[i + 1]) == false && arrayOfWords[i] !== undefined && arrayOfWords[i + 1] !== undefined) {
          massiveOfPhrase.push(arrayOfWords[i] + ' ' + arrayOfWords[i + 1]);
          tts(arrayOfWords[i] + ' ' + arrayOfWords[i + 1]);
          fs.appendFileSync('./sourse/sortCleanedArray.txt', `${arrayOfWords[i] + ' ' + arrayOfWords[i + 1]} \n`);
          fs.appendFileSync('./sourse/mp3/trackWithSilence.bat', `ffmpeg -i "${arrayOfWords[i] + ' ' + arrayOfWords[i + 1]}.mp3" -af "apad=pad_dur=2" "${arrayOfWords[3] + '_' + arrayOfWords[4]}.m4a" \n`);
          fs.appendFileSync('./sourse/mp3/glueAudioFFMPEG.bat', `file '${arrayOfWords[i] + '_' + arrayOfWords[i + 1]}.m4a' \n`);
          arrayOfWords.shift();
      }

  }
}

function callTtsIfLengthSub(arrayOfWords) {
  if (arrayOfWords.length % 2 == 0) {
      forMakeTxt(arrayOfWords)
  } else {
      massiveOfPhrase.push(arrayOfWords[0] + ' ' + arrayOfWords[1]);
      tts(arrayOfWords[0] + ' ' + arrayOfWords[1]);
      fs.appendFileSync('./sourse/sortCleanedArray.txt', `${arrayOfWords[0] + ' ' + arrayOfWords[1]} \n`);
      fs.appendFileSync('./sourse/mp3/trackWithSilence.bat', `ffmpeg -i "${arrayOfWords[0] + ' ' + arrayOfWords[1]}.mp3" -af "apad=pad_dur=2" "${arrayOfWords[3] + '_' + arrayOfWords[4]}.m4a" \n`);
      fs.appendFileSync('./sourse/mp3/glueAudioFFMPEG.bat', `file '${arrayOfWords[0] + '_' + arrayOfWords[1]}.m4a' \n`);
      arrayOfWords.shift();
      forMakeTxt(arrayOfWords)
  }
}