var fs = require('fs');
const getMP3Duration = require('get-mp3-duration')
const buffer = fs.readFileSync('sourse/ability.mp3')
const duration = getMP3Duration(buffer)
 
console.log(duration, 'ms')