const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model.js');

const PASSPORT = passport.use(
    new LocalStrategy(async function(USERNAME, PASSWORD,done){
        console.log(USERNAME,PASSWORD);

        try {
            const user =await User.findOne({username:USERNAME});
            if(!user){
                return done(null,false,{message:'Invalid Username'});
            }
            const isPasswordCorrect = await user.ComparePassword(PASSWORD);
         
            if(isPasswordCorrect){
                return done(null, user);
            }else{
                return done(null, false,{message:"Invalid password"});
            }
        } catch (error) {
            return done(error);
        }
    })
);


module.exports = PASSPORT;