const http = require('http');
const url = require('url');
const getHandler = require('./routes');

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url, true);
  const pathname = reqUrl.pathname;

  const method = req.method;
  const routeHandler = getHandler(method, pathname);

  if (routeHandler) {
    routeHandler(req, res);
  } else {
    notFound(res);
  }
});

const notFound = (res) => {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: "Opps! It doesn't exist - 404" }));
};

module.exports = server;