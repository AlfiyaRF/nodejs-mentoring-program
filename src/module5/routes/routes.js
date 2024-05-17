const {getUsers} = require('../controllers/getUsers.js');
const {createUser} = require('../controllers/createUser.js');
const {updateHobbies} = require('../controllers/updateHobbies.js');
const {getHobbies} = require ('../controllers/getHobbies.js');
const {deleteUser} = require('../controllers/deleteUser.js');

const routes = {
  GET: [{
    pattern: /^\/api\/users$/,
    handler: (req, res) => getUsers(req, res)
  }, {
    pattern: /^\/api\/users\/.*\/hobbies$/,
    handler: (req, res) => getHobbies(req, res)
  }],
  POST: [{
    pattern: /^\/api\/users$/,
    handler: (req, res) => createUser(req, res)
  }],
  PATCH: [{
    pattern: /^\/api\/users\/.*\/hobbies$/,
    handler: (req, res) => updateHobbies(req, res)
  }],
  DELETE: [{
    pattern:/^\/api\/users\/[0-9a-f-]+$/,
    handler: (req, res) => deleteUser(req, res)
  }]
};

const getHandler = (method, url) => {
  const patterns = routes[method];
  if (!patterns) {
      return null;
  }

  for (const { pattern, handler } of patterns) {
    if (pattern.test(url)) {
        return handler;
    }
  }
}

module.exports = getHandler;
