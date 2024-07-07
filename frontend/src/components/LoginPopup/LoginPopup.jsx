import React,{useContext, useState} from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios"

const LoginPopup = ({setShowLogin}) => {

const {url,setToken} = useContext(StoreContext)    //fetched url using context api

  const [currState, setCurrState] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
})

const onChangeHandler = (event) => {
  const name = event.target.name
  const value = event.target.value
  setData(data => ({ ...data, [name]: value }))
}

const onLogin = async (e) => {
  e.preventDefault()                     //prevent from loading webpage on submit

  let new_url = url;
  if (currState === "Login") {
      new_url += "/api/user/login";   //fetching login api
  }
  else {
      new_url += "/api/user/register"   //fetching register api
  }
  const response = await axios.post(new_url, data);    //this api will work for both login and register
  if (response.data.success) {
      setToken(response.data.token)
      localStorage.setItem("token", response.data.token)
      // loadCartData({token:response.data.token})
      setShowLogin(false)       //hide the login
  }
  else {
      // toast.error(response.data.message)
      alert(response.data.message)
  }
}







  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
        {currState === "Sign Up" ? <input name='name'  onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required /> : <></>}
        <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' />
        <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
    </div>
    <button type='submit'>{currState === "Login" ? "Login" : "Create account"}</button>
    <div className="login-popup-condition">
        <input type="checkbox" name="" id="" required/>
        <p>By continuing, i agree to the terms of use & privacy policy.</p>
    </div>
    {currState === "Login"
        ? <p>Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span></p>
        : <p>Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span></p>
    }
</form>
</div>
      
  );
};

export default LoginPopup;
