const User = require("../models/User");
const Product = require("../models/Product");
const Course = require("../models/Course");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

const registerUser = async (req, res) => {
  try {
    const SALT_ROUNDS = 10;
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, SALT_ROUNDS),
      mobileNo: req.body.mobileNo,

    })
    await newUser.save()
    res.status(201).send()
  } catch (error) {
    res.status(500).send(error.message)
  }
}


const loginUser = async (req, res) => {
  const enteredPassword = req.body.password;
  try {
    const retrievedUser = User.findOne({ email: req.body.email });
    if (!retrievedUser) return res.status(404).send({ message: 'No User found. ' });
    const userPwOnDb = retrievedUser.password;

    const isPasswordCorrect = bcrypt.compareSync(enteredPassword,userPwOnDb);
    if (isPasswordCorrect) {
      return res.send({ accessToken: auth.createAccessToken(retrievedUser) })
    }
    res.send({ message: "Incorrect password!" })
  }
  catch (error) {
    res.status(500).send(error.message)
  }
}

const setAsAdmin = async (req, res) => {
  const enteredPassword = req.body.password;
  try {
    const retrievedUser = User.findOne({ isAdmin: req.body.isAdmin });
    if (!retrievedUser) return res.status(403).send({ message: 'Not Authorize Acess.' });
    const userPwOnDb = retrievedUser.password;

    const isPasswordCorrect = bcrypt.compareSync(enteredPassword, userPwOnDb);
    if (isPasswordCorrect) {
      return res.send({ accessToken: auth.createAccessToken(retrievedUser) })
    }
    res.send({ message: "Incorrect password!" })
  }
  catch (error) {
    res.status(500).send(error.message)
  }
}

const checkOut = async (req, res) => {
  // create order draft = ok
  // save order = ok
  // push order, save id to custoemers orders array = ok
  //push order, save id to products orders array = ok
  const newOrder = await new Order({
    user: req.body.user,
    product: req.body.product,
    shippingAddress: req.body.shippingAddress,
  }).save()
  const payload = {
    $push: {orders: newOrder._id}
  }
  await Product.findByIdAndUpdate(req.body.product.productId, payload)
  await User.findByIdAndUpdate(req.body.user, payload)

  /*
  get my orders
  myorders
   - get prduct id 
   - put quantity 
   - 
  */

  

}

module.exports= {
  registerUser,
  loginUser,
  setAsAdmin,
  checkOut,
};