const express = require("express");
const router = express.Router();
const MongoDB = require("../lib/mongo");
const passport = require("passport");
const mongo = new MongoDB();


router.get("/", passport.authenticate('jwt', {session: false}), async(req, res, next) =>{
    const data = await mongo.getAll("users");
    const results = []; 
    for await(const doc of data){
        results.push(doc)
    }
    res.status(200).json({
        results  
    })
});

router.get("/:id", async(req, res, next) =>{
    const data = await mongo.getOne("users", {email : req.params.id});
    return res.status(200).json({
        data  
    })
});

router.post("/", async(req, res, next) =>{
    const result = await mongo.insertOne("users", req.body);
    res.status(200).json({
        result
    })
});

router.put("/:id", async(req, res, next) =>{
    const result = await mongo.updateOne("users", {email: req.params.id});
    res.status(200).json({
        result
    })
});

router.delete("/:id", async(req, res, next) =>{
    const result = await mongo.deleteOne("users", {email: req.params.id});
    res.status(200).json({
        result
    })
});

module.exports = router;