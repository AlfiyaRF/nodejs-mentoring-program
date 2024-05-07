const fs = require('fs');
const path = require('path');

const usersFilePath = '../models/userData.js';
const userDataPath = path.resolve(__dirname, usersFilePath);

exports.deleteUser = (req, res) => {
  try {
    const userId = req.url.split('/')[3];

    fs.readFile(userDataPath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end('Internal Server Error\n');
        return;
      }

      let users = [];
      if (data) {
        users = JSON.parse(data);
      }

      const deletingUser = users.find(user => user.user.id === userId);
      const usersDeleted = users.filter(user => user !== deletingUser);

      if (!deletingUser) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            data: null,
            error: `User with id ${userId} doesn't exist`
        }));
        return;
      }
      fs.writeFile(userDataPath, JSON.stringify(usersDeleted, null, 2), (err) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end('Internal Server Error\n');
          return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          data: {
            "success": true
          },
          error: null
        }));
      });
    });
  } catch (err) {
    res.writeHead(400, { 'Content-Type': 'Application/json' });
    res.end(JSON.stringify({ error: 'Invalid JSON' }));
  }
};