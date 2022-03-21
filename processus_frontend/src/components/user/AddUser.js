import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const AddUser = () => {
    const [structuresList,setStructureList]=useState([{
        label:'',
        value:0
    }])
    const [appRolesList,setAppRolesList]=useState([{
        label:'',
        value:0
    }])
    const navigate=useNavigate();
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
     const [user,setUser]=useState({
       email:"",firstName:"",lastName:"",cin:"",structureID:0,post:"",approle:0})
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
             const handleChangeSelectAppRole= (e) =>
                {
                 const value = e.target.value;
                 setUser(
                   {...user,approle:parseInt(value)}
                 );
                }
         const post=async(event)=>{
            event.preventDefault();
           const res = await axios.post("http://localhost:8080/api/v1/user/addUser",user);
           console.log(res)
           navigate("users")
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
                                                            <label for="poste">Role</label>
                                                        <select value={user.approle} onChange={(e)=> handleChangeSelectAppRole(e)} 
                                                        class="mb-3 form-control">
                                                            <option value="0">choisir un structure</option>
                                                         {appRolesList.map((appRole) => (
                                                          <option value={appRole.value}>{appRole.label}</option>
                                                           ))}
                                                         </select>
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