const mongoose= require('mongoose');
const bcrypt= require('bcrypt');

var adminSchema = new mongoose.Schema({
    email :{type:String, required: true, trim: true},
    firstName : {type:String, required:true },
    lastName : {type:String, trim: true, required: true}, 
    hash_password : {type:String, required: true },

   },{timestamps:true})

adminSchema.virtual('password').set(function(password){
    this.hash_password=bcrypt.hashSync(password, 10);
});

adminSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`;
  });

adminSchema.methods= {
    authenticate: function(password){
        return bcrypt.compareSync(password, this.hash_password );
    }
}

module.exports = mongoose.model('Admin',adminSchema);
   