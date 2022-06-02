import React from 'react'
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
const ResetPassword = () => {
    const [pass1,setPass1]=useState('');
    const [pass2,setPass2]=useState('');
    const [test,setTest]=useState(false);
    const navigate=useNavigate();
    const search=async()=>{

      console.log(window.location.pathname); 
      const queryParams = new URLSearchParams(window.location.search); 
      const id = queryParams.get('email');
      console.log(id)
      const token = queryParams.get('token');
      console.log(token)
      if(pass1!=pass2){
          setTest(true)

      }
      else{
      const response = await axios.get('http://localhost:8080/api/v1/user/newpass/'+id+'/'+token+'/'+pass1);
      navigate("/login")
      }
    
    }
    const handleChange1 = (e) =>
    {   console.log(e.target.name)
       console.log(e.target.value)
        const value = e.target.value;
        setPass1(value)
        
        
    }
    const handleChange2 = (e) =>
    {   console.log(e.target.name)
       console.log(e.target.value)
        const value = e.target.value;
        setPass2(value)
        
        
    }
  return (
   
    <div class="auth-wrapper">
        <div class="auth-content">
            <div class="auth-bg">
                <span class="r"></span>
                <span class="r s"></span>
                <span class="r s"></span>
                <span class="r"></span>
            </div>
            <div class="card">
                <div class="card-body text-center">
                    <div class="mb-4">
                        <i class="feather  auth-icon"></i>
                    </div>

                    <h3 class="mb-4">Nouveau mot de passe </h3>
                    <div class="input-group mb-3">
                        <input onChange={handleChange1} defaultValue={pass1} type="email" class="form-control" placeholder="mot de passe" />
                    </div>
                    <h3 class="mb-4">Confirmer le mot de passe </h3>
                    <div class="input-group mb-3">
                        <input onChange={handleChange2} defaultValue={pass2} type="email" class="form-control" placeholder="mot de passe" />
                    </div>
                    { test &&
                   <Alert severity="success">vérifiez votre mot de passe</Alert> }
                    <button class="btn btn-primary mb-4 shadow-2" onClick={search}>Valider</button>
                   
                </div>
            </div>
        </div>
    </div>

  )
}

export default ResetPassword