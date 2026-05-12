const jwt = require('./jwt');
const { authCookieName } = require('../app-config');
const {
    userModel,
    tokenBlacklistModel
} = require('../models');

function auth(redirectUnauthenticated = true) {

    return function (req, res, next) {
        const token = req.cookies[authCookieName] || '';
        console.log('Token:', token, 'Type:', typeof token);

        Promise.all([
            jwt.verifyToken(token),
            tokenBlacklistModel.findOne({ token })
        ])
            .then(([data, blacklistedToken]) => {
                if (blacklistedToken) {
                    return Promise.reject(new Error('blacklisted token'));
                }
                userModel.findById(data.id)
                    .then(user => {
                        req.user = user;
                        req.isLogged = true;
                        next();
                    })
            })
            .catch(err => {
                if (!redirectUnauthenticated) {
                    next();
                    return;
                }
                if (['token expired', 'blacklisted token', 'jwt must be provided'].includes(err.message)) {
                    console.error(err);
                    res
                        .status(401)
                        .send({ message: "Invalid token!" });
                    return;
                }
                next(err);
            });
    }
}

function isOwner(carModel) {
    return function (req, res, next) {
        if (!req.isLogged) {
            return res.status(401).send({ message: "Unauthorized" });
        }

        const carId = req.params.carId;
        
        carModel.findById(carId)
            .then(car => {
                if (!car) {
                    return res.status(404).send({ message: "Car not found" });
                }

                const isOwner = car.userId.toString() === req.user._id.toString();

                if (!isOwner) {
                    return res.status(403).send({ message: "Forbidden: You can only edit/delete your own cars" });
                }

                next();
            })
            .catch(err => next(err));
    };
}

module.exports = {
    auth,
    isOwner
};
