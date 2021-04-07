const Areas = require('../../modals/area');
const Bulbs = require('../../modals/bulb');
var jsend = require('../../plugins/jsend')


const addArea = function(req, res) {
    const areaObj = req.body

    const area = new Areas(areaObj)
    area.save((error, savedArea) => {
        if (error) return res.status(400).failure({ error });
        if (savedArea) {
            return res.status(200).success({savedArea}, 'Area Added succesully');
        }
    })
}

const addBulbToArea = async function(req, res) {
    const count = req.body.count;
    const areaId = req.body.areaId;
    let areaName='';
    let bulbs = [];

    await Areas.findById({_id: areaId}).exec(async (error, area) =>{
    if (error) return res.status(400).failure({ error });
    if (area) {
        
         areaName = area.name;
    
         for (let i = 0; i < count; i++) {
            const bulbObj = {
                name: areaName+'B-'+(i+1).toString(),
                area: areaId
            }
            const bulb = new Bulbs(bulbObj);
            await bulb.save(async (error, savedBulb)=>{
                if (error) return res.status(400).failure({ error });
                if(savedBulb){
                    console.log(savedBulb)
                    let obj = {
                        bulb_id: savedBulb._id
                    }
                    bulbs.push(obj);
                    if(i == count-1){
                        console.log(bulbs)
                        Areas.findByIdAndUpdate({_id: areaId},{$set: {
                            bulbs: bulbs
                        }},{new:true, }).exec((error, data)=>{
                            if (error) return res.status(400).failure({ error });
                                if(data){
                                    return res.status(200).success( data );
                                }
                        })
                    }
                //    const doc = await Areas.findByIdAndUpdate({_id: areaId}).bulbs.set(
                //     i, savedBulb._id
                // )
                   
                }
                
            })            
        }
      }
    })
}

const addPeopleCountArea = async function(req, res) {
    const peopleCount = req.body.peopleCount;
    const areaId = req.body.areaId;
    
    const update = { $push: { peopleCount: peopleCount } };
    Areas.findByIdAndUpdate({_id: areaId} , update, (error, updatedArea) => {
        if (error) return res.status(400).failure({ error });
        if (updatedArea) {
          return res.status(200).success({ updatedArea });
        }
    });
}


module.exports = {
    addArea,
    addBulbToArea,
    addPeopleCountArea
}