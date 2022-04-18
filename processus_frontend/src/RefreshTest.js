import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
const RefreshTest = () => {
    const [navbar,setNavbar]=useState([{name:"fer"}])
    useEffect(  () => {
      
         async function fetchData() {
           
           
           const response=await axios.get("http://localhost:8080/api/v1/user/navbar/admin@admin.com")
           const r2=await response.data
           setNavbar(r2)
           
         }
        fetchData();
        
         
       },[] );
 
    return (  
        <h1>{navbar.map(e =>(
            <label>{e.name}</label>
        ))} </h1>
    );
}
 
export default RefreshTest;