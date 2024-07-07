import React, { useContext, useState,useEffect } from "react";
import "./MyOrders.css";
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext";
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token } }
    ); //all orders will display
    setData(response.data.data);
   
  }

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);      //=>if user login or logout on webpg then it will again load this func

    return (
  
      <div className='my-orders'>
         <h2>My Orders</h2>
       <div className="container">
           {data.map((order,index)=>{
            return (
              <div key={index} className='my-orders-order'>
                 <img src={assets.parcel_icon} alt="" />
                  <p>{order.items.map((item,index)=>{
                if (index === order.items.length-1) {//(-1) bcz acccesing last order of console array which have all details
                      return item.name+" x "+item.quantity  //if last item
                    }
                    else{
                      return item.name+" x "+item.quantity+", "  ///else all items then , last item with if
                    }
                  })}</p>
             <p>${order.amount}.00</p>
                   <p>Items: {order.items.length}</p>
                   <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                   <button onClick={fetchOrders}>Track Order</button>
            </div>
            )
          })}
        </div>
      </div>
    )
}

export default MyOrders;
