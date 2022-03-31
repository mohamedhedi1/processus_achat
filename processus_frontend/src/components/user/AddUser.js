import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
const AddUser = () => {
    const [structuresList,setStructureList]=useState([{
        label:'',
        value:0
    }])
    const [state, setState] = React.useState(
        {
          privelage1:false,
          privelage2:false ,
          privelage3:false,
          privelage4:false,
          privelage5:false,
          privelage6:false,
          privelage7:false,
        
    
        }
         );
         const privelageName=[
           "privelage1","privelage2","privelage3","privelage4","privelage5","privelage6","privelage7"
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
          const response = await axios.get("http://localhost:8080/api/structure/structureAndId")
          const l =await response.data
          setStructureList(l)
         
        }
       fetchData();
        
      }, [setStructureList]);
     const [user,setUser]=useState({
       email:"",firstName:"",lastName:"",cin:"",structureID:0,post:"",privelages:""})
       const handleChange = (e) =>
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
            
         const post=async(event)=>{
            event.preventDefault();
           /*const res = await axios.post("http://localhost:8080/api/v1/user/addUser",user);
           console.log(res)
           navigate("/users")*/
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
           user.permissions=t;
           const res = await axios.post("http://localhost:8080/api/v1/user/addUser",user);
           console.log(res)
           navigate("/users")

           
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
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h5>Ajouter un utilisateur</h5>
                                        </div>
                                        <div className="card-body">
                                           
                                            
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <form>
                                                        <div className="form-group">
                                                            <label for="exampleInputEmail1">Email</label>
                                                            <input defaultValue={user.email} name="email" onChange={(e)=> handleChange(e)} 
                                                            type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="email" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label for="nom">Nom</label>
                                                            <input defaultValue={user.firstName} name="firstName" onChange={(e)=> handleChange(e)} 
                                                       type="text" className="form-control" id="nom" aria-describedby="emailHelp" placeholder="Nom" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label for="prenom">Prénom</label>
                                                            <input defaultValue={user.lastName} name="lastName"  onChange={(e)=> handleChange(e)} 
                                                            type="text" className="form-control" id="prenom" aria-describedby="emailHelp" placeholder="Prénom" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label for="poste">Poste</label>
                                                            <input defaultValue={user.post} name="post" onChange={(e)=> handleChange(e)} 
                                                     type="text" className="form-control" id="poste" aria-describedby="emailHelp" placeholder="Poste" />
                                                        </div>
                                                      
                                                       
                                                        <div className="form-group">
                                                            <label for="cin">cin</label>
                                                            <input  name="cin"   defaultValue={user.cin} onChange={(e)=> handleChange(e)} 
                                                             type="text" className="form-control" id="cin" aria-describedby="emailHelp" placeholder="Cin" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label for="structure">structure</label>
                                                            <select value={user.structureName}    onChange={(e)=> handleChangeSelectStrucutre(e)} className="mb-3 form-control">
                                                            <option value="0">choisir un structure</option>
                                                            {structuresList.map((structure) => (
                                                              <option value={structure.value}>{structure.label}</option>
                                                            ))}
                                                         </select>
                                                        </div>

                                                        
                                                        <button type="submit" onClick={post} className="btn btn-primary">Ajouter</button>
                                                    </form>
                                                </div>
                                                <div className="col-md-4">
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