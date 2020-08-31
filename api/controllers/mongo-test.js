const mongoose = require('mongoose');
const Test = mongoose.model('test');

module.exports.addTestData = async function(req, res) {

    var testDoc = {
        item: req.query.item
    };
  
    var doc = new Test (testDoc);

    await doc.save(function(error, result) {
    if (error) {
        return res.status(500).json({"status":500, "message":error.message, "error":error});
    }
  
    return res.status(201).json(result);
    });
};

module.exports.getTestData = async function(req, res) {

    Test.find().exec(function(error, result) {
      if (error) {
          return res.status(500).json({"status":500, "message":error.message, "error":error})
      } else {
        return res.status(200).json(result);
      }
    });
};
