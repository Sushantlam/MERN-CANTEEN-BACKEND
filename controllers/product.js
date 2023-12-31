const foodItems = require("../models/product")


//CreateFood
async function createFood(req, res, next) {
  console.log('No file uploaded', req.body);

  // Check if a file was uploaded
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  console.log(req.file)

  const newFoodItem = new foodItems({
    title: req.body.title,
    desc: req.body.desc,
    
    category: req.body.category,
    time: req.body.time,
    price: req.body.price,
    featured: req.body.featured || false,
    photo: req.file.filename
  });
  console.log('No file uploaded',newFoodItem);

  try {
    const newItem = await newFoodItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

//UpdateFood

async function updateFood(req, res) {
  try {
    const updatedFood = await foodItems.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    res.status(200).json(updatedFood)
  } catch (error) {
    res.status(401).json(error.message)
  }
}

//Get food by id

async function getByID(req, res, next) {
  try {
    const byId = await foodItems.findById(req.params.id)
    res.status(201).send(byId)

  } catch (error) {
    res.status(401).send(error)

  }
}

//DeleteFoodById 

async function deleteFoodById(req, res, next) {
  try {
    const deleteById = await foodItems.findByIdAndDelete(req.params.id)
    res.status(201).json(deleteById)

  } catch (error) {
    res.status(400).send(error)

  }
}

//Getall Food

async function getAllFood(req, res, next) {

  const keyword = req.query.key;
  const category = req.query.category;

  try {
    let page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 8
    let skipData = (page - 1) * limit

    const query = {}


    if (category) {
      query.category = category
    }
    if (keyword) {

      query.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { category: { $regex: keyword, $options: 'i' } },
      ]
    }

    const totalItems = await foodItems.countDocuments(query);
    const lastPage = Math.ceil(totalItems / limit);
    const allFood = await foodItems.find(query).skip(skipData).limit(limit);
    console.log(allFood);
    res.json({ data: allFood, lastPage, message: "Keyword Filter", success: true });


  } catch (error) {
    res.status(400).json(error.message)
  }
}

//getByCategory





const getFoodbyKeywords = async (req, res) => {
  const keyword = req.query.key;
  try {
    let page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 8
    let skipData = (page - 1) * limit

    const filteredData = await foodItems.find({
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { desc: { $regex: keyword, $options: 'i' } },
        { category: { $regex: keyword, $options: 'i' } },
      ]
    }).skip(skipData).limit(limit);

    res.render({ filteredData, message: "Keyword Filter", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error filtering jobs", success: false });
  }
};




const getfilteredData = async (req, res) => {
  try {
    const { category, title, rating } = req.query;



    let filter = {};
    if (category) filter.category = category;
    if (title) filter.title = title;
    let page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 2
    let skipData = (page - 1) * limit



    const food = await foodItems.find(filter).skip(skipData).limit(limit);;

    if (food.length > 0) {

      res.json({ data: food, message: "Filtered jobs data", success: true });
    } else {
      res.json({ data: null, success: false, message: "no Data" })
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};




module.exports = { createFood, getAllFood, updateFood, getByID, deleteFoodById, getFoodbyKeywords, getfilteredData }