import mongoose from 'mongoose';
import Event from './evenement.js';
const sdfSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    surface: {
        type: Number,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    evenement: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }]
});


let model = mongoose.model('SDF', sdfSchema);

export default class SDF {

    findAll(req, res) {
        model.find({}, {
                password: 0
            })
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

    findById(req, res) {
        model.findById(req.params.id, {
                password: 0
            })
            .populate('evenement')
            .exec((err, salleDesFetes) => {
                if (err || !salleDesFetes) {
                    res.status(500).json(err);
                } else {
                    res.json(sallesDesFetes);
                }
            });
    }

    create(req, res) {
        model.create(req.body,
            (err, salleDesFetes) => {
                if (err || !salleDesFetes) {
                    console.log(err);
                    res.status(500).send(err.message);
                } else {
                    res.json({
                        success: true,
                        salleDesFetes: salleDesFetes,
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

    updateImg(req, res) {
        console.log('body', req.body);
        model.findByIdAndUpdate({
                _id: req.params.id
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