import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },  //req true means data entry without that field(eg name)the it will not 
    price: { type: Number, required: true},         //get stored
    image: { type: String, required: true },
    category:{ type:String, required:true},
})

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);
export default foodModel;

//const foodmodel =>is checking whether a Mongoose model named "food" already exists in the mongoose.models object. If it exists, it assigns the existing model to foodModel. If it does not exist, it creates a new model with the name "food" using the provided foodSchema and assigns it to foodModel.