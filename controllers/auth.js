const User = require("../models/user");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer');



// async function sendVerifyMail(name, email, u_id){
//     try {
//         const transport =nodemailer.createTransport({
           
//             service: 'gmail',
//             port: 465,
//             logger: true,
//             debug: true,
//             secure: true,
//            auth:{
//                 user: 'sushantlama732@gmail.com',
//                 pass: 'zpxsjrfthoxuebra'
//      },
//     tls:{
//         rejectUnauthorized:true
//     } })
//             const mailOptions = {
//                 from: 'sushantlama732@gmail.com',
//                 to: email,
//                 subject: 'For verification email',
//                 html: '<p>Hello '+ name +' Please click here to <a href="http://localhost:3000/verify?id='+ u_id+'"> Verify </a>at your mail </p>'
//      };
//      transport.sendMail(mailOptions, function(error, info){
//         if (error) {
//           console.log(error.message);
          
//         } else {
//           console.log('Email sent: ' + info.response);
//         }
//       });
        
//     } catch (error) {
//         console.log(error);
//     }
// }
async function userRegister(req, res, next) {
const { email, userName, password}= req.body
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync(password, salt);
    
 try {
const newUser = new User({
            userName: userName,
            email: email,
            password: hash,
            isVerified:0,
        })
        console.log(newUser);
        await newUser.save()
        // if(newUser){
        //     sendVerifyMail(req.body.userName, req.body.email, newUser._id)
        // }
       
       res.status(201).json({newUser, message: "Your registration successful. Please verify your mail"})

    } catch (error) {
          res.status(400).json({ message: "Something is wrong"})
    }
}

async function loginUser(req,res,next){
    try {
        const loginEmail = await User.findOne({email: req.body.email})
        if(!loginEmail) return res.status(402).send("Your email is wrong")

        const logInPassword= await bcrypt.compare(req.body.password, loginEmail.password)
        if(!logInPassword) res.status(400).send("Your password is wrong")

        //yedi login vayo vaney teslae jwttoken dine jasle garda pachi check garna sajilo huncha 
        const token = jwt.sign({ id : loginEmail._id, isAdmin: loginEmail.isAdmin}, process.env.SECRET)
        const { password, isAdmin, ...otherdetails}= loginEmail._doc
        // if(!isAdmin) res.status(400).send("Your are not admin")

        res.cookie("access_token", token,{
            httpOnly: true,
        }).status(200).json({details: {...otherdetails}, isAdmin})
    
        

        
    } catch (error) {
        console.log(error.message)
    }
}

// const verifyEmail = async(req,res)=> {
//     try {
//         const updateVerify = await User.updateOne({_id:req.query.id}, {$set:{isVerified: 1}}, {new: true})
        
//         res.render("Email is verified", updateVerify)
//     } catch (error) {
        
//     }
// }

module.exports= {userRegister, loginUser}

