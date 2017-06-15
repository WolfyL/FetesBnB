import mongoose from 'mongoose';

import Event from './evenement.js';

const sdfSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  adress: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  surface: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  evenement: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
  }],
});


const model = mongoose.model('SDF', sdfSchema);

function filterSalles(salles, array, ville, capacity, callback) {

  if (ville === '' && capacity === undefined) {
    salles.map(salle=>{
      array.push(salle);
    });
    callback(array);
  }
  if (ville !== '' && capacity !== undefined) {
    salles.map(salle => {
      if (salle.city === ville) {
        if(salle.capacity <= capacity){
          array.push(salle);
        }
      }
    });
    callback(array);
  }
  else if (capacity !== undefined) {
      salles.map(salle => {
        if (salle.capacity <= capacity) {
          array.push(salle);
        }
      });
      callback(array);
    }
  else if (ville !== '') {
      salles.map(salle => {
        if (salle.city === ville) {
          array.push(salle);
        }
      });
      callback(array);
    }
}

export default class SDF {

  findAll(req, res) {
    model.find({}, {
        password: 0
      })
      .populate('evenement')
      .exec((err, sallesDesFetes) => {
        if (err || !sallesDesFetes) {
          console.log(err);
          res.status(500).json(err);
        } else {
          res.json(sallesDesFetes);
        }
      });
  }


  findResult(req, res) {
    model.find({}, {
        password: 0
      })
      .populate('evenement')
      .exec((err, sallesDesFetes) => {
        if (err || !sallesDesFetes) {
          console.log(err);
          res.status(500).json(err);
        } else {
          filterSalles(sallesDesFetes, [], req.query.ville, req.query.capacity, function(result) {
            res.json(result);
          });
          //res.json(sallesDesFetes);
        }
      });
  }

  findById(req, res) {
    model.findById(req.params.id, {
        password: 0
      })
      .populate('evenement')
      .exec((err, salleDesFetes) => {
        if (err || !salleDesFetes) {
          res.status(500).json(err);
        } else {
          res.json(sallesDesFetes);
        }
      });
  }

  create(req, res) {
    model.create(req.body,
      (err, salleDesFetes) => {
        if (err || !salleDesFetes) {
          console.log(err);
          res.status(500).send(err.message);
        } else {
          res.json({
            success: true,
            salleDesFetes: salleDesFetes,
          });
        }
      });
  }

  update(req, res) {
    console.log('body', req.body);
    model.findByIdAndUpdate({
        _id: req.params.id
      }, {
        $addToSet: {
          evenement: req.body._id
        }
      }, {
        new: true
      },
      (err, salleDesFetes) => {
        if (err || !salleDesFetes) {
          res.status(500).send(err.message);
        } else {
          res.json({
            success: true,
            salleDesFetes: salleDesFetes,
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
