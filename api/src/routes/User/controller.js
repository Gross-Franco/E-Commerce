let  {Product,Review,User} =require('../../db.js')
const jwt = require('jsonwebtoken')
const {FIRM} =process.env 




module.exports={
    postReviewProduct:async (req,res)=>{
        // si se envia el token
        //let {id}=jwt.decode(req.headers['authorization'].split(' ')[1])
        // de lo contrario se envia el id del usuario de forma manual
        //let {userID}= req.query
        // per es necesario un identificador para buscar el usuario en la base de datos
        // o si se usar cookie-session 
        // let {usAuth}= req.session
        // let {id} = jwt.decode(usAuth)
        try{
            let {idProduct} =req.params
            if(req.body){
                if(req.body.hasOneProperty('description')&& typeof req.body['description']!== 'string'){
                    throw Error('Data types error ')
                }
                if(req.body.hasOneProperty('starsPoint')&& typeof req.body['starsPoint']!== 'number'){
                    throw Error('Data types error ')
                }
            }
            let product=await Product.findOne({where:{id:idProduct}})
            !product&& new Error('Product no found')
            let review= await Review.create(req.body)
            // dara un error si no hay una id de un usuario
            User.findOne({where:{id:id}})
            .then((result) => {
                review.addUser(result)
                product.setReview(review)
                res.status(201).json({success:true,inf:'Review add to Product'})
            },(error)=>{
                res.status(400).json({success:false,inf:'user nof found: '+error})
            })
                
            
        }catch(e){
            res.status(400).json({success:false,inf:e})
        }
    }
}