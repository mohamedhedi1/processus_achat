import React from 'react'

const Reset = () => {
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
                <h3 className="mb-4">Reset Password</h3>
                <div className="input-group mb-3">
                    <input type="email" className="form-control" placeholder="Email" />
                </div>
                <button className="btn btn-primary mb-4 shadow-2">Reset Password</button>
                <p className="mb-0 text-muted">Don’t have an account? <a href="auth-signup.html">Signup</a></p>
            </div>
        </div>
    </div>
</div>
  )
}

export default Reset