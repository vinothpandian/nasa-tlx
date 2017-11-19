const express = require("express");
const router = express.Router();
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const adapter = new FileAsync('./src/assets/datastore/db.json');
const db = low(adapter);

router.get("/", (req,res)=>{
    db.then((db)=>{
        const post = db.get("experiments").value();

        return res.json(post);
    })
});

module.exports = router;