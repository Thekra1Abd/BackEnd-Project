// importing some modules
const express = require('express')
const app = express()
const session = require('express-session');
const port = process.env.PORT ||3003
const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
var methodOverride = require('method-override')
app.use(methodOverride('_method'))
const allRoutes = require('./routes/allRoutes')
const addUserRoute = require('./routes/addUser')


// auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));


const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
app.use(session({
  secret: 'qwer0987', // Change this to a random string
  resave: false,
  saveUninitialized: false
}));

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});



mongoose.connect("mongodb+srv://thekra22d:eTVayQMS7mhCRWA0@cluster0.sit0yyp.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`)
    })
  })
  .catch((err) => { console.log(err) });

app.use(allRoutes)
app.use(addUserRoute)