const _ = {
  extend: require('./extend'),
  flatten: require('./flatten'),
  query: require('./query'),
  path: require('./path'),
};

_.extend(uri, {
  parse,
  protocol: getProtocol,
  host: getHost,
  path: getPath,
  filename: getFilename,
  extname: getExtname,
  query: getQuery,
  request: getRequest,
});

module.exports = uri;

/** .all.fn
* Convert : uri(string) => object
* Same as uri.parse.
*/
function uri(...args) {
  return parse(...args);
}

/** .all.fn
* Convert : uri(string) => object
* Parses string URI and returns object with properties uri, protocol, host, path, filename, extname, query, request.
*/
function parse (uri) {
  return {
    uri: uri,
    protocol: getProtocol(uri),
    host: getHost(uri),
    path: getPath(uri),
    filename: getFilename(uri),
    extname: getExtname(uri),
    query: getQuery(uri),
    request: getRequest(uri),
  };
}

function getProtocol (uri) {
  return uri.search('://') > -1 ? uri.split('://')[0] : uri;
}

function getHost (uri) {
  return uri.split('://').pop().split('/')[0];
}

function getPath (uri) {
  return '/' + uri.split('://').pop().split('?').shift().split('/').slice(1).join('/');
}

function getFilename (url) {
  return getPath(url).split('/').pop();
}

function getExtname (uri) {
  return _.path.extname(getFilename(uri));
}

function getQuery (uri) {
  return uri.split('?')[1] || '';
}

function getRequest (uri) {
  return _.query.parse(getQuery(uri));
}
