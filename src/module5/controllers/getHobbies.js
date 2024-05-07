const fs = require('fs');
const path = require('path');

const usersFilePath = '../models/userData.js';
const userDataPath = path.resolve(__dirname, usersFilePath);

exports.getHobbies = (req, res) => {
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
      const user = users.find(user => user.user.id === userId);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
          data: {
              hobbies: user.hobbies || [],
              links: {
                  self: `/api/users/${userId}/hobbies`,
                  user: `/api/users/${userId}`
              }
          },
          error: null
      }));
    });
  } catch (err) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Invalid JSON' }));
  }
};
