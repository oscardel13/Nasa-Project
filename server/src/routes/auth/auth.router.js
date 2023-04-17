const { passport } = require('../../services/secruity');

const guest = require('../../models/users.models');

const express = require('express');

const authRouter = express.Router()

authRouter.get('/google', 
    passport.authenticate('google', {
        scope: ['email']
    }))

    authRouter.get('/google/callback' , 
    passport.authenticate('google', {
        failureRedirect: '/v1/auth/failure',
        successRedirect: '/dashboard',
    }),
    (req,res)=>console.log("Google called us back")
);

authRouter.get('/failure', (req,res)=>res.send('Failed to log in'))

authRouter.get('/logout' , (req,res)=>{
    req.logout();
    return res.redirect('/')
})

authRouter.get('/guest' , (req,res)=>{
    console.log("hello")
    guest.setMode(true)
    return res.redirect('/dashboard')
})

module.exports = authRouter
