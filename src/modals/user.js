const mongoose= require('mongoose');
const bcrypt= require('bcrypt');

var userSchema = new mongoose.Schema({
    email :{type:String, required: true, trim: true},
    firstName : {type:String, required:true },
    lastName : {type:String, trim: true, required: true}, 
    hash_password : {type:String, required: true },
    role: {type: String,default:'user'}

   },{timestamps:true})

userSchema.virtual('password').set(function(password){
    this.hash_password=bcrypt.hashSync(password, 10);
});

userSchema.methods= {
    authenticate: function(password){
        return bcrypt.compareSync(password, this.hash_password );
    }
}

userSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model('User',userSchema);
   