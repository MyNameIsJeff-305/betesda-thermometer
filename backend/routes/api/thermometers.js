const express = require('express');

const { Thermometer } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

//Get All Thermometers
router.get('/', async (req, res) => {
    const thermometers = await Thermometer.findAll();
    res.json(thermometers);
});

//Get a Thermometer by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const thermometer = await Thermometer.findByPk(id);

    if (!thermometer) {
        return res.status(404).json({ message: 'Thermometer not found' });
    }

    res.json(thermometer);
});

//Create a Thermometer
router.post('/', requireAuth, async (req, res) => {
    const { value, max, steps, format } = req.body;
    const userId = req.user.id;

    const thermometer = await Thermometer.create({ value, max, steps, format, userId });
    res.json(thermometer);
});

//Update a Thermometer
router.put('/:id', requireAuth, async (req, res) => {
    const { id } = req.params;
    const { value, max, steps, format } = req.body;

    const thermometer = await Thermometer.findByPk(id);

    if (!thermometer) {
        return res.status(404).json({ message: 'Thermometer not found' });
    }

    thermometer.value = value;
    thermometer.max = max;
    thermometer.steps = steps;
    thermometer.format = format;

    await thermometer.save();

    res.json(thermometer);
});

//Delete a Thermometer
router.delete('/:id', requireAuth, async (req, res) => {
    const { id } = req.params;

    const thermometer = await Thermometer.findByPk(id);

    if (!thermometer) {
        return res.status(404).json({ message: 'Thermometer not found' });
    }

    await thermometer.destroy();

    res.json({ message: 'Thermometer deleted' });
});


module.exports = router;