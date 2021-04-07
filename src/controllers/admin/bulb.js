const Areas = require('../../modals/area');
const Bulbs = require('../../modals/bulb');

const setIotBulbStatus = async function(req, res) {
    let temp = 0;
    const avgPeopleData = await Areas.aggregate([
           { $project: 
            {
                avgPeople: {$avg: "$peopleCount"},
               
        }
    },
    { $project: 
        {bulbsOn: {
            $switch:{
                "branches": [
                    {"case":{
                        $gt:["$avgPeople", 20]
                    }
                ,"then": 5},
                    {"case":{
                        $gt:["$avgPeople", 14]
                    }
                ,"then": 4},
                    {"case":{
                        $gt:["$avgPeople", 8]
                    }
                ,"then": 3},
                    {"case":{
                        $gt:["$avgPeople", 4]
                    }
                ,"then": 2},
                {"case":{
                    $gt:["$avgPeople", 0]
                }
            ,"then": 1}

                ],
                "default": 0
            }
          //  [{$gt:["$avgPeople", 0]},1,0]
        },
        avgPeople:"$avgPeople"
        

        }
    }


            // {$project: {bulbsOn: 4
                
            // }}
          

        ])
    console.log(avgPeopleData)
    let ref = null;
    const setStatusFalse = await Bulbs.updateMany({},{$set:{status:false}})
    if(setStatusFalse){
   ref = await Promise.all( avgPeopleData.map(async (data, index) => {
        //console.log(data)
        
        
        const articleId= data._id;
        const details = await Areas.findById({_id:articleId}).select('bulbs').lean();
        console.log(details)
        const length = Math.min(details.bulbs.length, data.bulbsOn);
        //const bulbId = details.bulbs[0]._id
        //const temp = await Bulbs.find({})
        // console.log(temp+'temp')
       
        for  (let i = 0; i < length; i++) {
            console.log('Loop+ '+details.bulbs[i]._id)
            Bulbs.findByIdAndUpdate({_id: details.bulbs[i].bulb_id},{$set:{
              status: true  
            }},
                (error, respo) => {
                   
                    if (error) return res.status(400).failure({ error });
                   
                    if (respo && i == length-1) {
                        return `Array  ${index} Completed`
                        console.log('updated')
                        
                       // res.status(200).success({}, "All Bulbs are updated as per the Visitor's Frequency")
                    }
                }
            )
        }
        if(length === 0){
            return '0 length'
        }
       
        

    }))
}
    if(ref){
        res.status(200).success({}, "All Bulbs are updated as per the Visitor's Frequency")
        }

   // res.status(200).success({}, "All Bulbs are updated as per the Visitor's Frequency")

}

const setBulbStatusById = async function(req, res) {
    const bulbId = req.body.bulbId;
    const newStatus = req.body.status;
    (await Bulbs.findByIdAndUpdate({_id: bulbId}, {status: newStatus}, {new:true},((error, newData) => {
        if(error){
            return res.status(400).failure('Something Went Wrong')
        }
        else{
            return res.status(201).success({newBulbStatus: newData}, 'Bulb Status Updated Successfully')
        }
    })))
}

const falseAll = async function(req, res) {
    const setStatusFalse = await Bulbs.updateMany({},{$set:{status:false}})
    res.status(200).success(setStatusFalse, "done")
}


module.exports={
    setIotBulbStatus,
    setBulbStatusById,
    falseAll
}