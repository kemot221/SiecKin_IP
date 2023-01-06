const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('server/db.json');
const middlewares = jsonServer.defaults();
const db = require('./db.json');
const fs = require('fs');
server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/login', (req: any, res: any, next: any) => {
  const users = readUsers();
    const user = users.filter(
      (u: any) => u.email === req.body.user.email && u.password === req.body.user.password
    )[0];

    if (user) {
      res.send({ ...formatUser(user) });
    } else {
      res.status(401).send('Incorrect username or password');
    }
});

server.post('/reset-password', (req: any, res: any, next: any) => {
  const users = readUsers();
  const user = users.find((u: any) => u.code === req.body.resetData.code && u.password !== req.body.resetData.password);
  const userIndex = users.findIndex((u: any) => u.code === req.body.resetData.code);

  if (user) {
    user.password = req.body.resetData.password;
    db.users[userIndex] = user;
    fs.writeFileSync('server/db.json', JSON.stringify(db, null, 2));
    res.status(200).send('Password reset successful');
  } else {
    res.status(401).send('Incorrect user code');
  }
});

server.post('/register', (req: any, res: any) => {
  const users = readUsers();
  const user = users.filter((u: any) => u.email === req.body.user.email)[0];

  if (user === undefined || user === null) {
    res.send({
      ...formatUser(req.body),
      token: checkIfAdmin(req.body),
    });
    db.users.push(req.body);
  } else {
    res.status(500).send('User already exists');
  }
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});

function formatUser(user: any) {
  delete user.password;
  return user;
}

function checkIfAdmin(user: any, bypassToken = false) {
  return user.role === 0 || bypassToken === true
    ? 'admin-token'
    : 'user-token';
}

function readUsers() {
  const dbRaw = fs.readFileSync('./server/db.json');
  const users = JSON.parse(dbRaw).users;
  return users;
}
