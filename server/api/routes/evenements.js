import express from 'express';
import Event from '../models/evenement.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    app.get('/token_status', Auth.hasAuthorization, (req, res, next) => {
        res.sendStatus(200);
    });

    var evenement = new Event();

    router.get('/', evenement.findAll);

    router.get('/:id', Auth.hasAuthorization, evenement.findById);

    router.post('/', evenement.create);

    //  app.post('/uploadImages/:evenementID', Auth.hasAuthorization, evenement.uploadImages);

    router.put('/:id', Auth.isAdministrator, evenement.update);

    router.delete('/:id', Auth.isAdministrator, evenement.delete);

    app.use('/evenement', router);

};
