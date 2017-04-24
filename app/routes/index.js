var express     = require('express');
var request     = require('request');
var _           = require('lodash');
var async       = require("async");
var htmlparser  = require('html-to-json');
var router = express.Router();
var constants = require('./constants');

router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

router.post('/search/practitioner', function(req, res) {

    var query = req.body.query;

    // Check to see if the query is empty
    if (!query || query === "") {
        res.status(401).json({
            status: "error",
            message: "You must provide a query to process your request"
        });
    }

    var doctors = function (callback) {

        //{url, method, headers, qs}
        var params = {
            url: constants.doctor.URL,
            method: constants.methods.GET,
            headers: {},
            qs: {
                q: constants.doctor.Q,
                salt: constants.doctor.SALT,
                key: constants.doctor.KEY,
                search: query
            }
        };

        httpRequest(params, function (err, response, body) {
            if (err) {

                callback(null, {
                    status: "error",
                    message: constants.doctor.SOURCE + " data not available",
                    err: err
                });
            }

            if (response.statusCode === 200) {

                htmlparser.parse(body, {results: function() {

                    return this.map('table tbody tr', function($item) {

                        var text = $item.text();
                        var details = text.split("\n");
                        var name = details[1];
                        var regDate = details[2];
                        var regNo = details[3];
                        var address = details[4];
                        var qualifications = details[5];
                        var speciality = details[6];
                        var subSpeciality = details[7];

                        return {
                            name: name.trim(),
                            regDate: regDate.trim(),
                            regNo: regNo.trim(),
                            address: address.trim(),
                            qualifications: qualifications.trim(),
                            speciality: speciality.trim(),
                            subSpeciality: subSpeciality.trim(),
                            source: constants.doctor.SOURCE,
                            type: constants.resultType.DOCTOR
                        }
                    });

                }}, function(err, result) {

                    if (err) {

                        callback(null, {
                            status: "error",
                            message: constants.doctor.SOURCE + " data not available",
                            err: err
                        });
                    }

                    callback(null, {
                        status: "success",
                        messsage: constants.doctor.SOURCE + " data available",
                        data: result.results
                    });
                });

            } else {
                callback(null, {
                    status: "error",
                    message: constants.doctor.SOURCE + " data not available",
                    err: err
                });
            }
        });
    };

    var foreignDoctors = function (callback) {

        //{url, method, headers, qs}
        var params = {
            url: constants.foreignDoctor.URL,
            method: constants.methods.GET,
            headers: {},
            qs: {
                q: constants.foreignDoctor.Q,
                salt: constants.foreignDoctor.SALT,
                key: constants.foreignDoctor.KEY,
                search: query
            }
        };

        httpRequest(params, function (err, response, body) {

            if (err) {

                callback(null, {
                    status: "error",
                    message: constants.foreignDoctor.SOURCE + " data not available",
                    err: err
                });
            }

            if (response.statusCode === 200) {

                //callback(null, response);

                htmlparser.parse(body, {results: function() {

                    return this.map('table tbody tr', function($item) {

                        var text = $item.text();
                        var details = text.split("\n");
                        var name = details[1];
                        var licenseNo = details[2];
                        var address = details[4];
                        var qualifications = details[5];
                        var facility = details[6];
                        var practiceType = details[7];

                        return {
                            name: name.trim(),
                            licenseNo: licenseNo.trim(),
                            address: address.trim(),
                            qualifications: qualifications.trim(),
                            facility: facility.trim(),
                            practiceType: practiceType.trim(),
                            source: constants.foreignDoctor.SOURCE,
                            type: constants.resultType.F_DOCTOR
                        }
                    });

                }}, function(err, result) {

                    if (err) {

                        callback(null, {
                            status: "error",
                            message: constants.doctor.SOURCE + " data not available",
                            err: err
                        });
                    }

                    callback(null, {
                        status: "success",
                        messsage: constants.foreignDoctor.SOURCE + " data available",
                        data: result.results
                    });
                });

            } else {
                callback(null, {
                    status: "error",
                    message: constants.foreignDoctor.SOURCE + " data not available",
                });
            }
        });
    };

    var nurses = function (callback) {

        //{url, method, headers, qs}
        var params = {
            url: constants.nurses.URL,
            method: constants.methods.GET,
            headers: {},
            qs: {
                q: constants.nurses.Q,
                s: query
            }
        };

        httpRequest(params, function (err, response, body) {

            if (err) {

                callback(null, {
                    status: "error",
                    message: constants.nurses.SOURCE + " data not available",
                    err: err
                });
            }

            if (response.statusCode === 200) {

                htmlparser.parse(body, {results: function() {

                    return this.map("table tbody tr", function ($item) {

                        var text = $item.text();
                        var details = text.split("\n");
                        var name = details[1];
                        var licenseNo = details[2];
                        var validTill = details[3];

                        return {
                            name: name.trim(),
                            licenseNo: licenseNo.trim(),
                            validTill: validTill.trim(),
                            source: constants.nurses.SOURCE,
                            type: constants.resultType.NURSE
                        };
                    });

                }}, function (err, result) {

                    callback(null, {
                        status: "success",
                        messsage: constants.nurses.SOURCE + " data available",
                        data: result.results
                    });
                })

            } else {
                callback(null, {
                    status: "error",
                    message: constants.nurses.SOURCE + " data not available",
                });
            }
        });
    };



    // TODO: Can't set headers after they are sent.
    async.parallel([
        doctors,
        foreignDoctors,
        nurses
    ], function (err, results) {

       results = _.map(results, standizeSearchResults);

       results = _.flattenDeep(results);

       results = _.sortBy(results, ['name']);

       res.send({
           status: 'success',
           message: "Successful search",
           results: results
       });
    });
});

router.post('/search/facility', function(req, res) {

    console.log("Searching Facility");

});

module.exports = router;


/**
 * Performs a HTTP request
 * @param params Object{url, method, headers, qs}
 * @param callback function(err, res, body)
 */
function httpRequest(params, callback) {

    request(params, function (err, response, body) {


        callback(err, response, body);
    });
}

/**
 *
 * @param result
 */
function standizeSearchResults(result) {

    var status = result.status;
    var message = result.message;
    var err = result.err;
    var data = result.data;

    if (status !== 'success' || err) {
        return [{
            status: status,
            message: message,
            err: err
        }];
    }

    if (data) {

        return data;
    }
}
