const   express = require('express'),
        router  = express.Router(),
        User    = require('../models/user'),
        Print   = require('../models/print'),
        multer  = require('multer'),
        path    = require('path'),
        storage = multer.diskStorage({
                    destination: function(req, file, callback){
                        callback(null,'./public/upload/');
                    },
                    filename: function(req, file, callback){
                        callback(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname));
                    }
        }),
        imageFilter = function(req, file, callback){
            if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)){
                return callback(new Error('Only jpg, jpeg, png and gif.'), false);
            }
            callback(null, true);
        },
        upload = multer({storage: storage, fileFilter: imageFilter}),
        passport= require('passport');

router.get("/", function(req, res){
    console.log(res.locals.currentUser);
    res.render("landing.ejs");
});
router.get("/b", function(req, res){
    console.log(res.locals.currentUser);
    res.render("ticket.ejs");
});
router.get("/t", function(req, res){
    console.log(res.locals.currentUser);
    res.render("thankyou.ejs");
});
router.get('/p', function(req,res){
    res.render('promotion.ejs');
});
router.get('/register', function(req,res){
    res.render('register.ejs');
});
router.get('/search', function(req,res){
    res.render('promotion.ejs');
});

router.post('/register', upload.single('profileImage'), function(req, res){
    req.body.profileImage = '/upload/'+req.file.filename;
    let newUser = new User({username: req.body.username,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            profileImage: req.body.profileImage
    });
    if(req.body.adminCode === 'chill'){
        newUser.isAdmin = true;
    }  
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash('error', err.message);
            return res.redirect('/register');
        } else {
            passport.authenticate('local')(req, res, function(){
            req.flash('success', user.username +', Welcome to cinema');
            res.redirect('/prints');;
            });
        }
    });
});

router.get('/login', function(req,res){
    res.render('login.ejs');
});

router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/prints',
        failureRedirect: '/login',
        successFlash: true,
        failureFlash: true,
        successFlash: 'Successfully login',
        failureFlash: 'Invalid username or password'
    }), function(req,res){
});

router.get('/logout', function(req,res){
    req.logout();
    req.flash('success', 'Log you out successfully');
    res.redirect('/');
});

router.get('/user/:id', function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            req.flash('error', 'There is something wrong!');
            return res.redirect('/');
        } else {
            Print.find().where('author.id').equals(foundUser._id).exec(function(err, foundPrint){
               if(err){
                req.flash('error', 'There is something wrong!');
                return res.redirect('/');
               } else {
                res.render('user/show.ejs',{ user: foundUser, prints: foundPrint});
               }   
            });
        }
    });
});

module.exports = router;