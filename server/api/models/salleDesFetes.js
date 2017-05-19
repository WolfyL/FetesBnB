import mongoose from 'mongoose';

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
});


let model = mongoose.model('SDF', sdfSchema);

export default class SDF {

    findAll(req, res) {
        model.find({}, {
            password: 0
        }, (err, sallesDesFetes) => {
            console.log('err',err,'sdfs found', sallesDesFetes);
            if (err || !sallesDesFetes) {
                                console.log(err)
                res.status(500).json(err);
            } else {
                res.json(sallesDesFetes);
            }
        });
    }

    findById(req, res) {
        model.findById(req.params.id,
         (err, sallesDesFetes) => {
            if (err || !sallesDesFetes) {
                console.log(err)
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
        model.findByIdAndUpdate({
            _id: req.params.id
        }, req.body, (err, salleDesFetes) => {
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
