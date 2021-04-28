
const request = require('request');
const freeController = {};

const requestOptions = {
    url: 'https://random.dog/woof.json',
    method: 'GET',
    json: {},
};

freeController.getFree = async (req, res) => {
    request(requestOptions, (err, response, body) => {
        if (err) {
            res.json('Error');
        } else if (response.statusCode === 200) {
            res.json(body.url);
        } else {
            res.json('Error');
        }
    });
};


module.exports = freeController;