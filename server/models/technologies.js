const mongoose = require('mongoose');
const { Schema } = mongoose;

const TechnologySchema = new Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    category: { type: String, required: true }
});

module.exports = mongoose.model('Technology', TechnologySchema);