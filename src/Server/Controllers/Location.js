
const LOcationData = require('../Models/Location');
const { response } = require('express');

locationdropdown=()=>{
    return locationsData.map(item=>item.city);
}

getlocation=(req,res)=>{
    LOcationData.find()
    .then(response => res.status(200).json({ message: 'Location Fetched Succesfully', Locations: response }))
    .catch(err => res.status(500).json({ message: err }))
    
}

exports.Locations = (req, res) => {
    res.status(200).json({ message: 'Locations Fetched Succesfully', location:locationdropdown() });
};

exports.getLocation=(req,res)=>{
    getlocation(req,res);

}