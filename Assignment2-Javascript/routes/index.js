'use strict';
var express = require('express');
var router = express.Router();
var adsModel = require('../models/advertisements');

/* GET home page. */
router.get('/', function (req, res) {
    try {
        adsModel.find({}, function (err, foundAds) {
            if (!err)
            res.render('index', { advertisements : foundAds });
        });
    }
    catch (err) {
        res.render('index', { title: 'Express' });
    }
});

/* GET for insert page */
router.get('/insert', function (req, res) {
    res.render('insert');
});

/* POST for insert page */
router.post('/insert', function (req, res) {
    const ad = new adsModel({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    });
    ad.save(function (err) {
        if (!err)
            res.redirect('/');
        else
            console.log(err);
    });
});

/* GET for Update page */
router.get('/update/:id', function (req, res) {
    adsModel.findById(req.params.id, function (err, foundAds) {
        if (err)
            console.log(err);
        else
            res.render('update', { ad: foundAds });
    });
});

router.post('/update', function (req, res) {
    adsModel.findByIdAndUpdate(req.params.id,
    {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    }), function (err) {
        if (err)
            console.log(err);
        else
            res.redirect('/');
    }
});

router.post('/delete/:id', function (req, res) {
    adsModel.findByIdAndDelete(req.params.id, function (err) {
        if (!err)
            res.redirect('/');
        else
            console.log(err);
    })
});

module.exports = router;
