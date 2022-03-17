import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { FormLabel,FormGroup,FormControlLabel,Checkbox, } from '@mui/material'
const AddUser = () => {
    const [structuresList,setStructureList]=useState([{
        label:'',
        value:0
    }])
    const [appRolesList,setAppRolesList]=useState([{
        label:'',
        value:0
    }])
    useEffect(  () => {
        async function fetchData() {
          const response = await axios.get("http://localhost:8080/api/structure/structureAndId")
          const l =await response.data
          setStructureList(l)
          const res=await axios.get("http://localhost:8080/api/v1/AppRole/NameAndId")
          const r=await res.data
          setAppRolesList(r)
        }
       fetchData();
        
      }, [setStructureList,setAppRolesList]);
     const [commission,setCommission]=useState({
       name:"",role:"",abrivation:"",type:"",emails:""})
        {
        const value = e.target.value;
        console.log(value)
        console.log(e.target.name)
        setUser(
               {...user, [e.target.name]: value}
                );
        }
        const handleChangeSelectStrucutre = (e) =>
            {
            const value = e.target.value;
            setUser(
               {...user, structureID:parseInt(value)}
             );
            }
        const handleChangeSelectAppRole= (e) =>
                {
                 const value = e.target.value;
                 setUser(
                   {...user,approle:parseInt(value)}
                 );
                }
         const post=async(event)=>{
            event.preventDefault();
           console.log(res)
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
                                <div className="col-sm-5">
                                    <div className="card">
                                        <div className="card-header">
                                            <h5>Ajouter un commission</h5>
                                        </div>
                                        <div className="card-body">
                                           
                                            
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <form>
                                                        <div className="form-group">
                                                            <label for="exampleInputEmail1">Name</label>
                                                            <input defaultValue={commission.name} name="email" onChange={(e)=> handleChange(e)} 
                                                            type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="email" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label for="nom">Abbrivation</label>
                                                            <input defaultValue={commission.abrivation} name="firstName" onChange={(e)=> handleChange(e)} 
                                                       type="text" className="form-control" id="nom" aria-describedby="emailHelp" placeholder="Nom" />
                                                        </div>
                                                        
                                                      
                                                        <div className="form-group">
                                                            <label for="poste">Role</label>
                                                        <select value={commission.role} onChange={(e)=> handleChangeSelectAppRole(e)} 
                                                        class="mb-3 form-control">
                                                            <option value="0">choisir un structure</option>
                                                         {appRolesList.map((appRole) => (
                                                          <option value={appRole.value}>{appRole.label}</option>
                                                           ))}
                                                         </select>
                                                         </div>
                                                       
                                                        
                                                        <div className="form-group">
                                                            <label for="structure">Type</label>
                                                            <select value={commission.type}    onChange={(e)=> handleChangeSelectStrucutre(e)} className="mb-3 form-control">
                                                            <option value="0">choisir un structure</option>
                                                            <option value="0">permanante</option>
                                                            <option value="0">nonpermanante</option>  
                                                         </select>
                                                        </div>                        
                                                        <button type="submit" onClick={post} className="btn btn-primary">Ajouter</button>
                                                    </form>
                                                </div>
                                                <div className="col-md-4">
                                                <FormLabel component="legend">Pick two</FormLabel>
                                                   <FormGroup>
                                                      <FormControlLabel
                                                           control={
                                                            <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
                                                        }
                                                        label="Gilad Gray"
                                                        />
                                                                 <FormControlLabel
                                                                   control={
                                                                    <Checkbox checked={jason} onChange={handleChange} name="jason" />
                                                                }
                                                                label="Jason Killian"
                                                                />
                                                                 <FormControlLabel
                                                                   control={
                                                                    <Checkbox checked={antoine} onChange={handleChange} name="antoine" />
                                                                }
                                                                label="Antoine Llorca"
                                                                />
                                                               </FormGroup>
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

export default AddUser