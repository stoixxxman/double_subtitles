function getFrequency2(string, cutOff) {
    var cleanString = string.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, ""),
        words = cleanString.split(' '),
        frequencies = {},
        word, frequency, i;

    for (i = 0; i < words.length; i++) {
        word = words[i];
        frequencies[word] = frequencies[word] || 0;
        frequencies[word]++;
    }

    words = Object.keys(frequencies);

    return words.sort(function (a, b) { return frequencies[b] - frequencies[a]; }).slice(0, cutOff);
}

/*
const arrayOfWords = subText.split(/\W/i);
wordsFromSub = arrayOfWords.map((word) => {
  word = word.replace(/\W/gm, '').toLowerCase();
  if (word.length >= 3 && parseUserWords.indexOf(word) == -1) {
      allWords = allWords + word + ' ';
      if (arrWords.indexOf(word.replace(/^\s*//*, '').replace(/\s*$/, '')) == -1) {
    arrWords.push(word);
    tts(word);
    return word;
};
} else if (parseUserWords.indexOf(word) !== -1) { 
arrRemovedWords.push(word);
}

if (letArrWordsFromPhrase[i].endsWith('s')){
        wordEndWithoutS = letArrWordsFromPhrase[i].substring(0, letArrWordsFromPhrase[i].length - 1);
        if (wordEndWithoutS.endsWith('\'')){
            wordEndWithoutS = letArrWordsFromPhrase[i].substring(0, letArrWordsFromPhrase[i].length - 1);
        }
    };
    if (letArrWordsFromPhrase[i].endsWith('ing')){
        let wordEndWithoutIng = letArrWordsFromPhrase[i].substring(0, letArrWordsFromPhrase[i].length - 3);
    };
});

if(word.endsWith('\'s')){
        return word = word.slice(0,word.length - 2), ' is';
    } 
    if(word.endsWith('\'re')){
        return word = word.slice(0,word.length - 3), ' are';
    } 
    if(word.endsWith('n\'t')){
        return word = word.slice(0, word.length - 3), ' not'
    }
    if(word.endsWith('\'ll')){
        return word = word.slice(0, word.length - 3), ' will'
    }
    if(word.endsWith('\'m')){
        return word = word.slice(0,word.length - 2), ' am';

    }
*/

module.exports.getFrequency2 = getFrequency2;