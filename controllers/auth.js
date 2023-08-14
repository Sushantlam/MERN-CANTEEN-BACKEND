const User = require("../models/user");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

async function userRegister(req, res, next) {

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
  try {
        const newUser = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: hash
        })
        await newUser.save()
        const token = jwt.sign({ id : newUser._id, isAdmin: newUser.isAdmin}, process.env.SECRET)

        const { password, isAdmin, ...otherdetails}= newUser._doc

        res.cookie("access_token", token,{
            httpOnly: true,
        }).status(200).json({details: {...otherdetails}, isAdmin})
    
       

    } catch (error) {
          res.status(401).send(error.message)
    }
}

async function loginUser(req,res,next){
    try {
        const loginEmail = await User.findOne({email: req.body.email})
        if(!loginEmail) return res.status(402).send("Your email is wrong or email isnt logged in")

        const logInPassword= await bcrypt.compare(req.body.password, loginEmail.password)
        if(!logInPassword) res.status(400).send("Your password is wrong")

        //yedi login vayo vaney teslae jwttoken dine jasle garda pachi check garna sajilo huncha 
        const token = jwt.sign({ id : loginEmail._id, isAdmin: loginEmail.isAdmin}, process.env.SECRET)
        const { password, isAdmin, ...otherdetails}= loginEmail._doc

        res.cookie("access_token", token,{
            httpOnly: true,
        }).status(200).json({details: {...otherdetails}, isAdmin})
    
        

        
    } catch (error) {
        console.log(error.message)
    }
}

module.exports= {userRegister, loginUser}

