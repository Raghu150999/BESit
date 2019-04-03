const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reqSchema = new Schema(
{
    title: String,
    desc: String,
    timestamp: Date,
    username: String
});

let Requirement = mongoose.model('requirement', reqSchema);

const db = mongoose.connection;
const collection = db.collection('requirement');

module.exports = Requirement;