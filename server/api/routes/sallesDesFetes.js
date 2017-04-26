import express from 'express';
import SDF from '../models/salleDesFetes.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    app.get('/token_status', Auth.hasAuthorization, (req, res, next) => {
        res.sendStatus(200);
    });

    var sdf = new SDF();

    router.get('/', Auth.hasAuthorization, sdf.findAll);

    router.get('/:id', Auth.hasAuthorization, sdf.findById);

    router.post('/', sdf.create);

    //  app.post('/uploadImages/:sdfID', Auth.hasAuthorization, sdf.uploadImages);

    router.put('/:id', Auth.isAdministrator, sdf.update);

    router.delete('/:id', Auth.isAdministrator, sdf.delete);

    app.use('/sallesDesFetes', router);

};
