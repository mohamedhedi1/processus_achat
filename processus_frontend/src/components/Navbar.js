import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Location } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import useAuth from './hooks/useAuth';
import axios from 'axios';
const Navbar = () => {
  
    let navigate = useNavigate();
    
    const [active,setActive]=useState(false)
    const [admin,setAdmin]=useState(false)
    const {auth  }=useAuth();
    const [activeList,setActiveList]=useState([false ,false,false])
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
           
         }
        fetchData();
        
         
       },[] );

   
  return (
         
        <nav className="pcoded-navbar">
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
                        <li  
                data-username="dashboard Default Ecommerce CRM Analytics Crypto Project"  className=  'nav-item ' >
               <a   className="nav-link "><span className="pcoded-micon">
                 
               <i className={p.icon}></i>
              
               </span><span className="pcoded-mtext">
                   
                     
                   
                   <Link to={p.link}  replace >{p.privelages}</Link></span></a>
                  </li>

                      ))}
                 
                   </ul>
                  </li>


                      ))}
                  







                    
               
                    
                    
        
                    <li  data-username="Disabled Menu" className="nav-item"><a href="javascript:" className="nav-link"><span className="pcoded-micon"><i className="feather icon-upload"></i></span><span className="pcoded-mtext"><Link to='/ajoutdemandeachat'>Ajouter un demande</Link></span></a></li>
                    <li  data-username="Disabled Menu" className="nav-item"><a href="javascript:" className="nav-link"><span className="pcoded-micon"><i className="feather icon-power"></i></span><span className="pcoded-mtext"><Link to='/login'>se déconnecter</Link></span></a></li>
                </ul>
            </div>
        </div>
    </nav>
      )
    }
    
    export default Navbar
