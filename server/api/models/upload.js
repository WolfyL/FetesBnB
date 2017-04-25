import mongoose from 'mongoose';
import uuid from 'node-uuid';
import multiparty from 'multiparty';
import fs from 'fs';

const uploadSchema = new mongoose.Schema({
    name:  {
        type: String,
        required: true
    },
    text: {
      type: String
    }
});


let model = mongoose.model('Upload', uploadSchema);

export default class upload {

    findAll(req, res) {
        model.find({}, {
            password: 0
        }, (err, uploads) => {
            if (err || !uploads) {
                res.sendStatus(403);
            } else {
                res.json(uploads);
            }
        });
    }

    findById(req, res) {
        model.findById(req.params.id, {
            password: 0
        }, (err, upload) => {
            if (err || !upload) {
                res.sendStatus(403);
            } else {
                res.json(upload);
            }
        });
    }

    create(req, res) {
        model.create(req.body,
            (err, upload) => {
                if (err || !upload) {
                    console.log(err);
                    res.status(500).send(err.message);
                } else {
                    res.json({
                        success: true,
                        upload: upload,
                    });
                }
            });
    }



    update(req, res) {
        model.findByIdAndUpdate({
            _id: req.params.id
        }, req.body, (err, upload) => {
            if (err || !upload) {
                res.status(500).send(err.message);
            } else {
                res.json({
                    success: true,
                    upload: upload,
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
