const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const schema = new Schema({
    name:           String,
    occupation:     String,
    catchPhrase:    String
});

const Celebrity = mongoose.model("celebrities", schema);

module.exports = Celebrity;