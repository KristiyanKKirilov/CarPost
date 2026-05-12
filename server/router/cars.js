const express = require('express');
const router = express.Router();
const { auth, isOwner } = require('../utils');
const carController  = require('../controllers/carController.js');
const carModel = require('../models/carModel.js');

// middleware that is specific to this router

router.get('/',  carController.getAllCars);
router.post('/', auth(), carController.createCar);

// Define specific routes BEFORE parameterized routes
router.get('/latest/createdAt', carController.getLatestCars);

router.get('/:carId', carController.getCar);
router.put('/:carId', auth(), isOwner(carModel), carController.updateCar);
router.delete('/:carId', auth(), isOwner(carModel), carController.deleteCar);

// router.get('/my-trips/:id/reservations', auth(), themeController.getReservations);

module.exports = router
