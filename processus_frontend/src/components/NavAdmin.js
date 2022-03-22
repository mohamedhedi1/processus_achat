import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Location } from 'react-router-dom';
import { Link } from 'react-router-dom';
const NavAdmin = () => {
    let navigate = useNavigate();
   
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
                    <li className="nav-item pcoded-menu-caption">
                        <label>Navigation</label>
                    </li>
    
                    
                    <li  data-username="dashboard Default Ecommerce CRM Analytics Crypto Project" className="nav-item active">
                        <a  className="nav-link "><span className="pcoded-micon"><i className="feather icon-home"></i></span><span className="pcoded-mtext">
                        
                            Dashboard
                            
                            </span></a>
                    </li>
                    <li  
                    data-username="dashboard Default Ecommerce CRM Analytics Crypto Project" className="nav-item active">
                        <a   className="nav-link "><span className="pcoded-micon"><i className="feather icon-user"></i></span><span className="pcoded-mtext">
                            
                        <Link to="/users">Utlisateur</Link></span></a>
                    </li>
                    <li 
                     data-username="dashboard Default Ecommerce CRM Analytics Crypto Project" className="nav-item active">
                        <a   className="nav-link "><span className="pcoded-micon"><i className="feather icon-users"></i></span><span className="pcoded-mtext"><Link to="/structure">Structure</Link>
</span></a>
                    </li>
                    <li data-username="dashboard Default Ecommerce CRM Analytics Crypto Project" className="nav-item ">
                        <a   className="nav-link "><span className="pcoded-micon"><i className="feather icon-briefcase"></i></span><span className="pcoded-mtext"><Link to="/commission">Commission</Link> </span></a>
                    </li>
                    <li data-username="dashboard Default Ecommerce CRM Analytics Crypto Project" className="nav-item ">
                        <a  className="nav-link "><span className="pcoded-micon"><i className="feather icon-list"></i></span><span className="pcoded-mtext">Role</span></a>
                    </li>
      
                    <li  data-username="Disabled Menu" className="nav-item disabled"><a href="javascript:" className="nav-link"><span className="pcoded-micon"><i className="feather icon-power"></i></span><span className="pcoded-mtext">Disabled menu</span></a></li>
                </ul>
            </div>
        </div>
    </nav>
      )
    }
    
    export default NavAdmin
