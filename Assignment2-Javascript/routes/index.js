'use strict';
var express = require('express');
var router = express.Router();
var adsModel = require('../models/advertisements');

/* GET home page. */
router.get('/', function (req, res) {
    try {
        adsModel.find({}, function (err, foundAds) {
            console.log(err);
            console.log(foundAds);
            res.render('index', { advertisements: foundAds });
        });
    }
    catch (err) {
        console.log(err);
        res.render('index', { title: 'Express' });
    }
});

module.exports = router;
