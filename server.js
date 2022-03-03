const express = require("express");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const store = require("connect-mongo");
const dotenv = require("dotenv");
const methodOverride = require("method-override")
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
// required for the app when deployed to Heroku (in production)
app.set("trust proxy", 1);
//All middlewares defined under.

//middle ware for using more http verbs in the html
app.use(methodOverride("_method"))

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
  res.locals.today = getMinDate()
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

app.get('/signin',  (req, res) => {
  res.render('signin')
})

app.get('/signup',  (req, res) => {
  res.render('signup')
})

app.get('/home', (req, res) => {
  res.render('home')
})


app.get('/signout', (req, res) => {
  res.redirect('home')
})


function getMinDate() {
  let today = new Date()
  let dd = today.getDate()
  let mm = today.getMonth() + 1 //January is 0!
  const yyyy = today.getFullYear()

  if (dd < 10) {
    dd = '0' + dd
  }

  if (mm < 10) {
    mm = '0' + mm
  }

  today = `${yyyy}-${mm}-${dd}`
  return today
}


app.listen(process.env.PORT);
