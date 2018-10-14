'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Auth = require('../../../app/middlewares/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

var _foodsController = require('../../../app/controllers/foodsController');

var _foodsController2 = _interopRequireDefault(_foodsController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// Import Relevant Controllers


router.get('/', _foodsController2.default.fetchAllFoods);
router.post('/', _Auth2.default.validateToken, _Auth2.default.isAdmin, _foodsController2.default.createNewFood);

router.get('/:foodId', _foodsController2.default.fetchOneFood);

// Update the name of a food
router.put('/:foodId', _Auth2.default.validateToken, _Auth2.default.isAdmin, _foodsController2.default.updateFood);

router.use('', function (req, res) {
  return res.status(404).json({ message: 'This endpoint does not exist' });
});

module.exports = router;