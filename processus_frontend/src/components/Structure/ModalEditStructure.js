import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Chip } from '@mui/material';
import axios from 'axios';
import { useState } from 'react'
import { useEffect } from 'react'
import { createRef } from 'react';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalEditStructure(props) {
   const commission=props.commission
   const setCommission=props.setCommission
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
          console.log("l=="+l)
          setEmailsList(l)
          
        }
       fetchData();
         
       
        
      }, [setAppRolesList,setEmailsList]);
      const checkEmails=()=>{
        emailsList.map(email =>{
          if(commission.email.includes(email.label)){
            console.log("checking mail")
           email.checked=true
           email.myRef.current.style.backgroundColor = "blue";
      }})}
       const handleChange=(e)=>{
        const value = e.target.value;
        console.log(value)
        console.log(e.target.name)
        setCommission(
               {...commission, [e.target.name]: value}
                );
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
       
        const handleChangeSelectAppRole= (e) =>
                {
                 const value = e.target.value;
                 setCommission(
                   {...commission,role:value}
                 );
                }
        const handleChangeSelectType= (e) =>
                {
                    console.log(commission)
                 const value = e.target.value;
                 
                 setCommission(
                   {...commission,type:value}
                 );
                }
         const post=async(event)=>{
            event.preventDefault();
            let commission2=commission;
            commission2.emails=[]
            console.log(commission2)
            emailsList.map(email=>{
                console.log(email)
                if(email.checked===true){
                     if(!commission2.emails.includes(email.label)){
                    commission2.emails.push(email.label)}
                }
                
            })
            axios.defaults.crossDomain = 'true';
            const r=axios.put("http://localhost:8080/api/structure/updateStructure",commission2)
            console.log(r)
            let  l=props.commissions.filter((item) => item.id !== commission.id);
            l.push(commission2)
            props.setCommissions(l)
          }
      
         
         
            

  return (
    <div>
    
    <Modal
        open={props.open}
        handleClose = {props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
                                                        
                                                      
                                                        
                                                       
                                                        
                                                    

                                                       
                                                       <button type="submit" onClick={post} className="btn btn-primary">Ajouter</button>
                                                   </form>
                                               </div>
                                               <div className="col-md-4">
                                                              <h4>Users</h4>
                                                               {emailsList.map((email)=>(
                                                                   
                                                               <Chip ref={email.myRef} key={emailsList.indexOf(email)} label={email.label}   
                                                               
                                                               onClick={handleCheckbox} id={email.label}  size="small"  />

                                                                
                                                               
                                                        ))}
                                                       
                                                </div>
                                            </div>
                                        </div>
                                    
          <Button onClick={props.handleClose}>close</Button>
        </Box>
      </Modal>
    </div>
  );
}