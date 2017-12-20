console.log("-- crudOp.js begins! -- ");
var express = require("express");
var usermongo = require("../models/mongo");

console.log("-- crudOp.js code begins! -- ");

var CrudOp = {};

CrudOp.getUser = (req, res) => {
    console.log("USER GET");
    var response = {};
    usermongo.find({}, function (err, data) {
        if (err) {
            console.log(err);
            response = {
                "error": true,
                "message": "Error fetching data"
            };
        } else {
            response = {
                "error": false,
                "message": data
            };
        }
    res.json(response);
    });
}

CrudOp.addUser = (req, res) => {
console.log("USER POST");
var db = new usermongo();
var response = {};
db.name = req.body.name;
db.email = req.body.email;
db.username = req.body.username;
db.password = require('crypto').createHash('sha1').update(req.body.password).digest('base64');
db.mobile = req.body.mobile;
db.pradd.addln1 = req.body.addln1;
db.pradd.addln2 = req.body.addln2;
db.pradd.lmrk = req.body.lmrk;
db.pradd.city = req.body.city;
db.pradd.state = req.body.state;
db.pradd.pin = req.body.pin;
db.scadd.scaddln1 = req.body.scaddln1;
db.scadd.scaddln2 = req.body.scaddln2;
db.scadd.sclmrk = req.body.sclmrk;
db.scadd.sccity = req.body.sccity;
db.scadd.scstate = req.body.scstate;
db.scadd.scpin = req.body.scpin;
usermongo.findOne({
    email: req.body.email
}, function (err, data) {
    if (err) {
        response = {
            "error": true,
            "message": "Error while checking email in database"
        };
        res.json(response);
    } else {
        if (data != null) {
            response = {
                "error": true,
                "message": "Email has been taken"
            };
            res.json(response);
        } else {
            usermongo.findOne({
                username: req.body.username
            }, function (err, userdata) {
                if (err) {
                    response = {
                        "error": true,
                        "message": "Error while checking username in database"
                    };
                    res.json(response);
                } else {
                    if (userdata != null) {
                        response = {
                            "error": true,
                            "message": "Username has been taken"
                        };
                        res.json(response);
                    } else {
                        db.save(function (err) {
                            if (err) {
                                response = {
                                    "error": true,
                                    "message": err
                                };
                                res.json(response);
                            } else {
                                response = {
                                    "error": false,
                                    "message": "Registration successful!"
                                };
                                res.json(response);
                            }
                        });
                    }
                }
            });
        }
    }
});
}

CrudOp.getUserbyId = (req, res) => {
    console.log("FIND USER GET BY ID");
    var response = {};
    usermongo.findById(req.params.id, function (err, data) {
        if (err) {
            console.log(err);
            response = {
                "error": true,
                "message": "Error fetching data"
            };
        } else {
            response = {
                "error": false,
                "message": data
            };
        }
        res.json(response);
    });
}

CrudOp.updateUserbyId = (req, res) => {
    console.log("FIND USER PUT BY ID");
    var response = {};
    usermongo.findByIdAndUpdate(req.params.id, {
        $set: req.body,
        scadd: req.body,
        pradd: req.body
    }, {
        new: true
    }, function (err, result) {
        if (err) {
            console.log(err);
            res.json(500, {
                data: err,
                message: "Error updating data"
            });
        } else {
            res.json(202, {
                data: result,
                message: "Data is updated for id " + req.params.id
            });
        }
        res.json(response);
    });
}

CrudOp.deleteUserbyId = (req, res) => {
    console.log("FIND USER DELETE BY ID");
    var response = {};
    usermongo.findById(req.params.id, function (err, data) {
        if (err) {
            response = {
                "error": true,
                "message": "Error fetching data"
            };
        } else {
            usermongo.remove({
                _id: req.params.id
            }, function (err) {
                if (err) {
                    console.log(err);
                    response = {
                        "error": true,
                        "message": "Error deleting data"
                    };
                } else {
                    response = {
                        "error": true,
                        "message": "Data associated with id " + req.params.id + " is deleted"
                    };
                }
                res.json(response);
            });
        }
    });
}

CrudOp.getUserbyEmail = (req, res) => {
    console.log("FIND USER BY EMAIL GET");
    var response = {};
    usermongo.findOne({
        email: req.params.email
    }, function (err, data) {
        if (err) {
            console.log(err);
            response = {
                "error": true,
                "message": "Error fetching data"
            };
        } else {
            response = {
                "error": false,
                "message": data
            };
        }
        res.json(response);
    });
};

CrudOp.updateUserbyEmail = (req, res) => {
    console.log("FIND USER BY EMAIL PUT");
    usermongo.findOneAndUpdate({
        email: req.params.email
    }, {
        $set: req.body,
        scadd: req.body,
        pradd: req.body
    }, {
        new: true
    }, function (err, result) {
        if (err) {
            console.log(err);
            res.json(500, {
                data: err,
                message: "ERROR while updating data"
            });
        } else {
            res.json(200, {
                data: result,
                message: "Data is updated for user : " + req.params.email
            });
        }
    });
};

CrudOp.getUserbyName = (req, res) => {
    console.log("FIND USER BY NAME GET");
    var response = {};
    usermongo.find({
        name: req.params.name
    }, function (err, data) {
        if (err) {
            console.log(err);
            response = {
                "error": true,
                "message": "Error fetching data"
            };
        } else {
            response = {
                "error": false,
                "message": data
            };
        }
        res.json(response);
    });
};

CrudOp.updateUserbyName = (req, res) => {
    console.log("FIND USER BY NAME PUT");
    usermongo.update({
        name: req.params.name
    }, {
        $set: {
            "scadd.scpin": req.body.scpin,
            "pradd.pin": req.body.pin
        }
    }, {
        multi: true
    }, function (err, result) {
        if (err) {
            console.log(err);
            res.json(500, {
                data: err,
                message: "Error updating data"
            });
        } else {
            res.json(202, {
                data: result,
                message: "Data is updated for user : " + req.params.name
            });
        }
    });
};

module.exports = CrudOp