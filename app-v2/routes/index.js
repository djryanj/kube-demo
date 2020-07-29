const express = require('express');
const mongoose = require('mongoose');
const os = require("os");
const hostname = os.hostname();
const router = express.Router();
const Registration = mongoose.model('Registration');

const { check, validationResult } = require('express-validator');


router.get('/', (req, res) => {
    res.render('form', {title: 'Registration form', hostname: hostname});
});

router.post('/', [
    check('name')
      .isLength({ min: 1 })
      .withMessage('Please enter a name'),
    check('email')
      .isLength({ min: 1 })
      .withMessage('Please enter an email'),
  ],
  (req, res) => {
      const errors = validationResult(req);

    if (errors.isEmpty()) {
        const registration = new Registration(req.body);
        registration.save()
            .then(() => { 
                res.render('thanks', { title: 'Thank you!', name: req.body.name, hostname: hostname }); 
            })
            .catch((err) => {
                console.log(err);
                res.send('Sorry! Something went wrong.');
            });
    } else {
        res.render('form', {
            title: 'Registration form',
            errors: errors.array(),
            data: req.body,
            hostname: hostname,
        });
    }
});

router.get('/registrations', (req, res) => {
    Registration.find()
    .then((registrations) => {
      res.render('index', { title: 'Listing registrations', registrations, hostname: hostname });
    })
    .catch((err) => { 
        console.log(err);
        res.send('Sorry! Something went wrong.'); 
    });
  });

module.exports = router;
