const express = require("express");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const store = require("connect-mongo");
const dotenv = require("dotenv");
const Doctor = require('./models/doctor.model');
const Patient = require('./models/patient.model');
const Appointment = require('./models/appointment.model');

// environment variables
dotenv.config();

mongoose.connect(process.env.MONGODB_URL)

const app = express();

// template engine setup
app.set("view engine", "ejs");
// ejs layout setup
app.use(expressLayouts);
// middleware to extract the body from the request
app.use(express.urlencoded({ extended: false }));
// hooking up the public folder
app.use(express.static("public"));


//All middlewares defined under.

// middleware for setting up the session
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1200000,
    },
    store: store.create({
      mongoUrl: process.env.MONGODB_URL,
    }),
  })
);
// middle ware for making the user available to all templates
app.use((req, res, next) => {
  res.locals.currentUser = req.session.currentUser;
  next();
});



//All routes defined under.

// root route
app.get("/", (req, res) => {
  res.render("home");
});

//appointments route
const appointmentRoutes = require('./routes/appointment.routes');
app.use('/appointment', appointmentRoutes);


const patientRoutes = require('./routes/patient.routes');
app.use('/patient', patientRoutes)

const doctorRoutes = require('./routes/doctor.routes');
app.use('/doctor', doctorRoutes)

app.get('/signin', async (req, res) => {
  res.render('signin')
})

app.get('/signup', async (req, res) => {
  res.render('signup')
})

app.get('/signout', async (req, res) => {
  res.redirect('home')
})
app.listen(process.env.PORT);
