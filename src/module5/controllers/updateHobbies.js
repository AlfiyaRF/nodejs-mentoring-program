const fs = require('fs');
const path = require('path');

const usersFilePath = '../models/userData.js';
const userDataPath = path.resolve(__dirname, usersFilePath);

exports.updateHobbies = (req, res) => {
  let body = '';
  req.on('data', (chunk) => {
      body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const userId = req.url.split('/')[3];
      const { hobbies } = JSON.parse(body);

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
        let updatedUser;
        let userExists = false;
        for (let i = 0; i < users.length; i++) {
          const user = users[i].user;
          const userHobbies = users[i].hobbies || [];
          if (user.id === userId) {
            userExists = true;
            users[i].hobbies = [...new Set([...userHobbies, ...hobbies])];
            updatedUser = user;
          }
        }
        if (!userExists) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
              data: null,
              error: `User with id ${userId} doesn't exist`
          }));
          return;
        }
        fs.writeFile(userDataPath, JSON.stringify(users, null, 2), (err) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end('Internal Server Error\n');
            return;
          }

          res.writeHead(200, { 'Content-Type': 'Application/json' });
          res.end(JSON.stringify({
            data: {
              user: updatedUser,
              links: {
                  self: `/api/users/${userId}`,
                  hobbies: `/api/users/${userId}/hobbies`
              }
            },
            error: null
          }));
        });
      });
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'Application/json' });
      res.end(JSON.stringify({ error: 'Invalid JSON' }));
    }
  });
};