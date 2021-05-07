/** .all.fn
* Arrays : append(arr, ...items) => arr
* Appends elements to array.
*/

module.exports = append;

function append (arr, ...vals) {
  arr.splice(arr.length, 0, ...vals);
  return arr;
}
