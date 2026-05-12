const jwt = require('./jwt');
const { auth, isAdmin } = require('./auth');
const errorHandler = require('./errHandler');

module.exports = {
    jwt,
    auth,
    isAdmin,
    errorHandler
}
