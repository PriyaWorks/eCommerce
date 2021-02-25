const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const userSchema = mongoose.Schema({
    name: { type : String , require: true},
    type: { type : String, require: true},
    email:	{ type: String, require: true, unique: true },
    password: { type: String }
});
userSchema.plugin(uniqueValidator);

const User = module.exports = mongoose.model('user', userSchema);