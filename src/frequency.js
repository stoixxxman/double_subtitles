function getFrequency2(string, cutOff) {
    var cleanString = string.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,""),
        words = cleanString.split(' '),
        frequencies = {},
        word, frequency, i;
  
    for( i=0; i<words.length; i++ ) {
      word = words[i];
      frequencies[word] = frequencies[word] || 0;
      frequencies[word]++;
    }
    
    words = Object.keys( frequencies );
  
    return words.sort(function (a,b) {return frequencies[b] -frequencies[a];}).slice(0,cutOff);
  }
  
//console.log(getFrequency2( "And it's is very very exciting to hear hear hear him\Nexplain some of the thinking behind it", 3 )); 
module.exports = getFrequency2;