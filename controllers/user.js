const user = require("../models/user")

async function updateUser(req, res, next) {

    try {
        const updateByUser = await user.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(201).json(updateByUser)
    } catch (error) {
        res.status(401).json(error)
    }
}

async function deleteUserById(req,res,next){
    try {
        const deleteById = await user.findByIdAndDelete(req.params.id)
        res.status(201).json(deleteById)
        
    } catch (error) {
        res.status(400).send(error)
        
    }
}
// async function getAllUser(req,res,next){
//     try {
//         const allUser = await user.find()
//         res.status(201).json(allUser)
//     } catch (error) {
//         res.status(401).json(error)
//     }
// }

async function getAllUser(req, res, next) {

    const keyword = req.query.key;
    try {
        let page = parseInt(req.query.page) || 1
        let limit = parseInt(req.query.limit) || 9
        let skipData = (page - 1) * limit
        const totalItems = await user.countDocuments();
        console.log("Keyword Filter", totalItems);
        const lastPage = Math.ceil(totalItems / limit);




        if (keyword) {
            const allFood = await user.find({
                $or: [
                    { email: { $regex: keyword, $options: 'i' } },
                    { userName: { $regex: keyword, $options: 'i' } },

                ]
            }).skip(skipData).limit(limit);
            res.json({ data: allFood, lastPage, message: "Keyword Filter", success: true });
        }
        else {
            const allFood = await user.find().skip(skipData).limit(limit);
            res.json({ data: allFood, lastPage, message: "Keyword Filter", success: true });
        }
    } catch (error) {
        res.status(400).json(error.message)
    }
}

// async function countByUser(req, res, next) {

//     try {
//         const countUser = await user.countDocuments({ type: "email" })


//         return res.status(201).json([
//             { type: "email", count: countUser },
//             , ])

//     } catch (error) {
//         res.status(402).json("Bad request")
//     }
// }
//  async function getUserByCount(req, res, next) {
//      // const email = req.query.email.split(",")
//      try {
//          const count = await user.countDocuments({ email });

//          return res.status(200).json({ count });

//      } catch (error) {
//          res.status(402).json("Bad request")
//      }
//  }

module.exports = { updateUser, getAllUser, deleteUserById }