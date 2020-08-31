var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var testSchema = new mongoose.Schema({
  item: {
    type: String
  }
},
{ timestamps: true });

mongoose.model('test', testSchema);