const jwt= require('jsonwebtoken');


var requireSignin= function (req ,res, next) {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        var user;
        jwt.verify (token, process.env.JWT_SECRET, function(err, decoded){
            user= decoded;
        });
        req.user = user;
        if(!user) return res.status(400).json({ message: "Wrong Token!!" });
    } 
    else {
        return res.status(400).json({ message: "Authorization required" });
    }
    next();
      //jwt.decode()
}
       
var isUser= function(req, res, next){
    if (req.user.role !== "user") {
        return res.status(400).json({ message: "User access Required" });
    }
    next();       
}

var isAdmin= function(req,res,next){
    //console.log(req.user)
    if(req.user.role !=="admin"){
        
        return res.status(400).json({message: "Admin access Required"});
    }
    next();
}

module.exports={
    requireSignin:requireSignin,
    isUser:isUser,
    isAdmin: isAdmin
}