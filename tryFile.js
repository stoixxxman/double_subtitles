
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