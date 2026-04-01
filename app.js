const express = require('express');
const app = express();
const path = require('path');

const session = require("express-session")

const router = require('./routes/myrouter');
const employeesRouter = require('./routes/employees')
const membersRouter = require('./routes/members')
const ordersRouter = require('./routes/orders')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}))

app.use(session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: true
}))

app.use((req, res, next)=>{
    res.locals.user = req.session.user || null
    res.locals.old = req.session.old || null
    next();
})

app.use('/employees', employeesRouter)
app.use('/members', membersRouter)
app.use('/orders', ordersRouter)


app.use(router);
app.use(express.static(path.join(__dirname, 'public')));


app.listen(8080, ()=>{
    console.log("Starting server at port: 8080");
})