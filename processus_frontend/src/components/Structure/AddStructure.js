import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Alert } from '@mui/material'
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Chip } from '@mui/material';
import { FormControl } from '@mui/material';
import { FormLabel,FormGroup,FormControlLabel,Checkbox, } from '@mui/material'
import { ReportGmailerrorred } from '@mui/icons-material'
import { blue, green } from '@mui/material/colors';
import { createRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
const AddStructure= () => {
    const myRef= createRef();
    const [name,setName]=useState("");
    const [form_check,set_form_check]=useState(true)
    const [emailsList,setEmailsList]=useState([])
    const [email_check,setEmail_check]=useState({})
    const [email_labels,setEmail_labels]=useState([])
    const [state, setState] = React.useState(
        {
          privelage1:false,
          privelage2:false ,
          privelage3:false,
          privelage4:false,
          privelage5:false,
          privelage6:false,
          privelage7:false,
          privelage8:false,
        
        
    
        }
         );
         const privelageName=[
           "privelage1","privelage2","privelage3","privelage4","privelage5","privelage6","privelage7","privelage8"
         ]
         const Labels=["traitement la demane d'achat","Approuvation de CPT","Préparation de projet de CCAP","Finalisation le CC et Preparation la methodologie de depouillement"
        ,"Approuvation le CC","Affectaion de dossier d'achat a une structure d 'achat",
        "Plantification les date de lancement de l'AO et de La séance d'ouvertur de plis","designation les membres de ma commission d'evaluation"
        ]
        const handleChangeAppPermission = (event) => {
        
            setState({
              ...state,
              [event.target.name]: event.target.checked,
            }); 
            
          };
    const navigate=useNavigate();
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
             l2[email]=false;
             
            
             l3.push(email)
          })
          console.log(l)
          setEmailsList(l)
          setEmail_check(l2)
          setEmail_labels(l3)
        }
       fetchData();
        
      }, [setEmail_check,setEmail_labels,setEmailsList]);
      const handleMail = (event) => {
       
        setEmail_check({
          ...email_check,
          [event.target.name]: event.target.checked,
        }); 
        
      };
     const [commission,setCommission]=useState({
       name:"",permission:[],abrivation:"",emails:[]})
       const handleChange=(e)=>{
        const value = e.target.value;
        console.log(value)
        console.log(e.target.name)
        if(e.target.name=="name")
        {
          setName(value)
        }
        setCommission(
               {...commission, [e.target.name]: value}
                );
        }
       
        
         const post=async(event)=>{
            event.preventDefault();
            let commission2=commission;
            
            Object.entries(email_check).map(p=>{
                if(p[1]==true){
                  console.log("checking mail")
                  if(!commission2.emails.includes(p[0])){
                    commission2.emails.push(p[0])
                    console.log("pushing")
                  }
                  } 
                })
            let t=[]
            Object.entries(state).map(p=>{
              if(p[1]==true){
                  switch(p[0]){
                      case "privelage1":
                          t.push(1)
                          break
                      case "privelage2":
                           t.push(2)
                           break
                      case "privelage3":
                           t.push(3)
                           break
                      case "privelage4":
                          t.push(4)
                          break
                      case "privelage5":
                           t.push(5)
                           break
                      case "privelage6":
                           t.push(6)
                           break
                      case "privelage7":
                          t.push(7)
                          break
              }
             }
         }
             
            )
            if((t.size==0)||(commission2.abrivation=="")||(commission2.name="")){
              set_form_check(false)
              return ("")
          }
            commission2.privelages=t
            commission2.name=name
            setCommission(commission2)
            console.log(commission2)
            const response=await axios.post("http://localhost:8080/api/structure/addStructure",commission2)
            //dnavigate("/structure")
      
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
                                                        <FormLabel component="legend"><h5> choisir un des privelage</h5></FormLabel>
                                                        <FormGroup>
                                                      {privelageName.map((p) => (
                                                     <FormControlLabel
            
                                                        control={
                 
                                                           <Checkbox
                
                                                                key={p}
                                                                    checked={state[privelageName.indexOf(p)]}
                                                              onChange={(event) => handleChangeAppPermission(event)}
                                                               name={p}
                                                              />
                                                                 }
                                                        label={Labels[privelageName.indexOf(p)]}
                                                                />
                                                              ))}

                                                     </FormGroup>
                                                        
                                                      
                                                      
                                                        
                                                      <div className='row'>
                                                        <button type="submit" onClick={post} className="btn btn-primary">Ajouter</button>
                                                       { !form_check && <Alert severity="error">
                                     
                                     un on des inputs ne sont pas validee — <strong>les-verifie!</strong>
                                   </Alert> }
                                                      </div>
                                                     </form>
                                                </div>
                                                <div className="col-md-4">
                                               
                                                              
                                              <  Box sx={{ display: "flex" }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend"><h5> choisir un des privelage</h5></FormLabel>
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