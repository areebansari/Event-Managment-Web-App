var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    cookieParser = require("cookie-parser"),
    LocalStrategy = require("passport-local"),
    flash        = require("connect-flash"),
    EMS          = require("./models/ems"),
    User        = require("./models/user"),
    Venues  = require("./models/venues"),
    Catering = require("./models/catering"),
    Decorations  = require("./models/decorations"),
    session = require("express-session"),
    //seedEmsData = require("./seedEmsData"),
    seedEmsDataCsv = require("./seedEmsDataCsv"),    
    methodOverride = require("method-override");
    moment = require('moment');
    
//requiring routes
var indexRoutes      = require("./routes/index"),
    venueRoutes      = require("./routes/venues"),
    cateringRoutes      = require("./routes/catering"),
    decorationRoutes      = require("./routes/decorations")
    
mongoose.connect("mongodb://localhost/EMS_v1", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(cookieParser('secret'));

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.success = req.flash('success');
   res.locals.error = req.flash('error');
   next();
});

app.use("/", indexRoutes);
app.use("/venues", venueRoutes);
app.use("/catering", cateringRoutes);
app.use("/decorations", decorationRoutes);

// seed the database
//seedEmsData();
if (process.env.seeddb == 'true')
    seedEmsDataCsv();

//app.listen(process.env.PORT, process.env.IP, function(){
app.listen(3000, process.env.IP, function(){
   console.log("The EMS Server Has Started!");
});
