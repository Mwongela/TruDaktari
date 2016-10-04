var express = require('express');
var http = require('http');
var request = require('request');
var _ = require('lodash');
var htmlparser = require('html-to-json');

var router = express.Router();


var constants = require('./constants');


router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/search/doctor', function(req, res) {

    var query = req.body.query;

    if (!query || query === "") {
        res.status(401).json({
            status: "Error",
            message: "Please check your input"
        });
    }

    var results = [];
    var errors = [];
    //var



    request({

        method: "GET",
        url: constants.doctor.URL,
        headers: {},
        qs: {
            q: constants.doctor.Q,
            salt: constants.doctor.SALT,
            key: constants.doctor.KEY,
            search: query
        }

    }, function(err, response, body) {

        if (err) {

        }
        //console.log(response);
        //console.log(body);

        htmlparser.parse(body, {results: function() {

        	return this.map('table tbody tr', function($item) {
        		
        		var items = $item.find('td');
        		//console.dir(items);

        		for(var key in items) {
        			if(items.hasOwnProperty(key)) {
        				var item = items[key];
        				console.dir(item);
        			}
        		}

        		return {
        			name: $item.text()
        		}
        	});

        }}, function(err, result) {
            //console.log(result);

            return res.send(result);
        });

    


    });

});

router.post('/search/facility', function(req, res) {

    console.log("Searching Facility");

});

module.exports = router;