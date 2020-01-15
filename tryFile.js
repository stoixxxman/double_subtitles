function insertAfter(text, str1, str2) {
  String.prototype.splice = function (idx, str) {
    return this.slice(0, idx) + str + ' ' + this.slice(idx + Math.abs(0));
  };
  let inx = text.indexOf(str1) + str1.length + 1;
  var result = text.splice(inx, str2);
  return result;
}
let text = 'has already been declared';
let afterStr = 'already';
let strInsert = 'XYI';
console.log(insertAfter(text, afterStr, strInsert));