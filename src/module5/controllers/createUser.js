const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const usersFilePath = '../models/userData.js';
const userDataPath = path.resolve(__dirname, usersFilePath);

exports.createUser = (req, res) => {
  let body = '';
  req.on('data', (chunk) => {
      body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const { name, email } = JSON.parse(body);
      const newUser = {
        user: {
          id: uuidv4(),
          name,
          email
        }
      };
      fs.readFile(userDataPath, 'utf8', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error\n');
          return;
        }

        let users = [];
        if (data) {
          users = JSON.parse(data);
        }

        for (let i = 0; i < users.length; i++) {
          const user = users[i].user;
          // if (user.name === name) {
          //   res.writeHead(404, { 'Content-Type': 'application/json' });
          //   res.end(JSON.stringify({
          //     data: null,
          //     error: `User with name ${name} already exists`
          //   }));
          //   return;
          // }
          if (user.email === email) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              data: null,
              error: `User with email ${email} already exists`
            }));
            return;
          }
        }

        users.push(newUser);

        fs.writeFile(userDataPath, JSON.stringify(users, null, 2), (err) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error\n');
            return;
          }

          res.writeHead(201, { 'Content-Type': 'Application/json' });
          res.end(JSON.stringify({
            data: {
              ...newUser,
              links: {
                self: `/api/users/${newUser.user.id}`,
                hobbies: `/api/users/${newUser.user.id}/hobbies`
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

