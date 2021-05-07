/** .all.strings.encode.fn
* Convert : base64.encode() => string
* Convert regular string to base64.
*/

/** .all.strings.encode.fn
* Convert : base64.decode() => string
* Converts base64-string to regular string.
*/

const _ = {
  extend: require('./extend'),
};

const state = {
  key: `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`,
};

function base64(...args) {
  return encode(...args);
}

_.extend(base64, {
  encode, decode,
});

module.exports = base64;

function encode(input) {
  var output = '',
    chr1, chr2, chr3, enc1, enc2, enc3, enc4,
    i = 0;

  input = unicodeEncode(input);

  while (i < input.length) {

    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);

    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;

    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }

    output = output +
      state.key.charAt(enc1) + state.key.charAt(enc2) +
      state.key.charAt(enc3) + state.key.charAt(enc4);

  }

  return output;
}

function decode(input) {
  var output = '',
    chr1, chr2, chr3,
    enc1, enc2, enc3, enc4,
    i = 0;

  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

  while (i < input.length) {

    enc1 = state.key.indexOf(input.charAt(i++));
    enc2 = state.key.indexOf(input.charAt(i++));
    enc3 = state.key.indexOf(input.charAt(i++));
    enc4 = state.key.indexOf(input.charAt(i++));

    chr1 = (enc1 << 2) | (enc2 >> 4);
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    chr3 = ((enc3 & 3) << 6) | enc4;

    output = output + String.fromCharCode(chr1);

    if (enc3 != 64) {
      output = output + String.fromCharCode(chr2);
    }
    if (enc4 != 64) {
      output = output + String.fromCharCode(chr3);
    }

  }

  output = unicodeDecode(output);

  return output;
}

function unicodeEncode(string) {
  string = string.replace(/\r\n/g, "\n");
  var utftext = "";

  for (var n = 0; n < string.length; n++) {

    var c = string.charCodeAt(n);

    if (c < 128) {
      utftext += String.fromCharCode(c);
    } else if ((c > 127) && (c < 2048)) {
      utftext += String.fromCharCode((c >> 6) | 192);
      utftext += String.fromCharCode((c & 63) | 128);
    } else {
      utftext += String.fromCharCode((c >> 12) | 224);
      utftext += String.fromCharCode(((c >> 6) & 63) | 128);
      utftext += String.fromCharCode((c & 63) | 128);
    }

  }

  return utftext;
}

function unicodeDecode(utftext) {
  var string = '',
    i = 0,
    c = 0,
    c1 = 0,
    c2 = 0;

  while (i < utftext.length) {

    c = utftext.charCodeAt(i);

    if (c < 128) {
      string += String.fromCharCode(c);
      i++;
    } else if ((c > 191) && (c < 224)) {
      c2 = utftext.charCodeAt(i + 1);
      string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
      i += 2;
    } else {
      c2 = utftext.charCodeAt(i + 1);
      c3 = utftext.charCodeAt(i + 2);
      string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
      i += 3;
    }

  }

  return string;
}
