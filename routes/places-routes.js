const express = require('express');

const placesControllers = require('../controllers/places-controllers')
const router = express.Router();



router.get('/:pid', placesControllers.getPlaceByID);

router.get('/user/:uid', placesControllers.getPlacesbyUserId);

router.post('/', placesControllers.createPlace);

router.patch('/:pid',placesControllers.updatePlace);

router.delete('/:pid',placesControllers.deletePlace);

module.exports = router;