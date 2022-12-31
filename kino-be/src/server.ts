import internal from "stream";

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

server.post('/reset-password', async (req: any, res: any, next: any) => {
  const users = readUsers();
  const user = (await users).filter((u: any) => u.code === req.body.resetData.code);
  if(user) {
    user.password = req.body.resetData.password;
    const conn = await pool.getConnection();
    await conn.query("UPDATE sieckin.users SET password = ? WHERE id = ?", [req.body.resetData.password, user.id]);
    if (conn) conn.release();
    res.status(200).send('Password reset successful');
  }else {
    res.status(401).send('Incorrect user code');
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
    await conn.query("INSERT INTO sieckin.users(email, login, password) VALUES (?,?,?)", [req.body.user.email, req.body.user.login, req.body.user.password]);
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

async function checkIfAdmin(user: any, bypassToken = false) {
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT role_id FROM sieckin.user_role WHERE user_id = ?", user.id);
  if (conn) conn.release();
  return rows[0].role_id === 1 || bypassToken === true
    ? 'admin-token'
    : 'user-token';
}

async function readUsers(){
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM sieckin.users");
  if (conn) conn.release();
  return rows;
}

async function createHall(cinema_id: number, tag: string, seats: number[]){
  let capacity : number = 0;
  seats.forEach((element:number) => {
    capacity += element;
  });
  const conn = await pool.getConnection();
  await conn.query("INSERT INTO sieckin.halls(cinema_id, tag, capacity) VALUES (?,?,?)", [cinema_id, tag, capacity]);
  const row = await conn.query("SELECT id FROM halls WHERE cinema_id = ? AND tag = ?", [cinema_id, tag]);
  const id : number = row[0].id;
  const tblName : string = 'hall_' + id.toString();
  await conn.query("CALL createHall(?)", tblName);
}