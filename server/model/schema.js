var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('../config/config').DB;

mongoose.connect(db.url);

var connection = mongoose.connection;

connection.once('open', function () {
    console.log('CONNECTED TO MONGODB')
});

connection.on('error', function (err) {
    console.log('ERROR CONNECTING TO MONGODB', err);
});

var brandsSchema = new Schema({
    name: {type: String}
});

var clothesSchema = new Schema({
    name: {type: String}
});

var BrandsColl = connection.model('brands', brandsSchema);
var ClothesColl = connection.model('clothes', clothesSchema);

module.exports = {
    BrandsColl: BrandsColl,
    ClothesColl:ClothesColl

};
