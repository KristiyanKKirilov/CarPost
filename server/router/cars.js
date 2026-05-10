const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const carController  = require('../controllers/carController.js');

// middleware that is specific to this router

router.get('/',  carController.getAllCars);
router.post('/', carController.createCar);

router.get('/:carId', carController.getCar);
router.put('/:carId', carController.updateCar);
router.delete('/:carId', carController.deleteCar);
router.get('/latest/createdAt', carController.getLatestCars);

// router.get('/my-trips/:id/reservations', auth(), themeController.getReservations);

module.exports = router
