const express = require('express');
const router = express.Router();

const product_controller = require('../controllers/product.controller');

router.get('/test', product_controller.test); // a simple test url to check that all of our files are communicating correctly.
router.post('/create', product_controller.product_create);
router.get('/:id', product_controller.product_details);
router.put('/:id/update', product_controller.product_update);
router.delete('/:id/delete', product_controller.product_delete);
router.get('/', product_controller.all_product_details);
router.post('/preview', product_controller.preview_details);

module.exports = router;
