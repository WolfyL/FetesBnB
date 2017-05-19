import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
        title: String,
        start: Date,
        end: Date,
        allDay: Boolean
});


let model = mongoose.model('Event', eventSchema);

export default class Event {

    findAll(req, res) {
        model.find({}, {
            password: 0
        }, (err, evenements) => {
            if (err || !evenements) {
                res.sendStatus(403);
            } else {
                res.json(evenements);
            }
        });
    }

    findById(req, res) {
        model.findById(req.params.id, {
            password: 0
        }, (err, evenement) => {
            if (err || !evenement) {
                res.sendStatus(403);
            } else {
                res.json(evenement);
            }
        });
    }

    create(req, res) {
        console.log('body create event', req.body);
        model.create(req.body,
            (err, evenement) => {
                if (err || !evenement) {
                    console.log(err);
                    res.status(500).send(err.message);
                } else {
                  console.log(evenement,'ici');
                    res.json(evenement);
                }
            });
    }

    update(req, res) {
        console.log('body', req.body);

        model.findByIdAndUpdate({
            _id: req.params.id
        }, req.body, (err, evenement) => {
            if (err || !evenement) {
                res.status(500).send(err.message);
            } else {
                res.json({
                    success: true,
                    evenement: evenement,
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
