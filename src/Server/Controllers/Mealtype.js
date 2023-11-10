const Mealtype = require('../Models/Mealtype');


getmealtype=(req,res)=>{
    Mealtype.find()
        .then(response => res.status(200).json({ message: 'MealTypes Fetched Succesfully', mealtypes: response }))
        .catch(err => res.status(500).json({ message: err }))

}

getmealtypeByID=(id,req,res)=>{
    Mealtype.find({meal_type:id})
    .then(response => res.status(200).json({ message: 'MealTypes Based On id Fetched Succesfully', mealtypes: response }))
    .catch(err => res.status(500).json({ message: err }))

}



exports.getMealType = (req, res) => {
    getmealtype(req,res);
    
}

exports.getMealTypeId=(req,res)=>{
    const mealtypeId = req.params.Id;
    getmealtypeByID(mealtypeId,req,res);

}