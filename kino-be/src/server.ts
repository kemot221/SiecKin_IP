const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
server.use(middlewares);
server.use(jsonServer.bodyParser);

const mariadb = require('mariadb');
const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  connectionLimit: 5
});

server.post('/login', async (req: any, res: any, next: any) => {
  const users = readUsers();
  const user = (await users).filter(
    (u: any) => u.email === req.body.user.email && u.password === req.body.user.password
  )[0];

  if (user) {
    res.send({ ...formatUser(user), token: checkIfAdmin(user) });
  } else {
    res.status(401).send('Incorrect username or password');
  }
});

server.post('/register', async (req: any, res: any) => {
  const users = readUsers();
  const user = (await users).filter((u: any) => u.email === req.body.user.email)[0];

  if (user === undefined || user === null) {
    res.send({
      ...formatUser(req.body),
      token: checkIfAdmin(req.body),
    });
    const conn = await pool.getConnection();
    const rows = await conn.query("INSERT INTO sieckin.users(email, login, password) VALUES (?,?,?)", [req.body.user.email, req.body.user.login, req.body.user.password]);
    if (conn) conn.release();
  } else {
    res.status(500).send('User already exists');
  }
});

server.listen(3000, () => {
  console.log('Server is running');
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

async function readUsers(){
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM sieckin.users");
  if (conn) conn.release();
  return rows;
}
