const fs = require('fs');
const path = require('path');

const usersFilePath = '../models/userData.js';
const userDataPath = path.resolve(__dirname, usersFilePath);

exports.getUsers = (req, res) => {
  try {
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

      res.writeHead(200, { 'Content-Type': 'Application/json' });
      res.end(JSON.stringify({
        data: users.map(user => ({
          user: user.user,
          links: {
              self: `/api/users/${user.user.id}`,
              hobbies: `/api/users/${user.user.id}/hobbies`
          }
        })),
        error: null
      }));
    });
  } catch (err) {
    res.writeHead(400, { 'Content-Type': 'Application/json' });
    res.end(JSON.stringify({ error: 'Invalid JSON' }));
  }
};
