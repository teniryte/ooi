'use strict';

function toBlobUrl (source) {
  var blob = new Blob([source], {}),
    blobURL = global.URL.createObjectURL(blob);
  return blobURL;
}

module.exports = toBlobUrl;
