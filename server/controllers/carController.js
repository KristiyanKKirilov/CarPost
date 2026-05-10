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
    const carData = req.body;
    const userId = carData.userId; 

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    carModel.create(carData)
        .then(car => {
            return userModel.updateOne(
                { _id: userId },
                { $push: { cars: car._id } }
            ).then(() => car); 
        })
        .then(car => {
            res.status(201).json(car); 
        })
        .catch(next); 
}
function updateCar(req, res, next) {
    const carId = req.params.carId; 
    const carData = req.body; 

    if (!carId) {
        return res.status(400).json({ message: 'Car ID is required' });
    }

    if (!carData) {
        return res.status(400).json({ message: 'No data provided to update' });
    }

    carModel.findByIdAndUpdate(carId, carData, { new: true, runValidators: true })
        .then(updatedCar => {
            if (!updatedCar) {
                return res.status(404).json({ message: 'Car not found' });
            }

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

    carModel.findByIdAndDelete(carId)
        .then(deletedCar => {
            if (!deletedCar) {
                return res.status(404).json({ message: 'Car not found' });
            }

            return userModel.updateOne(
                { cars: carId }, 
                { $pull: { cars: carId } } 
            ).then(() => {
                res.status(200).json({ message: 'Car and association deleted successfully' });
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
