import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Chip } from '@mui/material';
import { FormLabel,FormGroup,FormControlLabel,Checkbox, } from '@mui/material'
import { ReportGmailerrorred } from '@mui/icons-material'
import { blue, green } from '@mui/material/colors';
import { createRef } from 'react';

const AddStructure= () => {
    const myRef= createRef();
    const [emailsList,setEmailsList]=useState([])
    const [appRolesList,setAppRolesList]=useState([{
        label:'',
        value:0
    }])
    useEffect(  () => {
        async function fetchData() {
          
          const res=await axios.get("http://localhost:8080/api/v1/AppRole/NameAndId")
          const r=await res.data
          setAppRolesList(r)
          const response=await axios.get("http://localhost:8080/api/v1/user/AllMails")
          const r2=await response.data
          console.log(r2)
          let l=[]
          r2.map(email=>{
             l.push({
                label:email,
                checked:false,
                myRef:createRef()
             })
          })
          console.log(l)
          setEmailsList(l)
        }
       fetchData();
        
      }, [setAppRolesList,setEmailsList]);
     const [commission,setCommission]=useState({
       name:"",role:"",abrivation:"",emails:[]})
       const handleChange=(e)=>{
        const value = e.target.value;
        console.log(value)
        console.log(e.target.name)
        setCommission(
               {...commission, [e.target.name]: value}
                );
        }
       
        const handleChangeSelectAppRole= (e) =>
                {
                 const value = e.target.value;
                 setCommission(
                   {...commission,role:value}
                 );
                }
         const post=async(event)=>{
            event.preventDefault();
            let commission2=commission;
            
            emailsList.map(email=>{
                console.log(email)
                if(email.checked===true){
                     if(!commission2.emails.includes(email.label)){
                    commission2.emails.push(email.label)}
                }
                
            })
            setCommission(commission2)
            console.log(commission2)
            const response=await axios.post("http://localhost:8080/api/v1/commission/addCommission",commission2)
      
         }
         const handleCheckbox =(e)=>{
          
            
           
             console.log(e)
             console.log(e.target.textContent)
             e.preventDefault();
            emailsList.map(email =>{
                
                 if(email.label==e.target.textContent){
                     
                   if(email.checked==true){
                       console.log("trying 1if")
                         email.checked=false
                         email.myRef.current.style.backgroundColor = "cyan";
                        

                     }
                    else if(email.checked==false){
                        console.log("trying  2 if")
                         email.checked=true
                         email.myRef.current.style.backgroundColor = "blue";
                         
                        
                         
                     }
                    
                    }
             })
           
             setEmailsList(emailsList)

         }
         
         



         //getRole
         //get
  return (  <>
   <div className="pcoded-main-container">
        <div className="pcoded-wrapper">
            <div className="pcoded-content">
                <div className="pcoded-inner-content">
                    <div className="main-body">
                        <div className="page-wrapper">
                            <div className="row">
                                <div className="col-sm-8">
                                    <div className="card">
                                        <div className="card-header">
                                            <h5>Ajouter un commission</h5>
                                        </div>
                                        <div className="card-body">
                                           
                                            
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <form>
                                                        <div className="form-group">
                                                            <label for="name">Name</label>
                                                            <input defaultValue={commission.name} name="name" onChange={(e)=> handleChange(e)} 
                                                            type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="email" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label for="abrivation">Abbrivation</label>
                                                            <input defaultValue={commission.abrivation} name="abrivation" onChange={(e)=> handleChange(e)} 
                                                       type="text" className="form-control" id="nom" aria-describedby="emailHelp" placeholder="Nom" />
                                                        </div>
                                                        
                                                      
                                                        <div className="form-group">
                                                            <label for="role">Role</label>
                                                        <select value={commission.role} onChange={(e)=> handleChangeSelectAppRole(e)} 
                                                        class="mb-3 form-control">
                                                            <option value="0">choisir un role</option>
                                                         {appRolesList.map((appRole) => (
                                                          <option value={appRole.label}>{appRole.label}</option>
                                                           ))}
                                                         </select>
                                                         </div>
                                                       
                                                        
                                                    
                                                        <button type="submit" onClick={post} className="btn btn-primary">Ajouter</button>
                                                    </form>
                                                </div>
                                                <div className="col-md-4">
                                               
                                                               {emailsList.map((email)=>(
                                                                   
                                                               <Chip ref={email.myRef} key={emailsList.indexOf(email)} label={email.label}   
                                                               
                                                               onClick={handleCheckbox} id={email.label}  size="small"  />

                                                                
                                                               
                                                        ))}
                                                </div>
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                            </div>   
                        </div>   
                    </div>
                </div>
            </div>
        </div>
    </div>
      </>
     
    
  )
}

export default AddStructure