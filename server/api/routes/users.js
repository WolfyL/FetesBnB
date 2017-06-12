import express from 'express';
import User from '../models/user.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    app.get('/token_status', Auth.hasAuthorization, (req, res, next) => {
        res.sendStatus(200);
    });

    var user = new User();

    router.get('/isAdmin', Auth.isAdministrator, function(req, res) {
        res.sendStatus(200);
    });

    app.post('/login', user.connect);

    router.get('/', Auth.isAdministrator, user.findAll);

    router.put('/sdf/liked/:id', Auth.hasAuthorization, user.likesdfUpdate);

    router.get('/:id', Auth.hasAuthorization, user.findById);

    router.post('/', user.create);

    router.put('/:id', Auth.hasAuthorization, user.update);

    router.delete('/:id', Auth.isAdministrator, user.delete);

    router.put('/liked/:id', Auth.hasAuthorization, user.delFav);

    app.use('/users', router);

};