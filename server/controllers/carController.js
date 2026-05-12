const carModel = require('../models/carModel.js');
const { populate } = require('../models/userModel.js');
const userModel = require('../models/userModel.js');
const mongoose = require('mongoose');

function getLatestCars(req, res, next) {
    carModel.find()
    .sort({createdAt: -1})
        .limit(4)
        .then(cars => {
            console.log(cars);
            res.json(cars);
        })
        .catch(next);
}


function getAllCars(req, res, next) {
    carModel.find()
        .then(cars => res.json(cars))
        .catch(next);
}


function getCar(req, res, next) {
    const { carId } = req.params;

    carModel.findById(carId)
            .populate('userId')
            .then(car => {
            res.json(car);
        })
        .catch(next);
}

function createCar(req, res, next) {
    if (!req.user?._id) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const carData = { ...req.body, userId: req.user._id };
    delete carData._id;

    carModel.create(carData)
        .then(car => {
            return userModel.updateOne(
                { _id: req.user._id },
                { $addToSet: { cars: car._id } }
            ).then(() => car);
        })
        .then(car => res.status(201).json(car))
        .catch(next);
}
function updateCar(req, res, next) {
    const carId = req.params.carId; 
    const carData = { ...req.body };

    if (!carId) {
        return res.status(400).json({ message: 'Car ID is required' });
    }

    if (!carData) {
        return res.status(400).json({ message: 'No data provided to update' });
    }

    // Ownership check is already done by isOwner middleware
    // Prevent ownership transfer / editing immutable identifiers
    delete carData._id;
    delete carData.userId;

    // Proceed directly with update
    carModel.findByIdAndUpdate(carId, carData, { new: true, runValidators: true })
        .then(updatedCar => {
            res.status(200).json(updatedCar); 
        })
        .catch(next);
}

function deleteCar(req, res, next) {
    const carId = req.params.carId;

    console.log('Car ID to delete:', carId);

    if (!mongoose.Types.ObjectId.isValid(carId)) {
        return res.status(400).json({ message: 'Invalid Car ID' });
    }

    // Ownership check is already done by isOwner middleware
    // Proceed directly with deletion
    carModel.findByIdAndDelete(carId)
        .then(deletedCar => {
            return userModel.updateOne(
                { cars: carId }, 
                { $pull: { cars: carId } } 
            ).then(() => {
                res.status(200).json({ message: 'Car deleted successfully' });
            });
        })
        .catch(next);
}
module.exports = {
    createCar,
    getCar,
    getAllCars,
    getLatestCars,
    updateCar,
    deleteCar
}
