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

server.post('/showings', async (req: any, res: any) => {
  const showings = readShowings();
  const pickedSeats = req.body.pickedSeats;
  let showing = (await showings).find((s: any) => s.id === req.body.showingId);
  showing = { ...showing, taken_seats: [...showing.taken_seats, ...pickedSeats] };
  for (let s of req.body.pickedSeats) {
    takeSeat(req.body.showingId, s.row, s.seat, "Imie Nazwisko");
  }
  res.send(showing);
});

server.get('/movies/:id', (req: any, res: any) => {
  const movie = readMovie(req.params.id);
  res.send(movie);
});

server.get('/showings/:id', (req: any, res: any) => {
  const showing = readShowing(req.params.id);
  res.send(showing);
});

server.get('/halls/:id', (req: any, res: any) => {
  const hall = readHall(req.params.id);
  res.send(hall);
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
  const row = await conn.query("SELECT id FROM sieckin.halls WHERE cinema_id = ? AND tag = ?", [cinema_id, tag]);
  const id : number = row[0].id;
  const tblName : string = 'hall_' + id.toString();
  await conn.query("CALL createHall(?)", tblName);
  let rowNumber: number = 1;
  seats.forEach(async (element: number) =>{
    await conn.query("INSERT INTO sieckin." + tblName + "(row, seats) VALUES (?,?)", [rowNumber, element]);
    rowNumber++;
  })
  if (conn) conn.release();
}

async function createShowing(hall_id: number, time: Date, movie_id: number){
  const conn = await pool.getConnection();
  await conn.query("INSERT INTO sieckin.showings(hall_id, time, movie_id) VALUES (?,?,?)", [hall_id, time, movie_id]);
  const row = await conn.query("SELECT id FROM sieckin.showings WHERE hall_id = ? AND time = ?", [hall_id, time]);
  const id : number = row[0].id;
  const tblName : string = 'showing_' + id.toString();
  await conn.query("CALL createShowing(?)", tblName);
  const hallData = await conn.query("SELECT * FROM sieckin.hall_"+ hall_id);
  hallData.forEach(async (row: any) => {
    const rowNumber: number = row.row;
    const seats: number = row.seats;
    let i: number;
    for (i = 1; i<= seats; i++){
      await conn.query("INSERT INTO sieckin."+tblName+"(row, seat, isTaken) VALUES (?,?,?)", [rowNumber,i,false]);
    }
  })
  if (conn) conn.release();
}

async function supportTickets(){
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM sieckin.support_tickets");
  if (conn) conn.release();
  return rows;
}

async function takeSeat(showing_id: number, row: number, seat: number, customer: string){
  const conn = await pool.getConnection();
  await conn.query("UPDATE sieckin.showing_"+ showing_id +" SET is_taken = true WHERE row = ? AND seat = ?", [row, seat]);
  await conn.query("INSERT INTO sieckin.tickets(showing_id, row, seat, customer) VALUES (?,?,?,?)", [showing_id, row, seat, customer]);
  const ticket_row = await conn.query("SELECT id FROM sieckin.tickets WHERE showing_id = ? AND row = ? AND seat = ?", [showing_id, row, seat]);
  if (conn) conn.release();
  return ticket_row[0].id;
}

async function readShowings() {
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM sieckin.showings");
  if (conn) conn.release();
  return rows;
}

async function readShowing(id: number) {
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM sieckin.showings WHERE id = ?", id);
  if (conn) conn.release();
  return rows;
}

async function readMovies() {
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM sieckin.movies");
  if (conn) conn.release();
  return rows;
}

async function readMovie(id: number) {
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM sieckin.movies WHERE id = ?", id);
  if (conn) conn.release();
  return rows;
}

async function readHalls() {
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM sieckin.halls");
  if (conn) conn.release();
  return rows;
}

async function readHall(id: number) {
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM sieckin.halls WHERE id = ?", id);
  if (conn) conn.release();
  return rows;
}