const LocalStrategy = require('passport-local').Strategy
// const bcrypt = require('bcrypt')

function initialize(passport, getUser, getUserID){
    console.log('FONCTION INIT')
    const authenticateUser = async (username, password, done) => {
        const user = getUser(username)

        console.log('FONCTION AuthenticateUser')
        console.log(username)
        console.log(password)
        console.log(user)
        
        if (username !== user.username) {
            console.log("err username")
            return done(null, false, {message: 'Username undefinded'})
        }

        try {
            if (await password == user.password){
                console.log("Connecté")
                return done(null, user)
            }else {
                console.log("err password")
                return done(null, false, {message: 'Password incorrect'})
            }
        } catch (e) {
            return done(e)
        }
    }

    passport.use(new LocalStrategy(
        { usernameField : 'username'},
    authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => { 
        return done(null, getUserID(id))
    })
}

module.exports = initialize