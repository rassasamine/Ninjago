const express = require('express');
const router = express.Router();
const Ninja = require('../database/models/ninja');

//  get a list of ninjas from db
router.get('/ninjas', function(req, res, next){ 
/*     Ninja.find({})
        .then((ninjas) => { 
            res.send(ninjas); 
        })
        .catch(next); */

    Ninja.aggregate().near({ 
        near: {
            type: 'Point',
            coordinates: [ +req.query.lng, +req.query.lat ] 
        },
        maxDistance: 100000,
        spherical: true,
        distanceField: "dis" 
    })
        .then(function(ninjas){
             res.send(ninjas); 
        })
        .catch(next)
});

//  add a new ninja to db
router.post("/ninjas", (req, res, next) => {
    //  create a new ninja and save it in ninja collection
    Ninja.create(req.body)
        .then((ninja) => {
            res.send(ninja);
        })
        .catch(next)
});

//  update a ninja in db
router.put("/ninjas/:id", (req, res, next) => {
    Ninja.findByIdAndUpdate({_id: req.params.id}, req.body)
        .then(() => {
            Ninja.findOne({_id: req.params.id})
                .then((ninja) => {
                    res.send(ninja);
                })
        })
        .catch(next)
});

//  delete a ninja from db
router.delete("/ninjas/:id", (req, res, next) => {
    Ninja.findByIdAndRemove({_id: req.params.id})
        .then((ninja) => {
            res.send(ninja);
        })
        .catch(next)
});

module.exports = router;