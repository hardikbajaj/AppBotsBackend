const mongoose = require('mongoose');
const bulbSchema = new mongoose.Schema({

    name: { type: String, required: true, trim: true},
    status: {type:Boolean, default:false},
    area: {type: mongoose.Schema.Types.ObjectId , ref:'Area' },
    impressionsON: {type:Number, default:0},
    impressionsOFF: {type:Number, default:0}

}, { timestamps: true });


module.exports = mongoose.model('Bulb', bulbSchema);