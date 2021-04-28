const passport = require('passport');
const jwt = require('jsonwebtoken');

const authController = {};

authController.signUp = async (req, res, next) => {
    res.json({
        message: 'Signup successful',
        user: req.user,
    });
}

authController.logIn = async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err || !user) {
                const error = new Error(err);
                return next(error);
            }
            req.login(user, { session: false }, async (err) => {
                if (err) return next(err);
                const expiresIn = 24 * 60 * 60;
                const body = { _id: user._id, email: user.email };
                const token = jwt.sign({ user: body }, 'top_secret', { expiresIn: expiresIn });
                return res.json({ token, expiresIn });
            })
        }
        catch (e) {
            return next(e);
        }
    })(req, res, next);
}

authController.profile = async (req, res, next) => {
    res.json({
        message: 'You did it!',
        user: req.user,
        token: req.query.secret_token,
    });
}

module.exports = authController;