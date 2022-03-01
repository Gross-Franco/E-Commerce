const rts = require("./rPcheck");
const newCachTemp = require("./tkDecodeChache");

function verifyPerm(req,res,next){
    let rt= req.originalUrl
    let {role}= newCachTemp.getTk()
    if(rts.isPerm(role,rt)){
        next()
    }else{
        res.status(400).json({msg:'your role does not have permission for this route'})
    }
}
module.exports= verifyPerm