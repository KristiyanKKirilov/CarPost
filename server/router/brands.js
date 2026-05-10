const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const  brandController  = require('../controllers/brandController.js');

// middleware that is specific to this router
router.get('/',  brandController.getAllBrands);
router.post('/', brandController.createBrand);

router.get('/:brandId', brandController.getAllCarsByCurrentBrand);

// router.get('/my-trips/:id/reservations', auth(), themeController.getReservations);

module.exports = router
