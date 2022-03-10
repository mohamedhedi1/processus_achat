import React from 'react'

const ResetPassword = () => {
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
                        <i class="feather icon-mail auth-icon"></i>
                    </div>
                    <h3 class="mb-4">Mot de passe oublié</h3>
                    <div class="input-group mb-3">
                        <input type="email" class="form-control" placeholder="Email" />
                    </div>
                    <button class="btn btn-primary mb-4 shadow-2">Réinitialiser</button>
                    <p class="mb-0 text-muted"> <a href="auth-signup.html">Connexion</a></p>
                </div>
            </div>
        </div>
    </div>

  )
}

export default ResetPassword