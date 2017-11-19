const express = require("express");
const router = express.Router();
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const adapter = new FileAsync('./src/assets/datastore/db.json');
const db = low(adapter);

router.get("/experiment/:ID", (req, res) => {

    db.then((db) => {
        const data = db.get("experiments").filter({
            experimentID: req.params.ID
        }).value();

        if(data.length == 0 || !data) {
            res.status(404).json("No data found")
        } else {
            res.json(data);
        }

    }).catch((e) => {
        res.status(500).json("Database missing!!!");
    });
});

router.get("/experimentList", (req, res) => {

    db.then((db) => {
        const data = db.get("experiments").orderBy("id","desc").map("experimentID").value();

        if(data.length == 0 || !data) {
            res.status(404).json("No data found")
        } else {
            res.json([...new Set(data)]);
        }

    }).catch((e) => {
        res.status(500).json("Database missing!!!");
    });
});

module.exports = router;