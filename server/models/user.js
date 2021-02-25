var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    userName: {type:String, required:true},
    topic: {type:Array, required:true}
});

module.exports = mongoose.model('User',schema);