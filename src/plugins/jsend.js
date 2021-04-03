module.exports = ()=>{
    return function(req,res,next){

        res.success = function(data,message=''){
            res.json({'success':true,'data':data,'message':message})
        }
    
        res.failure = function(message='',data={}){
            res.json({'success':false,'data':data,'message':message})
        }
        next()
    }
} 