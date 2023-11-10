const express = require('express');

const router = express.Router();


const RestaurantController = require('../Controllers/Restaurant');
const MealtypeController = require('../Controllers/Mealtype');
const LocationController = require('../Controllers/Location');
const SignupControllers = require('../Controllers/User');
var paymentGatewayController = require('../Controllers/PaymentGateway');
const OrderDetails = require('../Controllers/UserOrderdetails');

router.get('/restaurantbyId/:Id', RestaurantController.restaurantByLocationId);
router.get('/mealType', MealtypeController.getMealType);
router.get('/mealType/:Id',MealtypeController.getMealTypeId);
router.get('/restaurant/:Id', RestaurantController.restaurantById);
router.get('/location', LocationController.getLocation);
router.post('/filter', RestaurantController.filterRestaurant);
router.post('/register',SignupControllers.register);
router.post('/login',SignupControllers.login);
router.post('/payment', paymentGatewayController.payment);
router.post('/callback', paymentGatewayController.callback);
router.post('/orderdetails',OrderDetails.userorderdetail);

module.exports = router;