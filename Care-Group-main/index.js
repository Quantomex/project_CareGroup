if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}
require('./models/Leadership');
require('./models/Logo');
require('./models/Admin');
require('./models/visionSection');
require('./models/MissionStatement');
require('./models/Chairman');
require('./models/Values');
require('./models/BoardofDirectors');
require('./models/ManagementTeam');
require('./models/Policy');
require('./models/Mission');
require('./models/OurStory');
require('./models/CoreValues');
require('./models/BusinessActivity');
require('./models/Sustain');
require('./models/organizationStructure');
const express = require('express');
const MongoDBStore = require('connect-mongo');
const mongoose = require('mongoose');
const multer = require('multer');
const Admin = mongoose.model('Admin')
const passport = require('passport');
const localStrategy = require('passport-local');
const path = require('path');
const flash = require('connect-flash');
const ejsMate = require('ejs-mate');
const session = require('express-session');
var bodyParser = require('body-parser');
const leadershipRoutes = require('./routes/leadershipRoutes');
const logoImageRoutes = require('./routes/logoImageRoutes');
const adminRoutes = require('./routes/adminRoutes');
const visionRoutes = require('./routes/visionRoutes');
const statementRoutes = require('./routes/statementRoutes');
const valuesRoutes = require('./routes/valuesRoutes');
const chairmanRoute = require('./routes/chairmanRoute');
const BoardofDirectorsRoutes = require('./routes/BoardofDirectorsRoutes');
const ManagementTeamRoutes = require('./routes/ManagementTeamRoutes');
const policyRoutes = require('./routes/policyRoutes');
const missionRoutes = require('./routes/missionRoutes');
const ourstoryroutes = require('./routes/ourstoryroutes');
const aboutuspage = require('./routes/aboutuspage');
const contactuspage = require('./routes/contactuspage');
const corevalues = require('./routes/corevalues');
const baRoute = require('./routes/baRoute');
const sustainRoutes = require('./routes/sustainRoutes');
const organizationStructure = require('./routes/organizationStructure');
const { isAdmin } = require('./middleware/isAdmin');
const app = express();
const PORT = 3000;
const mongoURi = 'mongodb://0.0.0.0:27017/caregroup';
const secret = 'thisisnotagoodsecret';

const store = new MongoDBStore({
  mongoUrl: mongoURi,
  secret,
  touchAfter: 24 * 60 * 60
});
const sessionConfig = {
  store,
  secret,
  name: "session",
  resave: false,
  saveUninitialized: false
};


// Setting up the app
app.engine('ejs', ejsMate);
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set(path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});
// initializing Mongoose
mongoose.connect(mongoURi, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Mongoose is connected')
}).catch((e) => {
  console.log(e)
});

const db = mongoose.connection;

db.on('error', err => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());

passport.use('admin', new localStrategy(Admin.authenticate()));
passport.serializeUser((user, done) => {
  if (user instanceof Admin) {
    done(null, { type: 'admin', id: user.id });
  }
});
passport.deserializeUser(async (data, done) => {
  try {
    let user;
    if (data.type === 'admin') {
      user = await Admin.findById(data.id);
    }

    // Save the user object in the session regardless of its type
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
app.use(leadershipRoutes);
app.use(logoImageRoutes);
app.use(adminRoutes);
app.use(visionRoutes);
app.use(statementRoutes);
app.use(valuesRoutes);
app.use(chairmanRoute);
app.use(BoardofDirectorsRoutes);
app.use(ManagementTeamRoutes);
app.use(policyRoutes);
app.use(missionRoutes);
app.use(ourstoryroutes);
app.use(aboutuspage);
app.use(contactuspage);
app.use(corevalues);
app.use(baRoute);
app.use(sustainRoutes);
app.use(organizationStructure);
// Listen for the port Number
app.listen(PORT, () => {
  console.log(`App is listening onnnn http://localhost:${PORT}`);
});

