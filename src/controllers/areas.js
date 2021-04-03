const Areas = require('../modals/area');
const Bulbs = require('../modals/bulb');


const getAreas = function(req, res) {
    Areas.find({}).select('name building floor bulbs').lean().exec((error, data) => {
        if(error){
            return res.status(400).failure('Something Went Wrong')
        }
        else{
            return res.status(200).success(data, 'Areas fetched Successfully')
        }
    })
}

module.exports = {
    getAreas,
    
}