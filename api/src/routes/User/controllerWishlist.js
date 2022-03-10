const {
  User,
  Product
} = require("../../db.js");
const { Sequelize } = require("sequelize");


const getWishlist = async (req, res) => {
  const {userid} = req.params;
  if(!userid) return res.status(400).send('User id is required');
  const user = await User.findByPk(userid);
  if(!!user.wishlist) {
    const products = await Promise.all( user.wishlist.map( async productid => {
      const product = await Product.findByPk(productid);
      return {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
      }
    }));
    return res.json(products);
  }
  res.json([]); 
}

async function addToWishlist(req, res) {
  const { userId, productId } = req.body;
  //find user we want to change their wishlist
  if(!userId || !productId) return res.status(400).send('User id and product id are required');
  const user = await User.findByPk(userId);
  try {
    //if they alredy have items on the wishlist
    if(user.wishlist) {
      //we look for their wishlist first
      const newArray = user.wishlist
      if(newArray.includes(productId)) return res.send('Product already on wishlist');
      // we add the id of the new product
      newArray.push(productId)
      // console.log(newArray)
      //we add it to their wishlist
      user.set({
        wishlist: newArray
      })
      //this method is required for the change to persist
      user.changed('wishlist', true);
      console.log(user.changed());
      await user.save()
      res.json(user)

    } else {
      //if the list is empty
      
      const newArray = []
      // console.log(newArray)
      newArray.push(productId)
      // console.log(newArray)
      await user.set({
        wishlist: newArray
      })
  
      await user.save()
      res.json(user)
    }

  } catch (err) {
    console.log(err, "prueba");
    res.json({ message: err });
  }
}


const removeFromWishlist = async(req, res)=>{
  const { userId, productId } = req.body;
  //find user we want to change their wishlist
  if(!userId || !productId) return res.status(400).send('User id and product id are required');
  const user = await User.findByPk(userId);
  try {
      const newArray = user.wishlist
      // console.log(newArray)
      //we look for the product in the array
      const index = newArray.indexOf(productId);
      // we remove the imtem from the array
      newArray.splice(index, 1); // we only remove one of the items if there are repeats
      console.log(newArray)
      //we set the new array in the wishlist
      user.set({
        wishlist: newArray
      })
      user.changed('wishlist', true);
      console.log(user.changed());
      await user.save()
      res.json(user)

  } catch (err) {
    console.log(err, "prueba");
    res.json({ message: err });
  }
}




module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};
  