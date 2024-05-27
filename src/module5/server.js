const server = require('./routes/index.js');

const HOSTNAME = '127.0.0.1';
const PORT = 8000;

const startServer = () => {
  server.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
  });
}

module.exports = {
  startServer
};