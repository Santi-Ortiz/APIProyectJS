const { ExtractJwt, Strategy } = require('passport-jwt');
const passport = require('passport');
const MongoDB = require('../../lib/mongo');
const mongo = new MongoDB();
const config = require('../../config');

passport.use(
    new Strategy( 
        {
            secretOrKey: config.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        },
        async(payload, done) => {
            const userFound = await mongo.getOne("user", {email: payload.email});

            if(!userFound){
                error = "Alguna informacion esta incorrecta"
                done(error, null);
            }else{
                done(null, userFound);
            }
        }
    )
)