const express = require("express");
const router = express.Router();
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const adapter = new FileAsync('./src/assets/datastore/db.json');
const db = low(adapter);


router.get("/participant/:expID/:partID", (req, res) => {

    db.then((db) => {
        const data = db.get("experiments").filter({
            experimentID: req.params.expID,
            participantID: req.params.partID
        }).first().value();

        if(data === undefined) {
            res.status(404).json("No data found")
        } else {
            res.json(data);
        }

    }).catch((e) => {
        res.status(500).json("Database missing!!!");
    });
});

router.post("/participant/add/:expID/:partID",(req,res)=>{

    db.then((db)=>{

        const data = db.get("experiments").filter({
            experimentID: req.params.expID,
            participantID: req.params.partID
        }).first().value();

        if(data === undefined) {
            db.get("experiments").push({
                id: Date.now(),
                experimentID: req.params.expID,
                participantID: req.params.partID
            }).write().then(()=>{
                res.json(true)
            }).catch((e)=>{
                res.json(e)
            })
        } else {
            res.status(404).json("Participant already exist")
        }
    })
})


router.put("/participant/scale/:expID/:partID", (req, res) => {
    db.then((db) => {

        const data = db.get("experiments").filter({
            experimentID: req.params.expID,
            participantID: req.params.partID
        }).first().value();

        if(data === undefined) {
            res.status(404).json("No such experiment or participant")
        } else {
            const exp = db.get("experiments").find({
                experimentID: req.params.expID,
                participantID: req.params.partID
            }).assign({
                scale: req.body
            }).write().then((data) => {
                res.json("written");
            }).catch((e)=>{
                res.json(e)
            });
        }

    }).catch((e) => {
        res.status(500).json("Database missing!!!");
    });

});

router.put("/participant/workload/:expID/:partID", (req, res) => {
    db.then((db) => {

        const data = db.get("experiments").filter({
            experimentID: req.params.expID,
            participantID: req.params.partID
        }).first().value();

        if(data === undefined) {
            res.status(404).json("No such experiment or participant")
        } else {
            const exp = db.get("experiments").find({
                experimentID: req.params.expID,
                participantID: req.params.partID
            }).assign({
                workload: req.body
            }).write().then((data) => {
                res.json("written");
            }).catch((e)=>{
                res.json(e)
            });
        }

    }).catch((e) => {
        res.status(500).json("Database missing!!!");
    });

});

module.exports = router;