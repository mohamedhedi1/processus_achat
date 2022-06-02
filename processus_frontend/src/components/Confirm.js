import React, { useState } from 'react'
import axios from 'axios';
import Alert from '@mui/material/Alert';
const Confirm = () => {
    const [username,setUserName]=useState('email');
    const [test,setTest]=useState(false)
    const handleChange = (e) =>
     {   console.log(e.target.name)
        console.log(e.target.value)
         const value = e.target.value;
         setUserName(value)
         
         
     }
    const reset=()=>{
        
       /* console.log(window.location.pathname); 
        const queryParams = new URLSearchParams(window.location.search); 
        const id = queryParams.get('token');
        console.log(id)*/
        

    }
    const send_email=async()=>{
        const response = await axios.get('http://localhost:8080/api/v1/user/reset/'+username);
        let data=response.data;
        setTest(true)
        
    }
  return (
    <div className="auth-wrapper">
    <div className="auth-content">
        <div className="auth-bg">
            <span className="r"></span>
            <span className="r s"></span>
            <span className="r s"></span>
            <span className="r"></span>
        </div>
        <div className="card">
            <div className="card-body text-center">
                <div className="mb-4">
                    <i className="feather icon-mail auth-icon"></i>
                </div>
                <h3 className="mb-4">Email</h3>
                <div className="input-group mb-3">
                    <input  defaultValue={username} onChange={(e)=> handleChange(e)} type="email" className="form-control"/>
                </div>
                { test &&
                <Alert severity="success">vérifiez votre email</Alert> }
                <button className="btn btn-primary mb-4 shadow-2" onClick={send_email}>se connecter</button>
                
            </div>
        </div>
    </div>
</div>
  )
}

export default Confirm