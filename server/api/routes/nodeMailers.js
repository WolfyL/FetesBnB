import express from 'express';
import NM from '../models/nodeMailer.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    app.get('/token_status', Auth.hasAuthorization, (req, res, next) => {
        res.sendStatus(200);
    });

    var nodeMailer = new NM();

    // router.get('/', nodeMailer.findAll);
    //
    // router.get('/result', nodeMailer.findResult);
    //
    // router.get('/:id', nodeMailer.findById);
    //
    // router.post('/', nodeMailer.create);
    //
    // router.put('/:id', Auth.isAdministrator, nodeMailer.update);
    //
    // router.delete('/:id', Auth.isAdministrator, nodeMailer.delete);

    app.use('/nodeMailer', router);

};
