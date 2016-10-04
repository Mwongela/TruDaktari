var express = require('express');
var http = require('http');
var request = require('request');
var router = express.Router();

var constants = require('./constants');


router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/search/doctor', function(req, res) {

    request({

    }, function(err, response, body) {



    });

});

router.post('/search/facility', function(req, res) {

    console.log("Searching Facility");

});

module.exports = router;
