const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email: { type: String, lowercase: true },
    displayName: String,
    password: { type: String, select: true },
    signupDate: { type: Date, default: Date.now() },
    lastLogin: Date
});

UserSchema.pre('save', async function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(this.password, salt, null, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            next();
        });
    });
});

UserSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password).then(function (result) {
        if (result == true) {
            return result;
        } else {
            return null;
        }
    }).catch(() => {
        return null;
    });
    return compare;
}

module.exports = mongoose.model('User', UserSchema);