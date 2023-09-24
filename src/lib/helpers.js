const bcrypt = require('bcryptjs');

const helpers = {};

helpers.encryptPassword = async (passwoord) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(passwoord, salt);
    return hash;
};

helpers.matchPassword = async (passwoord, savedPassword) => {
    try{
        return await bcrypt.compare(passwoord, savedPassword);
    }
    catch(e){
        console.log(e);
    }
};


module.exports = helpers;