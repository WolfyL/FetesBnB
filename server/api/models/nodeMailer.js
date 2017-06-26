import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';



var mailer = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 's.leheup@gmail.com',
    pass: '^^voyko^^'
  }
});



var options = {
  viewEngine: {
    extname: '.hbs',
    layoutsDir: './api/views/email/',
    defaultLayout: 'template',
    partialsDir: './api/views/partials/'
  },
  viewPath: './api/views/email/',
  extName: '.hbs'
};

mailer.use('compile', hbs(options));


// let model = mongoose.model('NM', nodeMailerSchema);

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
    mailer.sendMail({
       from: 's.leheup@gmail.com',
       to: 'olivier.goy.37@gmail.com',
       subject: 'TACITEMENT',
       template: 'email_body',
       context: {
            variable1 : 'value1',
            variable2 : 'value2'
       }
   }, function (error, response) {
     if(error){
       console.log(error);
     }
     else{

       console.log('mail sent to ' + 'BOB');
       mailer.close();
     }
   });
  }
  // console.log('body create event', req.body);
  // model.create(req.body,
  //     (err, nodeMailer) => {
  //         if (err || !nodeMailer) {
  //             console.log(err);
  //             res.status(500).send(err.message);
  //         } else {
  //           console.log(nodeMailer,'ici');
  //             res.json(nodeMailer);
  //         }
  //     });
  // }

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
