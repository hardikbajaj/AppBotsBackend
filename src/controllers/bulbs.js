const Areas = require('../modals/area');
const Bulbs = require('../modals/bulb');


const getBulbsByArea = function(req, res) {
    const areaId = req.params.id;

    Bulbs.find({ area: areaId }).select('name area status impressionsON impressionsOFF').exec((error, bulbData) => {
      if (error) {
        return res.status(400).failure("Something Went Wrong");
      } else if (bulbData) {
        return res.status(200).success(bulbData,"Bulbs by Id fetched");
      }
    });

}

module.exports = {
    getBulbsByArea,
    
}