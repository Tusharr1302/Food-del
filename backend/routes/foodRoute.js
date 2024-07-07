import express from 'express';
import { addFood,listFood,removeFood} from '../controllers/foodController.js';
import multer from 'multer';  //to store food images


const foodRouter = express.Router();   //with this we can do get/post req etc

//Image Storage Engine (Saving Image to uploads folder & rename it)

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null,`${Date.now()}${file.originalname}`);   //with datenow we get diff file names
    }
})

const upload = multer({ storage: storage})         //refer notes

foodRouter.get("/list",listFood);
foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.post("/remove",removeFood)
// foodRouter.post("/add",addFood)





export default foodRouter;