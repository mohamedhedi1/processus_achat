import React from 'react'
import { useState } from 'react';
const ResetPassword = () => {
    const [pass1,setPass1]=useState('');
    const [pass2,setPass2]=useState('');
    const search=()=>{
      console.log(window.location.pathname); 
        const queryParams = new URLSearchParams(window.location.search); 
        const id = queryParams.get('email');
        console.log(id)
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
                        <input type="email" class="form-control" placeholder="mot de passe" />
                    </div>
                    <h3 class="mb-4">Confirmer le mot de passe </h3>
                    <div class="input-group mb-3">
                        <input type="email" class="form-control" placeholder="mot de passe" />
                    </div>
                    <button class="btn btn-primary mb-4 shadow-2" onClick={search}>Valider</button>
                   
                </div>
            </div>
        </div>
    </div>

  )
}

export default ResetPassword