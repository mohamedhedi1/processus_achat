import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Location } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import useAuth from './hooks/useAuth';
import axios from 'axios';


import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Navbar = () => {
  
    let navigate = useNavigate();
    const [loc,setLoc]=useState(false)
    const [active,setActive]=useState(false)
    const [admin,setAdmin]=useState(false)
    const {auth  }=useAuth();
    const [activeList,setActiveList]=useState([false ,false,false])
    const [Notification,setNotification]=useState({})
    /* ******** snackbar ******** */
    const [open, setOpen] = useState(false);

    const handleClick = () => {
     
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
     /* if (reason === 'clickaway') {
        return;
      }*/
      setOpen(false);
    };
      /************************************ */

    const toggleClass =()=>{
      setActive(!active)
       
    }
    
   
      const [navbar,setNavbar]=useState([{"name":"admin admin","privelages":[{"privelages":"traitement la demane d'achat","link":"/activite1"}]}])
    useEffect(  () => {
      
         async function fetchData() {
          const user =JSON.parse(localStorage.getItem('user'))
           const response=await axios.get("http://localhost:8080/api/v1/user/navbar/"+user)
           const r2=await response.data
           setNavbar(r2)
          
           const response3=await axios.get("http://localhost:8080/notification/"+user)
           const r3=await response3.data
           setLoc(window.location.pathname); 
           if(r3==true){
             setOpen(true)

           }
           
         }
        fetchData();
        
         
       },[] );
       /* ********** alert ************* */
      const s=(p)=>{
        return(<>
        { p.link==loc && <h6>found</h6>}
        </>
        )

      }
      

   
  return (
         
        <nav className="pcoded-navbar">
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
  <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
  votre demande achat est publié sur TUNEPS .
  </Alert>
</Snackbar>
        <div className="navbar-wrapper">
            <div className="navbar-brand header-logo">
                <a href="index.html" className="b-brand">
                    <div className="gct">
                      
                    </div>
                    <span className="b-title">GCT</span>
                </a>
                <a className="mobile-menu" id="mobile-collapse" href="javascript:"><span></span></a>
            </div>
            <div className="navbar-content scroll-div">
            
                <ul className="nav pcoded-inner-navbar">
                {navbar.map(e=>  (

              <li className="nav-item  pcoded-menu-caption">
                  <label >{e.name}</label>
                  <ul className="nav pcoded-inner-navbar">
                      {e.privelages.map(p =>(
                       <>
                       {p.link==loc && 
                       <li  
                       data-username="dashboard Default Ecommerce CRM Analytics Crypto Project"  className=  'nav-item active' >
                      <a   className="nav-link "><span className="pcoded-micon">
                        
                      <i className={p.icon}></i>
                     
                      </span><span className="pcoded-mtext">
                          
                            
                          
                          <Link to={p.link}  replace >{p.privelages}</Link></span></a>
                         </li>
                       }
                        
                        {!(p.link==loc )&& 
                        <li  
                data-username="dashboard Default Ecommerce CRM Analytics Crypto Project"  className=  'nav-item ' >
               <a   className="nav-link "><span className="pcoded-micon">
                 
               <i className={p.icon}></i>
              
               </span><span className="pcoded-mtext">
                   
                     
                   
                   <Link to={p.link}  replace >{p.privelages}</Link></span></a>
                  </li>}
                  </>
                      ))}
                 
                   </ul>
                  </li>


                      ))}
                  







          
               
                    
                
                    <li  data-username="Disabled Menu" className="nav-item"><a href="javascript:" className="nav-link"><span className="pcoded-micon"><i className="feather icon-upload"></i></span><span className="pcoded-mtext"><Link to='/ajoutdemandeachat'>Ajouter une demande</Link></span></a></li>
                    <li  data-username="Disabled Menu" className="nav-item"><a href="javascript:" className="nav-link"><span className="pcoded-micon"><i className="feather icon-power"></i></span><span className="pcoded-mtext"><Link to='/login'>se déconnecter</Link></span></a></li>
                </ul>
            </div>
        </div>
   
   


    </nav>
      )
    }
    
    export default Navbar
