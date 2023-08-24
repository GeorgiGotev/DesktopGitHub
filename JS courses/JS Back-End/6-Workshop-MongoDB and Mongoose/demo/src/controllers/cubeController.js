const router = require('express').Router();
const cubeService = require('../service/cubeService');
const accessoryService = require('../service/accessoryService');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {
    await cubeService.create(req.body);
    res.redirect('/');
});

router.get('/:cubeId/details', async (req, res) => {
    const id = req.params.cubeId;

    let currCube = await cubeService.getById(id).lean();

    res.render('details', { currCube });
});

router.get('/:cubeId/attach-accessory', async (req, res) => {
    const cube = await cubeService.getById(req.params.cubeId).lean();
    const accessories = await accessoryService.getAll().lean();

    const hasAccessories = accessories.length > 0;

    res.render('accessory/attach', { cube, accessories,hasAccessories });
});

module.exports = router;
