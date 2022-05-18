import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Chip } from '@mui/material';
import axios from 'axios';
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
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
   const [email_check,setEmail_check]=useState({})
   const [email_labels,setEmail_labels]=useState([])
    const [appRolesList,setAppRolesList]=useState([{
        label:'',
        value:0
    }])
    useEffect(
      ()=>{
           console.log(commission)      

           console.log("mounted")      
                    },[email_check]
    )
    useEffect(  () => {
        async function fetchData() {
          
          
         
          const response=await axios.get("http://localhost:8080/api/v1/user/AllMails")
          const r2=await response.data
          console.log(r2)
          let l=[]
          let l2={}
          let l3=[]
          r2.map(email=>{
             l.push({
                label:email,
                checked:false,
                myRef:createRef()
             })
             console.log("hhh")
             console.log(commission)
             l2[email]=false;
             if(commission.emails.includes(email)){
              l2[email]=true;
              console.log("hhh")
             }
            
             
            
             l3.push(email)
          })
          console.log("l=="+l)
          setEmailsList(l)
          setEmail_check(l2)
          setEmail_labels(l3)

        }
       fetchData();
         
       
        
      }, [commission,setEmail_check,setEmail_labels,setEmailsList]);
      const checkEmails=()=>{
        emailsList.map(email =>{
          if(commission.email.includes(email.label)){
            console.log("checking mail")
           email.checked=true
           email.myRef.current.style.backgroundColor = "blue";
      }})}
      const handleMail = (event) => {
       
        setEmail_check({
          ...email_check,
          [event.target.name]: event.target.checked,
        }); 
        
      };
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
            Object.entries(email_check).map(p=>{
              if(p[1]==true){
                console.log("checking mail")
                if(!commission2.emails.includes(p[0])){
                  commission2.emails.push(p[0])
                  console.log("pushing")
                }
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
          <h2>Modifier Structure</h2>
        <div className="card-body">
                                           
                                            
                                           <div className="row">
                                               <div className="col-md-6">
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
                                                            <label for="abrivation">Region</label>
                                                            <input defaultValue={commission.region} name="region" onChange={(e)=> handleChange(e)} 
                                                       type="text" className="form-control" id="nom" aria-describedby="emailHelp" placeholder="region" />
                                                        </div>
                                                        
                                                      
                                                        
                                                       
                                                        
                                                    

                                                       
                                                      
                                                   </form>
                                               </div>
                                               <div className="col-md-6">
                                                                              
                                               <Box sx={{ display: "flex" }}>
      <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
        <FormLabel component="legend"><h5> choisir un ou des utilisateurs</h5></FormLabel>
        <FormGroup>
                 {email_labels.map((p) => (
                       <FormControlLabel
            
              control={
                 
                <Checkbox
                
                  key={p}
                  checked={email_check[p]}
                  onChange={(event) => handleMail(event)}
                  name={p}
                />
              }
              label={p}
            />
          ))}

        </FormGroup>
      </FormControl>
     
      

    </Box>
                                                       
                                                </div>
                                            </div>
                                        </div>
                                    
          <Button onClick={props.handleClose}>Quitter</Button>
          <button type="submit" onClick={post} className="btn btn-primary">Valider</button>
        </Box>
      </Modal>
    </div>
  );
}