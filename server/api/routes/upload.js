import express from 'express';
import Auth from '../middlewares/authorization.js';
import uploadImage from '../libs/imageUpload.js';
let router = express.Router();

module.exports = (app) => {

    var img = new uploadImage();


    router.post("/send/", img.create);

    router.get("/send", img.getAll);

    app.use('/static/img', express.static('../public/upload'));

    app.use('/img', router);

};