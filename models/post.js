var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var schema = new Schema({
    content: {type: String, required: true},
    username: {type: String},
    timestamp: {type: Date}
});

schema.post('remove', function(message) {
    User.findById(message.user, function(err, user) {
       user.messages.pull(message._id);
       user.save();
    });
});

module.exports = mongoose.model('Post', schema);