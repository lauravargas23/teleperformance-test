const TechnologyModel = require('../models/technologies');
const technologyController = {};

technologyController.getTechnologies = async (req, res) => {
    const technologies = await TechnologyModel.find();
    res.json(technologies);
};

technologyController.postTechnology = async (req, res) => {
    const technology = new TechnologyModel({
        title: req.body.title,
        url: req.body.url,
        category: req.body.category
    });
    await technology.save();
    res.json({
        'status': 'Technology saved'
    });
};

technologyController.getTechnology = async (req, res) => {
    const technologyId = req.params.id;
    const technology = await TechnologyModel.findById(technologyId);
    res.json({
        'status': technology,
    });
};

technologyController.putTechnology = async (req, res) => {
    const technologyId = req.params.id;
    const technology = {
        title: req.body.title,
        url: req.body.url,
        category: req.body.category
    };
    await TechnologyModel.findByIdAndUpdate(technologyId, { $set: technology }, { new: true });
    res.json({
        'status': 'Technology updated',
    });
};

technologyController.deleteTechnology = async (req, res) => {
    const technologyId = req.params.id;
    await TechnologyModel.findByIdAndRemove(technologyId);
    res.json({
        'status': 'Technology deleted',
    });
};

module.exports = technologyController;