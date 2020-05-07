const route = require('express').Router();
const objectId = require('mongoose').Types.ObjectId;

let Patient = require('../models/patient/patient.model');

route.get('/', (req, res) => {
    Patient.find((err, docs) => {
        if(!err) res.send(docs);
        else console.log(JSON.stringify(err, undefined,2));
    });
});

route.get('/:id', (req, res) => {
    if(!objectId.isValid(req.params.id)){
        return res.status(400).send(`id is not correct ${req.params.id}`);
    }

    Patient.findById(req.params.id, (err, doc) => {
        if(!err) 
            res.send(doc);
        else
            console.log(err);
    });
});

route.post('/', (req,res) => {

    let data = req.body; /*  numfich:req.body.numfich */
    let patient = new Patient(data);

    patient.save((err, doc) => {
        if(!err) 
            res.send(doc);
            else
               res.send(err);
    });

});

route.put('/:id', (req, res) => {
    if(!objectId.isValid(req.params.id)){
        return res.status(400).send(`id is not correct ${req.params.id}`);
    }

    Patient.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, doc) =>{
        if (!err)
            res.send(doc);
            else    
                console.log(err);
    })
});

route.delete('/:id', (req,res)=>{
    if(!objectId.isValid(req.params.id)){
        return res.status(401).send(`id is not correct ${req.params.id}`);
    }

    Patient.findByIdAndRemove(req.params.id, (err, doc)=>{
        if (!err)
            res.send(doc);
            else    
                console.log(err);
    })
});

module.exports = route;