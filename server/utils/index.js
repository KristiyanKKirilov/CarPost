const jwt = require('./jwt');
const { auth, isOwner } = require('./auth');
const errorHandler = require('./errHandler');

module.exports = {
    jwt,
    auth,
    isOwner,
    errorHandler
}
