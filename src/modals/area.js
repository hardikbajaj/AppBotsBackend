const mongoose = require('mongoose');
const areaSchema = new mongoose.Schema({

    name: { type: String, required: true, trim: true, unique: true },
    building: {type: String, required: true, trim: true },
    floor: {type: Number, required: true, trim: true },
    bulbs : [{
        bulb_id:{ type: mongoose.Schema.Types.ObjectId , ref:'Bulb'},
    }],
    peopleCount:{
        type:Array
    },

}, { timestamps: true });


module.exports = mongoose.model('Area', areaSchema);