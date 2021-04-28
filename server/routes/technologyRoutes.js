const express = require('express');
const router = express.Router();
const technologyController = require('../controllers/technologyController');
const authController = require('../controllers/authController');
const passport = require('passport');

router.post('/users/signup', passport.authenticate('signup', { session: false }), authController.signUp);
router.post('/users/login', authController.logIn);
router.get('/users/profile', passport.authenticate('jwt', { session: false }), authController.profile);
router.get('/users/technologies', passport.authenticate('jwt', { session: false }), technologyController.getTechnologies);
router.get('/users/technologies/:id', passport.authenticate('jwt', { session: false }), technologyController.getTechnology);
router.post('/users/technologies/', passport.authenticate('jwt', { session: false }), technologyController.postTechnology);
router.put('/users/technologies/:id', passport.authenticate('jwt', { session: false }), technologyController.putTechnology);
router.delete('/users/technologies/:id', passport.authenticate('jwt', { session: false }), technologyController.deleteTechnology);

module.exports = router;