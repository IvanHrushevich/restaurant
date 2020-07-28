const express = require('express');

const controller = require('../controllers/category');

const router = express.Router();

router.get('/', controller.getAll);
router.patch('/', controller.update);
router.post('/', controller.create);
router.get('/:id', controller.getById);
router.delete('/:id', controller.remove);

module.exports = router;
