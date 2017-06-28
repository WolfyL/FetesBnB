import multer from 'multer';
import path from 'path';
import mongoose from 'mongoose';
import fs from 'fs';
import dir from 'node-dir';

let imageDir = path.join(__dirname, '../../public/upload');
/* Multer storage settings */
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, imageDir);
    },
    filename: function(req, file, cb) {
        let datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
});

let upload = multer({
    storage: storage
}).single('file');

export default class Image {

    create(req, res) {
        upload(req, res, function(err) {
            if (err) {
                res.status(500).send(err.message);
            } else {
                console.log(req)
                res.json({
                    success: true,
                    filename: req.file.filename
                });
            }
        });
    }

    getAll(req, res) {
        dir.files(imageDir, function(err, files) {
            if (err) throw err;
            console.log(files);
            let fileNames = files.map((file) => {
                return { fileName: file };
            });
            console.log(fileNames);
            res.json(fileNames);
        });
    }


}