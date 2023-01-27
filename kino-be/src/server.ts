import { read } from "fs";
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
  const userRole = await checkRole(user, true);
  if (user) {
    res.send({ ...formatUser({...user, role: userRole}), token: checkRole(user) });
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
      token: checkRole(req.body),
    });
    const conn = await pool.getConnection();
    await conn.query("INSERT INTO sieckin.users(email, login, password) VALUES (?,?,?)", [req.body.user.email, req.body.user.login, req.body.user.password]);
    if (conn) conn.release();
  } else {
    res.status(500).send('User already exists');
  }
});

server.get('/movies/:id', (req: any, res: any) => {
  readMovie(req.params.id).then((movie: any) => {
    res.send(movie);
  });
});

server.get('/showings/:id', (req: any, res: any) => {
  readShowing(req.params.id).then((showing: any) => {
    res.send(showing);
  });
});

server.get('/halls/:id', (req: any, res: any) => {
  readHall(req.params.id).then((hall: any) => {
    res.send(hall);
  });
});

server.get('/showingsWithId/:id', (req: any, res: any) => {
  readShowingWithID(req.params.id).then((showing: any) => {
    res.send(showing);
  });
});

server.get('/hallsWithId/:id', (req: any, res: any) => {
  readHallWithID(req.params.id).then((hall: any) => {
    res.send(hall);
  });
});

server.get('/movies', (req: any, res: any) => {
  readMovies().then((movies: any) => {
    res.send(movies);
  });
});

server.get('/showings', (req: any, res: any) => {
  readShowings().then((showings: any) => {
    res.send(showings);
  });
});

server.get('/halls', (req: any, res: any) => {
  readHalls().then((halls: any) => {
    res.send(halls);
  });
});

server.listen(3000, () => {
  console.log('Server is running');
});

function formatUser(user: any) {
  delete user.password;
  return user;
}

async function checkRole(user: any, bypassToken = false) {
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT role_id FROM sieckin.user_role WHERE user_id = ?", user.id);
  if (conn) conn.release();
  return rows[0].role_id;
}

async function readUsers(){
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM sieckin.users");
  if (conn) conn.release();
  return rows;
}

server.post('/showings', async (req: any, res: any) => {
  const conn = await pool.getConnection();
  const showingId = req.body.showingId;
  const pickedSeats = req.body.pickedSeats;
  pickedSeats.forEach(async (seat: any) => {
    await takeSeat(showingId, seat.row, seat.seat);
  });
  if (conn) conn.release();
  res.send();
});

async function takeSeat(
  showing_id: number,
  row: number,
  seat: number
) {
  let id: number;
  const conn = await pool.getConnection();
  await conn.query(
    "UPDATE sieckin.showing_" +
      showing_id +
      " SET is_taken = true WHERE row = ? AND seat = ?",
    [row, seat]
  );
  if (conn) conn.release();
}

async function readShowings() : Promise<any> {
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM sieckin.showings")
  if (conn) conn.release();
  return rows;
}

async function readShowing(id: number) : Promise<any>  {
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM sieckin.showings WHERE id = ?", id);
  if (conn) await conn.release();
  return rows;
}

async function readShowingWithID(id: number) : Promise<any>  {
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM sieckin.showing_" + id);
  if (conn) await conn.release();
  return rows;
}

async function readMovies() : Promise<any> {
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM sieckin.movies");
  if (conn) conn.release();
  return rows;
}

async function readMovie(id: number) : Promise<any>  {
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM sieckin.movies WHERE id = ?", id);
  if (conn) conn.release();
  return rows;
}

async function readHalls() : Promise<any> {
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM sieckin.halls");
  if (conn) conn.release();
  return rows;
}

async function readHall(id: number) : Promise<any>  {
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM sieckin.halls WHERE id = ?", id);
  if (conn) conn.release();
  return rows;
}

async function readHallWithID(id: any) : Promise<any>  {
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM sieckin.hall_" + id);
  if (conn) conn.release();
  return rows;
}
