const { BasicStrategy } = require('passport-http');
const passport = require('passport');
const MongoDB = require("../../lib/mongo");
const mongo = new MongoDB();

const bcrypt = require("bcrypt");

passport.use(
    new BasicStrategy(async (email, password, done) => {
        const foundUser = await mongo.getOne("users", {email});

        if(!foundUser){
            let error = "Algunos datos no coinciden"
            return done(error, null);
        } 

        const passwordFound = await bcrypt.compare(password, user.password);

        if(!passwordFound){
            let error = "Algunos datos no coinciden"
            return done(error, null);
        } else {
            return done(null, foundUser);
        }


    })

);