import React, {useState} from 'react'

import AppServices from '../services/AppServices';
import axios from "axios";
import useAuth from '../components/hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";


const Login = () => {
    function RedBar() {
        return (
          <Box
            sx={{
              height: 10,
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? "rgba(0, 0, 0, 0)"
                  : "rgb( 0  0 0 / 0 %)"
            }}
          />
        );
      }
    const { auth,setAuth } = useAuth();
    
    const navigate = useNavigate();
    const location = useLocation();
    const [testvalue1, settestValue1] = React.useState(false);
    const from = location.state?.from?.pathname || "/";
    const [appUser, setUser] = useState(
        {
         username:"",
         password:""
        }    
        );
    
    const handleChange = (e) =>
     {   console.log(e.target.name)
        console.log(e.target.value)
         const value = e.target.value;
         setUser(
           {...appUser, [e.target.name]: value}
         );
 
     }
     /*
     
     const login = async (e) =>
     {
         e.preventDefault();
     
         AppServices.login(user)
         .then((response) =>
         {
             console.log(response);
             console.log("done");
             //navigate("/navbar")
         })
         .catch((error) =>{
             console.log(error);
         })
    } **/
    const getapi = async (event) => {
        event.preventDefault();
        try {
        const response = await axios.get('http://localhost:8080/api/v1/user');
        console.log(response)}
        catch(error) {
          console.log(error)
        }

    }
    const login =async (event) => {
        event.preventDefault();
        axios.defaults.withCredentials = 'true';
        axios.defaults.crossDomain = 'true';
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers.post['withCredentials'] = 'true';
        // eslint-disable-next-line no-console
        
        try {
          
            //make axios post request
            const f=new FormData();
            
            f.append('username',appUser.username);
            f.append('password',appUser.password)
            console.log(appUser);
            
            const response = await axios.post('http://localhost:8080/login',f);
            let data=response.data;
            const response2=await axios.get("http://localhost:8080/api/v1/user/navbar/"+appUser.username)
          const r2=await response2.data
            const roles=data.privelages
            const user=data.email
            const navbar=r2
            
            const n=''
            setAuth({ user,navbar,roles,n});

            console.log(auth);
            localStorage.setItem('auth', JSON.stringify(auth));


            localStorage.setItem('user',JSON.stringify(user));
            localStorage.setItem('navbar',JSON.stringify(navbar));
            localStorage.setItem('roles',JSON.stringify(roles ));
            
            
            settestValue1(false)
            if( roles.includes(9))
            {navigate("/users")}
          else{
            navigate("/demandeachatenregister")}
            
            
          
           
          } catch(error) {
            settestValue1(true)
            console.log(error)
          }/*
          if (appUser.password=="admin"){
            {/*navigate("/users")}

          }*/

         
        
      };
 
  return (
      <>
      
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
                <h3 className="mb-4">Se connecter</h3>
                <RedBar />
          {testvalue1 && (
            <Alert variant="outlined" severity="error">
             votre mot de passe ou /et email est incorecte .            </Alert>
          )
          
          }
          <RedBar />

                <div className="input-group mb-3">
                    <input type="email" name="username"
                    defaultValue={appUser.username} onChange={(e)=> handleChange(e)} 
                    className="form-control" placeholder="Email" />
                </div>
                <div className="input-group mb-4">
                    <input type="password"  name="password"
                    defaultValue={appUser.password} onChange={(e)=> handleChange(e)} 
                    className="form-control" placeholder="password" />
                </div>
               
                <button
                onClick={login}
                className="btn btn-primary shadow-2 mb-4">Connexion</button>
                <p className="mb-2 text-muted"> <a href="/reset">Mot de passe oublié ?</a></p>
           
            </div>
        </div>
    </div>
</div>

      </>
    

  )
}


export default Login