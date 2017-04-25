import express from 'express';
import Upload from '../models/upload.js';
import Auth from '../middlewares/authorization.js';
// import uuid from 'node-uuid';
import multiparty from 'multiparty';
// import fs from 'fs';

let router = express.Router();

module.exports = (app) => {

    app.get('/token_status', Auth.hasAuthorization, (req, res, next) => {
        res.sendStatus(200);
    });

    var upload = new Upload();

    router.post('/', (req, res) => {
      // parse a file upload
          var form = new multiparty.Form({uploadDir: 'uploads'});

          form.parse(req, function(err, fields, files) {
            console.log(files);
            res.sendStatus(201);

          });

          return;
    });


    // app.route('/upload/image')
    //     .post(function(req, res) {
    //         var form = new multiparty.Form();
    //         form.parse(req, function(err, fields, files) {
    //             var file = files.file[0];
    //             var contentType = file.headers['content-type'];
    //             var tmpPath = file.path;
    //             var extIndex = tmpPath.lastIndexOf('.');
    //             var extension = (extIndex < 0) ? '' : tmpPath.substr(extIndex);
    //             // uuid is for generating unique filenames.
    //             var fileName = uuid.v4() + extension;
    //             var destPath = '/app/img/' + fileName;
    //
    //             // Server side file type checker.
    //             if (contentType !== 'image/png' && contentType !== 'image/jpeg') {
    //                 fs.unlink(tmpPath);
    //                 return res.status(400).send('Unsupported file type.');
    //             }
    //
    //             fs.rename(tmpPath, destPath, function(err) {
    //                 if (err) {
    //                     return res.status(400).send('Image is not saved:');
    //                 }
    //                 return res.json(destPath);
    //             });
    //         });
    //     });

    // router.get('/', Auth.hasAuthorization, upload.findAll);
    //
    // router.get('/:id', Auth.hasAuthorization, upload.findById);
    //
    // router.post('/', upload.create);
    //
    // router.put('/:id', Auth.isAdministrator, upload.update);
    //
    // router.delete('/:id', Auth.isAdministrator, upload.delete);
    //
    app.use('/upload', router);

};
