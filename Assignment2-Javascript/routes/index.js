'use strict';
var express = require('express');
var router = express.Router();
var adsModel = require('../models/advertisements');
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');

/* GET home page. */
router.get('/', function (req, res) {
    try {
        adsModel.find({}, function (err, foundAds) {
            if (!err)
                res.render('index', { title: 'Home', advertisements: foundAds });
        });
    }
    catch (err) {
        res.render('index', { title: 'Home' });
    }
});

/* GET About Me page */
router.get('/about', function (req, res) {
    res.render('about', { title: 'About Me' });
});

/* GET contact page. */
router.get('/contact', function (req, res) {
    res.render('contact', { title: 'Contact' });
});

/* GET projects page. */
router.get('/projects', function (req, res) {
    res.render('projects', { title: 'Projects' });
});

/* GET services page. */
router.get('/services', function (req, res) {
    res.render('services', { title: 'Services' });
});



////////////////////////////////////////////////////////////////////////////////
    /* CRUD Operations
///////////////////////////////////////////////////////////////////////////////



/* GET for Insert page */
router.get('/insert', function (req, res) {
    res.render('insert', {title  : 'Insert'});
});

/* POST for Insert page */
router.post('/insert', function (req, res) {
    var form = new formidable.IncomingForm();

    //Specify our image file directory
    form.uploadDir = path.join(__dirname, '../public/images');

    form.parse(req, function (err, fields, files) {
        //Update filename
        files.upload.name = fields.pictitle + '.' + files.upload.name.split('.')[1];

        // Insert ads to the database
        const ad = new adsModel({
            title: fields.title,
            image: files.upload.name,
            description: fields.description,
            price: fields.price
        });
        ad.save(function (err) {
            if (err)
                console.log(err);
        });

        //Upload file on our server
        fs.rename(files.upload.path, path.join(form.uploadDir, files.upload.name), function (err) {
            if (err)
                console.log(err);
        });
    });
    // This will redirect to home page after insertion
    form.on('end', function (err, fields, files) {
        res.redirect('/');
    });
});

/* GET for Update page */
router.get('/update/:id', function (req, res) {
    adsModel.findById(req.params.id, function (err, foundAds) {
        if (!err)
            res.render('update', { ad: foundAds })
        else
            console.log(err);
    });
});

/* POST for Update page*/
router.post('/update', function (req, res) {
    adsModel.findByIdAndUpdate(req.body.id,
        {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price
        }, function (err) {
            if (err)
                console.log(err);
            else
                res.redirect('/');
        });
});

/* POST for Delete page*/
router.post('/delete/:id', function (req, res) {
    adsModel.findByIdAndDelete(req.params.id, function (err) {
        if (!err)
            res.redirect('/');
        else
            console.log(err);
    });
});

module.exports = router;
