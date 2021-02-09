
let express = require('express')
const app = express()

// läser in modulen body-parser
const bodyParser = require('body-parser')
// registrerar den som middleware
app.use( bodyParser.json() )

// läser in modulen...
let cookieParser = require('cookie-parser')
// registrerar den som middleware
app.use(cookieParser())

// läser in module...
let session = require('express-session')
// registrerar den som middleware
app.use( session( {
  secret: 'keyboard cat jksfj<khsdka',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // ändra till true för secure cookie (felsöka behövs här nu)
} ) )

const mysql = require('mysql');
const db = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'mysql',
  database : 'receptia'
});
// vi gör om metoderna connect och query till promise-metoder så att vi kan använda async/await för att vänta på databasen
const util = require('util')
db.connect = util.promisify(db.connect)
db.query = util.promisify(db.query)

app.post('/rest/cart-item', async (request, response) => {
  // check if user exists before writing
  if(!request.session.user){
    response.status(401) // unauthorised
    response.json({error:'not logged in'})
    return;
  }
  let cartItem = request.body
  let result = await db.query('INSERT INTO cart_items SET food = ?, amount = ?, user = ?', [cartItem.food, cartItem.amount, request.session.user.id])
  response.json(result)
})

app.get('/rest/cart', async (request, response) => {
  // check if user exists before writing
  if(!request.session.user){
    response.status(401) // unauthorised
    response.json({error:'not logged in'})
    return;
  }
  let cart = await db.query('SELECT * FROM cart WHERE user = ?', [request.session.user.id])
  response.json(cart)
})

app.delete('/rest/cart', async (request, response) => {
  // check if user exists before writing
  if(!request.session.user){
    response.status(401) // unauthorised
    response.json({error:'not logged in'})
    return;
  }
  let result = await db.query('DELETE * FROM cart_items WHERE user = ?', [request.session.user.id])
  response.json(result)
})

app.delete('/rest/cart-item/:id', async (request, response) => {
  // check if user exists before writing
  if(!request.session.user){
    response.status(401) // unauthorised
    response.json({error:'not logged in'})
    return;
  }
  let result = await db.query('DELETE FROM cart_items WHERE id = ? AND user = ?', [request.params.id, request.session.user.id])
  response.json(result)
})

// logga in
app.post('/rest/login', async (request, response) => {
  let user = await db.query('SELECT * FROM users WHERE email = ? AND password = ?', [request.body.email, request.body.password])

  user = user[0] // resultatet av min SELECT blir en array, vi är bara intresserade av första elementet (vårt user objekt)

  if(user && user.email){
    request.session.user = user
    user.loggedIn = true
    //delete(user.password) // skicka aldrig password till frontend
    response.json(user)
  }else{
    response.status(401) // unauthorized  https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
    response.json({message:"no matching user"})
  }
})

// autentisera (hämta inloggad användare på denna session - och kontrollera alltid med db)
app.get('/rest/login', async (request, response) => {
  let user
  if(request.session.user){
    user = await db.query('SELECT * FROM users WHERE email = ? AND password = ?', [request.session.user.email, request.session.user.password])
    user = user[0]
  }
  if(user && user.email){
    user.loggedIn = true
    delete(user.password) // skicka aldrig password till frontend
    response.json(user)
  }else{
    response.status(401) // unauthorized  https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
    response.json({message:"not logged in"})
  }
})

// logga ut
app.delete('/rest/login', async (request, response) => {
  request.session.destroy( () => {
    response.json({loggedIn: false})
  } )
})

// dynamisk route till vilken tabell som helst, säkerhetsrisk?
// route där front-end kan hämta data ifrån övriga tabeller
// ex:   /rest/orders
// ex:   /rest/cars
app.get("/rest/:table", async (req, res) => {
  let query = "SELECT * FROM ??"
  let result = await db.query(query, [req.params.table])
  res.json(result)
})

// dynamisk route med id
// ex: /rest/hotels_in_cities/2   |  SELECT * FROM hotels_in_cities WHERE id = 2
app.get("/rest/:table/:id", async (req, res) => {
  let query = "SELECT * FROM ?? WHERE id = ?"
  let result = await db.query(query, [req.params.table])
  res.json(result)
})

// dynamisk post - SKA FUNKA SÅ HÄR, men ???
app.post("/rest/:table", async (req, res) => {
  let query = "INSERT INTO ?? SET ?"
  let result = await db.query(query, req.body)
  console.log(query.sql)
  res.json(result)
})

app.listen(3000, async () => {
  await db.connect()
  console.log('server running on port 3000')
})


