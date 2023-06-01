var express = require('express');
var router = express.Router();
var userModel = require("./users");
const passport = require('passport');
const localStrategy = require("passport-local");

passport.use(new localStrategy(userModel.authenticate()));

router.get('/', function(req, res, next) {
  res.render("index")
});

router.get('/profile',isLoggedIn, function(req, res, next) {
  userModel.findOne({username:req.session.passport.user})
  .then(function(founduser){
    res.render("profile",{user:founduser})
  })
});


router.post('/register',function(req,res,next){
  var createdUser = new userModel({
    username:req.body.username,
    email:req.body.email,
    image:req.body.image,
    number:req.body.number,
    message:req.body.message,
  })
  userModel.register(createdUser,req.body.password)
  .then(function(createUser){
    passport.authenticate('local')(req,res,function(){
      res.redirect('/profile')
    });
  });
});

router.post("/login",passport.authenticate('local',
{
  successRedirect:'/profile',
  failureRedirect:'/'
}),
function(req,res){});

router.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

function isLoggedIn(req,res,next)
{
  if (req.isAuthenticated()){
    return next();
  }
  else{
    res.redirect('/');
  }
}

module.exports = router;
