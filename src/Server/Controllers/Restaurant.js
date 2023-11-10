const { response } = require('express');
const Restaurant = require('../Models/Restaurant');

restaurantByLocationId = (locationid, req, res) => {
    Restaurant.find({ location_id: locationid })
        .then(response => res.status(200).json({ message: 'Restaurant Fetched Succesfully', restaurant: response }))
        .catch(err => res.status(500).json({ message: err }))


}


restaurantbyid = (id, req, res) => {
    Restaurant.findById(id)
        .then(response => res.status(200).json({ message: 'Restaurant Based on id  Fetched Succesfully', restaurant: response }))
        .catch(err => res.status(500).json({ message: err }))


}

/*restarantpricelowtohigh=(id,req,res)=>{
    var mysort = {min_price:1};
    Restaurant.find({mealtype_id:id}).sort(mysort)
    .then(response => res.status(200).json({ message: 'Restaurant based on price low-to-high  Fetched Succesfully', restaurant: response }))
    .catch(err => res.status(500).json({ message: err }))
    
}*/

/*restarantpricelowtohightwoparam=(id,locationid,req,res)=>{
    var mysort = {min_price:1};
    Restaurant.find({mealtype_id:id,location_id:locationid}).sort(mysort)
    .then(response => res.status(200).json({ message: 'Restaurant based on price low-to-high  Fetched Succesfully', restaurant: response }))
    .catch(err => res.status(500).json({ message: err }))
    
}*/




/*restarant_price_low_high_four_param=(id,locationid,lcost,hcost,req,res)=>{
    var mysort = {min_price:1};
    Restaurant.find({min_price: { $lt: hcost, $gt: lcost },mealtype_id:id,location_id:locationid}).sort(mysort)
    .then(response => res.status(200).json({ message: 'Restaurant based on price low-to-high with Four Paramter  Fetched Succesfully', restaurant: response }))
    .catch(err => res.status(500).json({ message: err }))

}*/


/*restarantpricehightolow=(id,req,res)=>{
    var mysort = {min_price:-1};
    Restaurant.find({mealtype_id:id}).sort(mysort)
    .then(response => res.status(200).json({ message: 'Restaurant based on price high-to-low  Fetched Succesfully', restaurant: response }))
    .catch(err => res.status(500).json({ message: err }))
    
}*/


/*restarantpricehightolowtwoparam=(id,locationid,req,res)=>{
    var mysort = {min_price:-1};
    Restaurant.find({mealtype_id:id,location_id:locationid}).sort(mysort)
    .then(response => res.status(200).json({ message: 'Restaurant based on price high-to-low  Fetched Succesfully', restaurant: response }))
    .catch(err => res.status(500).json({ message: err }))
    
}*/

/*restarant_price_high_low_four_param=(id,locationid,lcost,hcost,req,res)=>{
    var mysort = {min_price:-1};
    Restaurant.find({min_price: { $lt: hcost, $gt: lcost },mealtype_id:id,location_id:locationid}).sort(mysort)
    .then(response => res.status(200).json({ message: 'Restaurant based on price high-to-low with Four Paramter  Fetched Succesfully', restaurant: response }))
    .catch(err => res.status(500).json({ message: err }))

}*/

/*restarantfiveparamter=(id,lid,cid,lcost,hcost,req,res)=>{
    var mysort = {min_price:1};
    Restaurant.find({min_price: { $lt: hcost, $gt: lcost },cuisine_id:cid,mealtype_id:id,location_id:lid}).sort(mysort)
    .then(response => res.status(200).json({ message: 'Restaurant based on price high-to-low with Fivr Paramter  Fetched Succesfully', restaurant: response }))
    .catch(err => res.status(500).json({ message: err }))


}*/


/*restarantfiveparamter_high_low=(id,lid,cid,lcost,hcost,req,res)=>{
    var mysort = {min_price:-1};
    Restaurant.find({min_price: { $lt: hcost, $gt: lcost },cuisine_id:cid,mealtype_id:id,location_id:lid}).sort(mysort)
    .then(response => res.status(200).json({ message: 'Restaurant based on price high-to-low with Fivr Paramter  Fetched Succesfully', restaurant: response }))
    .catch(err => res.status(500).json({ message: err }))


}*/




exports.restaurantByLocationId = (req, res) => {
    const locationId = req.params.Id;
    restaurantByLocationId(locationId, req, res);


}

exports.restaurantById = (req, res) => {
    const restaurantID = req.params.Id;
    restaurantbyid(restaurantID, req, res);

}

exports.filterRestaurant = (req, res) => {
    const reqBody = req.body;
    const locationId = reqBody.locationId;
    const mealTypeId = reqBody.mealTypeId;
    const cusineId = reqBody.cusineId;
    const lCost = reqBody.lCost;
    const hCost = reqBody.hCost;
    const sort = reqBody.sort ? reqBody.sort : 1;
    const page = reqBody.page ? reqBody.page : 1;
    const perPageCount = reqBody.perPageCount ? reqBody.perPageCount : 2;


    let start;
    let end;
    start = Number(page * perPageCount) - perPageCount;
    end = Number(page * perPageCount);

    let payload = {};

    if (mealTypeId) {
        payload = { mealtype_id: mealTypeId }
    }

    if (mealTypeId && locationId) {
        payload = { mealtype_id: mealTypeId, location_id: locationId }
    }
    if (mealTypeId && lCost && hCost) {
        payload = { min_price: { $lt: hCost, $gt: lCost }, mealtype_id: mealTypeId }
    }
    if (mealTypeId && locationId && lCost && hCost) {
        payload = { min_price: { $lt: hCost, $gt: lCost }, mealtype_id: mealTypeId, location_id: locationId }
    }
    if (mealTypeId && locationId && cusineId && lCost && hCost) {
        payload = { min_price: { $lt: hCost, $gt: lCost }, mealtype_id: mealTypeId, location_id: locationId, cuisine: cusineId  }
    }
    if (mealTypeId && cusineId) {
        payload = { mealtype_id: mealTypeId, cuisine: cusineId }
    }
    if (mealTypeId && locationId && cusineId) {
        payload = { mealtype_id: mealTypeId, cuisine: cusineId, location_id: locationId }
    }
    if (cusineId) {
        payload = { cuisine: cusineId  }
    



    }

    Restaurant.find(payload).sort({ min_price: sort })
        .then(response => {
            const count = Math.ceil(response.length / 2);
            const pageCountArr = [];
            const resultValues = response.slice(start, end);
            for (var i = 1; i <= count; i++) {
                pageCountArr.push(i);
            }
            res.status(200).json({ message: 'Restaurant Fetched Succesfully', restaurant: resultValues, pageCount: pageCountArr });

        }).catch(err => res.status(500).json({ message: err }));


}