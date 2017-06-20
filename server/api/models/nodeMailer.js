import mongoose from 'mongoose';

const nodeMailerSchema = new mongoose.Schema({

});


let model = mongoose.model('NM', nodeMailerSchema);

export default class NM {

    findAll(req, res) {
        model.find({}, {
            password: 0
        }, (err, nodeMailers) => {
            if (err || !nodeMailers) {
                res.sendStatus(403);
            } else {
                res.json(nodeMailers);
            }
        });
    }

    findById(req, res) {
        model.findById(req.params.id, {
            password: 0
        }, (err, nodeMailer) => {
            if (err || !nodeMailer) {
                res.sendStatus(403);
            } else {
                res.json(nodeMailer);
            }
        });
    }

    create(req, res) {
        console.log('body create event', req.body);
        model.create(req.body,
            (err, nodeMailer) => {
                if (err || !nodeMailer) {
                    console.log(err);
                    res.status(500).send(err.message);
                } else {
                  console.log(nodeMailer,'ici');
                    res.json(nodeMailer);
                }
            });
    }

    update(req, res) {
        console.log('body', req.body);

        model.findByIdAndUpdate({
            _id: req.params.id
        }, req.body, (err, nodeMailer) => {
            if (err || !nodeMailer) {
                res.status(500).send(err.message);
            } else {
                res.json({
                    success: true,
                    nodeMailer: nodeMailer,
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
