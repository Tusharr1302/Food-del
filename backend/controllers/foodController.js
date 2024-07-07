import foodModel from "../models/foodModel.js";
import fs from "fs";

//add food item api

const addFood = async (req, res) => {
  //adding logic to store the data in the data base
  
  
  let image_filename = `${req.file.filename}`; //storing uploaded filename in file_name variabl

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  })
  try {
    await food.save(); //saving food in the database
    res.json({ success: true, message: "Food Added Successfully" }); //sending response to jason about success or faliure {In try-> success}
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
}
//creating all food list(api)
const listFood = async (req,res) =>{
    try {
        const foods = await foodModel.find({}) //getting all the data of food items
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

//remove food item(api)
const removeFood = async (req, res) => {
  try {

      const food = await foodModel.findById(req.body.id);
      fs.unlink(`uploads/${food.image}`, () => { })

      await foodModel.findByIdAndDelete(req.body.id)
      res.json({ success: true, message: "Food Removed" })

  } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" })
  }

}



export { addFood,listFood,removeFood};
