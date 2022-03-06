import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <div>
<head>
    <title>Datta Able Free Bootstrap 4 Admin Template</title>
    
		<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
		<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
		
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui"/>
  

   
    <link rel="icon" href="assets/images/favicon.ico" type="image/x-icon"/>
   
    <link rel="stylesheet" href="assets/fonts/fontawesome/css/fontawesome-all.min.css"/>
   
    <link rel="stylesheet" href="assets/plugins/animation/css/animate.min.css"/>
   
    <link rel="stylesheet" href="assets/css/style.css"/>

</head>

<body>
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
                        <i className="feather icon-unlock auth-icon"></i>
                    </div>
                    <h3 className="mb-4">Login</h3>
                    <div className="input-group mb-3">
                        <input type="email" className="form-control" placeholder="Email"/>
                    </div>
                    <div className="input-group mb-4">
                        <input type="password" className="form-control" placeholder="password"/>
                    </div>
                    <div className="form-group text-left">
                        <div className="checkbox checkbox-fill d-inline">
                            <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1" checked=""/>
                            <label for="checkbox-fill-a1" className="cr"> Save Details</label>
                        </div>
                    </div>
                    <button className="btn btn-primary shadow-2 mb-4">Login</button>
                    <p className="mb-2 text-muted">Forgot password? <a href="auth-reset-password.html">Reset</a></p>
                    <p className="mb-0 text-muted">Don’t have an account? <a href="auth-signup.html">Signup</a></p>
                </div>
            </div>
        </div>
    </div>

 



</body>
</div>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
