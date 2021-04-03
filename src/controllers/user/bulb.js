const Bulbs = require('../../modals/bulb');


const requestLithing = function(req, res) {
    const bulbId = req.body.bulbId;
    const status = req.body.status;

    Bulbs.findByIdAndUpdate({_id: bulbId}, status ? {$inc:{impressionsON : 1}} : {$inc:{impressionsOFF : 1} }, {new:true},(error, newData) => {
        if(error){
            return res.status(400).failure('Something Went Wrong')
        }
        else{
            return res.status(201).success('Requested Light')
        }
    })

}

module.exports = {
   requestLithing
    
}