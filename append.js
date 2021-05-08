/** .all.fn
* Arrays : append(arr, ...items) => arr
* Appends one or many elements to the end of the array.
```js
const append = require('ooi/append');

let arr1 = [1, 2, 3];

append(arr1, 4, 5, 6);

console.log(arr1)
> [1, 2, 3, 4, 5, 6]
```
*/

module.exports = append;

function append (arr, ...vals) {
  arr.splice(arr.length, 0, ...vals);
  return arr;
}
