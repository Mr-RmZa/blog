const express = require('express');
const path = require('path');
const session = require('express-session');


const indexRoutes = require("./routes");

const app = express();

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 99999}
}));
app.set('view engine', 'hbs');
app.use(express.urlencoded({extended: 'false'}));
app.use(express.json());

const publicDir = path.join(__dirname, './public');
app.use(express.static(publicDir));

app.use(indexRoutes);
app.use((req, res) => {
    res.render("404");
});

app.listen(3000, ()=> {
    console.log("server started on port 3000")
});