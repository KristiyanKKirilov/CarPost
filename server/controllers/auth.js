const {
    tokenBlacklistModel
} = require('../models');

const userModel = require('../models/userModel.js');
const mongoose = require('mongoose');
const utils = require('../utils');
const { authCookieName } = require('../app-config');

const bsonToJson = (data) => { return JSON.parse(JSON.stringify(data)) };
const removePassword = (data) => {
    const { password, __v, ...userData } = data;
    return userData
}

function getAllUsers(req, res, next){
    userModel
    .find()
    .then(users => {
        res.json(users);
    })
    .catch(next);
}

function getUser(req, res, next){
    const {userId} = req.params;

    userModel
    .findById(userId)
    .populate('cars')
    .then(user => {
        res.json(user);
    })
    .catch(next);
}

function register(req, res, next) {
    const { username, email, phoneNumber , password } = req.body;

    return userModel.create({ username, email, phoneNumber, password })
        .then((createdUser) => {
            createdUser = bsonToJson(createdUser);
            createdUser = removePassword(createdUser);

            const token = utils.jwt.createToken({ id: createdUser._id });
            if (process.env.NODE_ENV === 'production') {
                res.cookie(authCookieName, token, { httpOnly: true, sameSite: 'none', secure: true })
            } else {
                res.cookie(authCookieName, token, { httpOnly: true })
            }
            res.status(200)
                .send(createdUser);
        })
        .catch(err => {
            if (err.name === 'MongoError' && err.code === 11000) {
                let field = err.message.split("index: ")[1];
                field = field.split(" dup key")[0];
                field = field.substring(0, field.lastIndexOf("_"));

                res.status(409)
                    .send({ message: `This ${field} is already registered!` });
                return;
            }
            next(err);
        });
}

function login(req, res, next) {
    const { email, password } = req.body;
    userModel.findOne({ email })
        .then(user => {
            return Promise.all([user, user ? user.matchPassword(password) : false]);
        })
        .then(([user, match]) => {
            if (!match) {
                res.status(401)
                    .send({ message: 'Wrong email or password' });
                return
            }
            user = bsonToJson(user);
            user = removePassword(user);

            const token = utils.jwt.createToken({ id: user._id });

            if (process.env.NODE_ENV === 'production') {
                res.cookie(authCookieName, token, { httpOnly: true, sameSite: 'none', secure: true })
            } else {
                res.cookie(authCookieName, token, { httpOnly: true })
            }
            res.status(200)
                .send(user);
        })
        .catch(next);
}

function logout(req, res) {
    const token = req.cookies[authCookieName];

    tokenBlacklistModel.create({ token })
        .then(() => {
            res.clearCookie(authCookieName)
                .status(204)
                .send({ message: 'Logged out!' });
        })
        .catch(err => res.send(err));
}

async function getProfileInfo(req, res, next) {
    const { _id: userId } = req.user;

    userModel.findById(userId) 
        .then(user => { 
            res.status(200).json(user) 
        })
        .catch(next);
}

function getCarsByProfile(req, res, next){
    const {userId} = req.params;

    userModel
    .findById(userId)
    .populate('cars')
    .then(user => {
        console.log(user.cars);
        res.json(user.cars);
    })
    .catch(next);
}


function editProfileInfo(req, res, next) {
    const { _id: userId } = req.user;
    const { phoneNumber: phoneNumber, username, email } = req.body;

    userModel.findOneAndUpdate({ _id: userId }, { phoneNumber: phoneNumber, username, email }, { runValidators: true, new: true })
        .then(x => { res.status(200).json(x) })
        .catch(next);
}

module.exports = {
    login,
    register,
    logout,
    getProfileInfo,
    editProfileInfo,
    getAllUsers,
    getUser,
    getCarsByProfile
}
