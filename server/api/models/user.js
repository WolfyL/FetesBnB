import jsonwebtoken from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import token from '../token.js';

const hashCode = (s) => s.split("").reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    a & a;
}, 0);

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email address is required'],
        validate: [function(email) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        }, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    liked: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'SDF',
    }]
});

userSchema.methods.comparePassword = function(pwd, cb) {
    bcrypt.compare(pwd, this.password, function(err, isMatch) {
        if (err) cb(err);
        cb(null, isMatch);
    });
};

let model = mongoose.model('User', userSchema);

export default class User {

    connect(req, res) {
        if (!req.body.email) {
            res.status(400).send('Please enter an email');
        } else if (!req.body.password) {
            res.status(400).send('Please enter a password');
        } else {
            model.findOne({
                email: req.body.email
            }, (err, user) => {
                if (err || !user) {
                    res.sendStatus(403);
                } else {
                    user.comparePassword(req.body.password, (err, isMatch) => {
                        if (err) {
                            res.status(400).send(err);
                        } else {
                            if (isMatch) {
                                user.password = null;
                                let tk = jsonwebtoken.sign(user, token, {
                                    expiresIn: "24h"
                                });
                                res.json({
                                    success: true,
                                    user: user,
                                    token: tk
                                });
                            } else {
                                res.status(400).send('Incorrect password');
                            }
                        }
                    });
                }
            });
        }
    }

    findAll(req, res) {
        model.find({}, {
                password: 0
            }).populate('liked')
            .exec((err, users) => {
                if (err || !users) {
                    res.sendStatus(403);
                } else {
                    res.json(users);
                }
            });
    }

    findById(req, res) {
        model.findById(req.params.id, {
                password: 0
            })
            .populate('liked')
            .exec((err, user) => {
                if (err || !user) {
                    res.sendStatus(403);
                } else {
                    res.json(user);
                }
            });
    }

    create(req, res) {
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(req.body.password)) {
            res.status(400).send("Mot de passe de 6 carractères avec au moin un chiffre");
        } else {

            if (req.body.password) {
                var salt = bcrypt.genSaltSync(10);
                req.body.password = bcrypt.hashSync(req.body.password, salt);
            }
            model.create(req.body,
                (err, user) => {
                    if (err || !user) {
                        if (err.code === 11000 || err.code === 11001) {
                            err.message = "Email " + req.body.email + " already exist";
                        }
                        res.status(500).send(err.message);
                    } else {
                        let tk = jsonwebtoken.sign(user, token, {
                            expiresIn: "24h"
                        });
                        res.json({
                            success: true,
                            user: user,
                            token: tk
                        });
                    }
                });
        }
    }

    update(req, res) {
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(req.body.password) && !!req.body.password) {
            res.status(400).send("Mot de passe de 6 carractères avec au moin un chiffre");
        } else {
            if (req.body.password) {
                var salt = bcrypt.genSaltSync(10);
                req.body.password = bcrypt.hashSync(req.body.password, salt);
            }
            model.update({
                _id: req.params.id
            }, req.body, {
                runValidators: true
            }, (err, user) => {
                if (err || !user) {
                    res.status(500).send(err.message);
                } else {
                    let tk = jsonwebtoken.sign(user, token, {
                        expiresIn: "24h"
                    });
                    res.json({
                        success: true,
                        user: user,
                        token: tk
                    });
                }
            });
        }
    }
    likesdfUpdate(req, res) {
        console.log("body", req.body);
        console.log("params", req.params);
        model.findByIdAndUpdate(
            req.params.id, { $addToSet: { "liked": req.body._id } }, { safe: true, upsert: true, new: true },
            (err, user) => {
                if (err || !user) {
                    res.status(500)
                } else {
                    res.json({ liked: user.liked });
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

    delFav(req, res) {
        console.log('body', req.body);
        model.findOneAndUpdate(req.params.id, {
                $pull: {
                    "liked": req.body._id
                }
            },
            (err, test) => {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    res.sendStatus(200);
                }
            });
    }
}