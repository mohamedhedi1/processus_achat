import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import AppServices from '../services/AppServices';
import axios from "axios";




const Login = () => {
    const [user, setUser] = useState(
        {
         username:"admin@admin.com",
         password:"admin"
        }    
        );
        const navigate = useNavigate();
        const handleChange = (e) =>
     {
         const value = e.target.value;
         setUser(
           {...user, [e.target.name]: value}
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
            f.append('username',user.username);
            f.append('password',user.password)
            console.log(f);
            const response = await axios.post('http://localhost:8080/login',f);
           // AppServices.login(user)
            console.log(user)
          
           
          } catch(error) {
            console.log(error)
          }
        
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
                <div className="input-group mb-3">
                    <input type="email" 
                    value={user.username} onChange={(e)=> handleChange(e)} 
                    className="form-control" placeholder="Email" />
                </div>
                <div className="input-group mb-4">
                    <input type="password" 
                    value={user.password} onChange={(e)=> handleChange(e)} 
                    className="form-control" placeholder="password" />
                </div>
               
                <button
                onClick={login}
                className="btn btn-primary shadow-2 mb-4">Connexion</button>
                <p className="mb-2 text-muted"> <a href="">Mot de passe oublié ?</a></p>
           
            </div>
        </div>
    </div>
</div>

      </>
    

  )
}


export default Login