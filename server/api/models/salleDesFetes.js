import mongoose from 'mongoose';

import Event from './evenement.js';

import request from 'request';

import removeAccents from 'remove-accents';

import moment from 'moment';

const sdfSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    postalCode: {
        type: String,
        required: true,
    },
    adress: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    surface: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    coordo: {
        lat: String,
        lng: String
    },
    evenement: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    handler: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    image: [String]
});


const model = mongoose.model('SDF', sdfSchema);

function filterSalles(salles, array, ville, capacity, callback) {
    if (ville === '' && capacity === undefined) {
        salles.map(salle => {
            array.push(salle);
        });
        callback(array);
    }
    if (ville !== '' && capacity !== undefined) {
        salles.map(salle => {
            if (salle.city === ville) {
                if (salle.capacity <= capacity) {
                    array.push(salle);
                }
            }
        });
        callback(array);
    } else if (capacity !== undefined) {
        salles.map(salle => {
            if (salle.capacity <= capacity) {
                array.push(salle);
            }
        });
        callback(array);
    } else if (ville !== '') {
        salles.map(salle => {
            if (salle.city === ville) {
                array.push(salle);
            }
        });
        callback(array);
    }
}



export default class SDF {
    updateImg(req, res) {
        console.log('body', req.body);
        model.findByIdAndUpdate(
            req.params.id, {
                $push: { image: req.body.image }
            }, {
                upsert: true,
            },
            (err, salleDesFetes) => {
                if (err || !salleDesFetes) {
                    res.status(500).send(err.message);
                } else {
                    res.json({
                        success: true,
                        salleDesFetes: salleDesFetes,
                    });
                }
            });
    }

    findAll(req, res) {
        model.find({})
            .populate('evenement')
            .exec((err, sallesDesFetes) => {
                if (err || !sallesDesFetes) {
                    console.log(err);
                    res.status(500).json(err);
                } else {
                    res.json(sallesDesFetes);
                }
            });
    }

    getMySDF(req, res) {
        model.find({
                handler: req.params.handler
            })
            .populate('evenement')
            .exec((err, sallesDesFetes) => {
                if (err || !sallesDesFetes) {
                    res.status(500).send(err.message);
                } else {
                    res.json(sallesDesFetes);
                }
            });
    }

    findResult(req, res) {
        console.log("YOHO ET UNE BOUTEILLE DE SKY");

        model.find({})
            .populate('evenement')
            .exec((err, sallesDesFetes) => {
                if (err || !sallesDesFetes) {
                    console.log(err);
                    res.status(500).json(err);
                } else {
                    filterSalles(sallesDesFetes, [], req.query.ville, req.query.capacity, function(result) {
                        res.json(result);
                    });
                }
            });
    }

    findById(req, res) {
        model.findById(req.params.id)
            .populate('evenement')
            .exec((err, salleDesFetes) => {
                if (err || !salleDesFetes) {
                    res.status(500).json(err);
                } else {
                    res.json(salleDesFetes);
                }
            });
    }


    getHandler(req, res) {
        model.findById(req.params.id)
            .populate({
                path: 'handler',
                select: 'email'
            })
            .exec((err, salleDesFetes) => {
                if (err || !salleDesFetes) {
                    res.status(500).json(err);
                } else {
                    res.json(salleDesFetes);
                }
            });
    }

    getImg(req, res) {
        console.log('body', req.body);
        model.findByIdAndUpdate({
                _id: req.params.image
            }, req.body, {
                new: true
            },
            (err, salleDesFetes) => {
                if (err || !salleDesFetes) {
                    res.status(500).send(err.message);
                } else {
                    res.json({
                        success: true,
                        salleDesFetes: salleDesFetes,
                    });
                }
            });
    }

    create(req, res) {
        let coordo;
        model.create(req.body,
            (err, salleDesFetes) => {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    //adress et city puis france
                    request('https://maps.googleapis.com/maps/api/geocode/json?address=' + removeAccents(salleDesFetes.adress) + salleDesFetes.postalCode + removeAccents(salleDesFetes.city) + '&key=AIzaSyAwtHS2XSIYvSChTHcQPyf1Fs3K8GPSs7w', function(error, result, body) {
                        var donnee = JSON.parse(result.body);
                        coordo = {
                            lat: donnee.results[0].geometry.location.lat,
                            lng: donnee.results[0].geometry.location.lng
                        };
                        model.findOneAndUpdate({
                            _id: salleDesFetes._id
                        }, {
                            coordo: coordo
                        }, {
                            upsert: true,
                            new: true
                        }, (err, salleDesFetes) => {
                            console.log("JE SUIS DANS L UPDATE");
                            console.log(coordo);
                            if (err || !salleDesFetes) {
                                res.status(500).send(err.message);
                            } else {
                                res.json({
                                    success: true,
                                    salleDesFetes: salleDesFetes,
                                });
                            }
                        });
                    });
                }
            });
    }

    update(req, res) {
        console.log('body', req.body);
        model.findByIdAndUpdate({
                _id: req.params.id
            }, {
                $addToSet: {
                    evenement: req.body._id
                }
            }, {
                new: true
            },
            (err, salleDesFetes) => {
                if (err || !salleDesFetes) {
                    res.status(500).send(err.message);
                } else {
                    res.json({
                        success: true,
                        salleDesFetes: salleDesFetes,
                    });
                }
            });
    }


    delete(req, res) {
        model.findByIdAndRemove(req.params.id, (err) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.sendStatus(200);
            }
        });
    }
}