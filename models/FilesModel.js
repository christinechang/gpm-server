const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filesSchema = new Schema ({
    name: {type: String, required: true},
    type: {type: String}
}) 

module.exports = mongoose.model('files', filesSchema) 
