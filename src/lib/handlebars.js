const { format } = require('timeago.js');

const helpers = {};

helpers.tiemago = (timestamp) => {
    return format(timestamp);
};

module.exports = helpers;