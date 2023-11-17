const express = require('express');
const router = express.Router();
const mongo = new MongoDB();
const passport = require('passport');

router.get('/chat', passport.authenticate('jwt', {session: false}), async(req, res, next) => {

    const messages = await mongo.get('messages');
    res.status(200).json({
        messages
    })

})

router.post('/chat', passport.authenticate('jwt', {session: false}), async(req, res, next) => {

    const message = req.body;
    const result = await mongo.insertOne('messages', message);
    res.status(200).json({
        result
    })

})

