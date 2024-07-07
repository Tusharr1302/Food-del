 import React,{ useState } from 'react'
 import './Add.css'
 import { assets, url } from '../../assets/assets';
 import axios from 'axios';
import { toast } from 'react-toastify';
 


 const Add = ({url}) => {
     
    
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    });
      
    // data is the current state.
    // { ...data } creates a shallow copy of the current state. This ensures that we don't mutate the original state directly.
    // [name]: value is a dynamic key-value pair. The square brackets ([ ]) allow you to use the value of the name variable as the key. This means that the specific field identified by name is updated with the new value
    const onChangeHandler = (event) => {                          
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))                      //see use effect 5:17:00
    }


    //with onsubmit we get that (field is empty )msg also
 const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!image) {
            toast.error('Image not selected');
            return null;
        }
        //inserting all the data as form one by one to submit
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));   //bcz we have stored the data as number but without Number(data.price) it will stored as a string
        formData.append("category", data.category);
        formData.append("image", image);

        const response = await axios.post(`${url}/api/food/add`, formData);       //api call for post with axios
        if (response.data.success) {                                    //checking success or faluire of post         
           
            setData({
                name: "",
                description: "",
                price: "",
                category: data.category
            })
            setImage(false);
            toast.success(response.data.message)                       //toastify for success or faliure notifaction
        }
        else {
            toast.error(response.data.message)
        }
    }


   return (
    <div className='add'>
    <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className='add-img-upload flex-col'>
            <p>Upload Image</p>
            <input onChange={(e) => { setImage(e.target.files[0]); e.target.value = '' }} type="file" accept="image/*" id="image" hidden />
            <label htmlFor="image">
            <img src={!image? assets.upload_area : URL.createObjectURL(image)} alt="" />
            </label>
        </div>
        <div className='add-product-name flex-col'>
            <p>Product name</p>
            <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Type here' required />
        </div>
        <div className='add-product-description flex-col'>
            <p>Product description</p>
            <textarea name='description' onChange={onChangeHandler} value={data.description}type="text" rows={6} placeholder='Write content here' required />
        </div>
        <div className='add-category-price'>
            <div className='add-category flex-col'>
                <p>Product category</p>
                <select name='category' onChange={onChangeHandler} >           {/* select is a button */}
                    <option value="Salad">Salad</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Deserts">Deserts</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Cake">Cake</option>
                    <option value="Pure Veg">Pure Veg</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Noodles">Noodles</option>
                </select>
            </div>
            <div className='add-price flex-col'>
                <p>Product Price</p>
                <input type="Number" name='price' onChange={onChangeHandler} value={data.price} placeholder='$25' />
            </div>
        </div>
        <button type='submit' className='add-btn' >ADD</button>
    </form>
</div>
   )
 }
 
 export default Add
 