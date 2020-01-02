
const tts = require('./googleTTS.js');
var fs = require('fs');

function callTtsIfLengthSub(lengthSub, arrayOfWords){
    if(lengthSub >= 3 && lengthSub !== 4 && lengthSub !== 7 && lengthSub !== 10) {
        tts(arrayOfWords[0] + ' ' + arrayOfWords[1] + ' ' + arrayOfWords[2]);
        fs.appendFileSync('./sourse/mp3/trackWithSilence.bat', `ffmpeg -i "${arrayOfWords[0] + ' ' + arrayOfWords[1] + ' ' + arrayOfWords[2]}.mp3" -af "apad=pad_dur=2" ${arrayOfWords[0] + ' ' + arrayOfWords[1] + ' ' + arrayOfWords[2]}.m4a \n`);
        fs.appendFileSync('./sourse/mp3/glueAudioFFMPEG.bat', `file ${arrayOfWords[0] + ' ' + arrayOfWords[1] + ' ' + arrayOfWords[2]}.m4a \n`);

        if(lengthSub >= 6) {
            tts(arrayOfWords[3] + ' ' + arrayOfWords[4]+ ' ' + arrayOfWords[5]);
            fs.appendFileSync('./sourse/mp3/trackWithSilence.bat', `ffmpeg -i "${arrayOfWords[3] + ' ' + arrayOfWords[4]+ ' ' + arrayOfWords[5]}.mp3" -af "apad=pad_dur=2" ${arrayOfWords[3] + ' ' + arrayOfWords[4]+ ' ' + arrayOfWords[5]}.m4a \n`);
            fs.appendFileSync('./sourse/mp3/glueAudioFFMPEG.bat', `file ${arrayOfWords[3] + ' ' + arrayOfWords[4]+ ' ' + arrayOfWords[5]}.m4a \n`);

            if(lengthSub == 8){
                tts(arrayOfWords[6] + ' ' + arrayOfWords[7]);
                fs.appendFileSync('./sourse/mp3/trackWithSilence.bat', `ffmpeg -i "${arrayOfWords[6] + ' ' + arrayOfWords[7]}.mp3" -af "apad=pad_dur=2" ${arrayOfWords[6] + ' ' + arrayOfWords[7]}.m4a \n`);
                fs.appendFileSync('./sourse/mp3/glueAudioFFMPEG.bat', `file ${arrayOfWords[6] + ' ' + arrayOfWords[7]}.m4a \n`);

            }
            if(lengthSub >= 9) {
                tts(arrayOfWords[6] + ' ' + arrayOfWords[7] + ' ' + arrayOfWords[8]);
                fs.appendFileSync('./sourse/mp3/trackWithSilence.bat', `ffmpeg -i "${arrayOfWords[6] + ' ' + arrayOfWords[7] + ' ' + arrayOfWords[8]}.mp3" -af "apad=pad_dur=2" ${arrayOfWords[6] + ' ' + arrayOfWords[7] + ' ' + arrayOfWords[8]}.m4a \n`);
                fs.appendFileSync('./sourse/mp3/glueAudioFFMPEG.bat', `file ${arrayOfWords[6] + ' ' + arrayOfWords[7] + ' ' + arrayOfWords[8]}.m4a \n`);

                if(lengthSub >= 11) {
                    tts(arrayOfWords[9] + ' ' + arrayOfWords[10]);
                    fs.appendFileSync('./sourse/mp3/trackWithSilence.bat', `ffmpeg -i "${arrayOfWords[9] + ' ' + arrayOfWords[10]}.mp3" -af "apad=pad_dur=2" ${arrayOfWords[9] + ' ' + arrayOfWords[10]}.m4a \n`);
                    fs.appendFileSync('./sourse/mp3/glueAudioFFMPEG.bat', `file ${arrayOfWords[9] + ' ' + arrayOfWords[10]}.m4a \n`);

                    if(lengthSub >= 13) {
                        tts(arrayOfWords[10] + ' ' + arrayOfWords[11] + ' ' + arrayOfWords[12]); 
                        fs.appendFileSync('./sourse/mp3/trackWithSilence.bat', `ffmpeg -i "${arrayOfWords[10] + ' ' + arrayOfWords[11]+ ' ' + arrayOfWords[12]}.mp3" -af "apad=pad_dur=2" ${arrayOfWords[10] + ' ' + arrayOfWords[11]+ ' ' + arrayOfWords[12]}.m4a \n`);
                        fs.appendFileSync('./sourse/mp3/glueAudioFFMPEG.bat', `file ${arrayOfWords[10] + ' ' + arrayOfWords[11] + ' ' + arrayOfWords[12]}.m4a \n`);
                        if(lengthSub >= 15) {
                            tts(arrayOfWords[13] + ' ' + arrayOfWords[14]);
                            fs.appendFileSync('./sourse/mp3/trackWithSilence.bat', `ffmpeg -i "${arrayOfWords[13] + ' ' + arrayOfWords[14]}.mp3" -af "apad=pad_dur=2" ${arrayOfWords[13] + ' ' + arrayOfWords[14]}.m4a \n`);
                            fs.appendFileSync('./sourse/mp3/glueAudioFFMPEG.bat', `file ${arrayOfWords[13] + ' ' + arrayOfWords[14]}.m4a \n`);
                        }
                    }
                }
                
            }
            
        } else if(lengthSub >= 5){
            tts(arrayOfWords[3] + ' ' + arrayOfWords[4]);
            fs.appendFileSync('./sourse/mp3/trackWithSilence.bat', `ffmpeg -i "${arrayOfWords[3] + ' ' + arrayOfWords[4]}.mp3" -af "apad=pad_dur=2" ${arrayOfWords[3] + ' ' + arrayOfWords[4]}.m4a \n`);
        }
        
    }
    else if(lengthSub >= 2) { 
        tts(arrayOfWords[0] + ' ' + arrayOfWords[1]);
        fs.appendFileSync('./sourse/mp3/trackWithSilence.bat', `ffmpeg -i "${arrayOfWords[0] + ' ' + arrayOfWords[1]}.mp3" -af "apad=pad_dur=2" ${arrayOfWords[0] + ' ' + arrayOfWords[1]}.m4a \n`);
        fs.appendFileSync('./sourse/mp3/glueAudioFFMPEG.bat', `file ${arrayOfWords[0] + ' ' + arrayOfWords[1]}.m4a \n`);

        if(lengthSub >= 4){
            tts(arrayOfWords[2] + ' ' + arrayOfWords[3]);
            fs.appendFileSync('./sourse/mp3/trackWithSilence.bat', `ffmpeg -i "${arrayOfWords[2] + ' ' + arrayOfWords[3]}.mp3" -af "apad=pad_dur=2" ${arrayOfWords[2] + ' ' + arrayOfWords[3]}.m4a \n`);
            fs.appendFileSync('./sourse/mp3/glueAudioFFMPEG.bat', `file ${arrayOfWords[2] + ' ' + arrayOfWords[3]}.m4a \n`);

            if(lengthSub >= 7) {
                tts(arrayOfWords[4] + ' ' + arrayOfWords[5] + ' ' + arrayOfWords[6]);
                fs.appendFileSync('./sourse/mp3/trackWithSilence.bat', `ffmpeg -i "${arrayOfWords[4] + ' ' + arrayOfWords[5] + ' ' + arrayOfWords[6]}.mp3" -af "apad=pad_dur=2" ${arrayOfWords[4] + ' ' + arrayOfWords[5] + ' ' + arrayOfWords[6]}.m4a \n`);
                fs.appendFileSync('./sourse/mp3/glueAudioFFMPEG.bat', `file ${arrayOfWords[4] + ' ' + arrayOfWords[5] + ' ' + arrayOfWords[6]}.m4a \n`);

                if(lengthSub >= 10){
                    tts(arrayOfWords[7] + ' ' + arrayOfWords[8] + ' ' + arrayOfWords[9]);
                    fs.appendFileSync('./sourse/mp3/trackWithSilence.bat', `ffmpeg -i "${arrayOfWords[7] + ' ' + arrayOfWords[8] + ' ' + arrayOfWords[9]}.mp3" -af "apad=pad_dur=2" ${arrayOfWords[7] + ' ' + arrayOfWords[8] + ' ' + arrayOfWords[9]}.m4a \n`);
                    fs.appendFileSync('./sourse/mp3/glueAudioFFMPEG.bat', `file ${arrayOfWords[7] + ' ' + arrayOfWords[8] + ' ' + arrayOfWords[9]}.m4a \n`);
                 }
            }
        }
    } 
}
module.exports = callTtsIfLengthSub;
/*
tts(arrayOfWords[0] + ' ' + arrayOfWords[1] + ' ' + arrayOfWords[2]);
tts(arrayOfWords[3] + ' ' + arrayOfWords[4]+ ' ' + arrayOfWords[5]);
tts(arrayOfWords[6] + ' ' + arrayOfWords[7] + ' ' + arrayOfWords[8]);
tts(arrayOfWords[10] + ' ' + arrayOfWords[11] + ' ' + arrayOfWords[12]); 
tts(arrayOfWords[13] + ' ' + arrayOfWords[14]);
*/