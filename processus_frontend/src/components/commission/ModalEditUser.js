import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { useState } from 'react'
import { useEffect } from 'react'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalEditUser(props) {
    const user=props.user ;
    const setUser=props.setUser;
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

       const handleChange = (e) =>
     {
         const value = e.target.value;
         console.log(value)
         console.log(e.target.name)
         props.setUser(
           {...user, [e.target.name]: value}
         );
         }
         const handleChangeSelectStrucutre = (e) =>
         {
             const value = e.target.value;
             props.setUser(
               {...user, structureName:value}
             );
             
     
             }
             const handleChangeSelectAppRole= (e) =>
                {
               const value = e.target.value;
                 setUser(
                   {...user,appRoleName:value}
                 );
                 }
         const update=async(event)=>{
            event.preventDefault();
            console.log(user);
          
           const res = await axios.put("http://localhost:8080/api/v1/user/update",user);
           console.log(res)
           let  l=props.users.filter((item) => item.id !== user.id);
           l.push(user)
           props.setUsers(l)
         }
  return (
    <div>
      { console.log("here user",user)}
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
                                                       <select value={user.appRoleName} onChange={(e)=> handleChangeSelectAppRole(e)} 
                                                       class="mb-3 form-control">
                                        
                                                        {appRolesList.map((appRole) => (
                                                         <option value={appRole.label}>{appRole.label}</option>
                                                          ))}
                                                        </select>
                                                        </div>
                                                      
                                                       <div className="form-group">
                                                           <label for="cin">cin</label>
                                                           <input  name="cin" defaultValue={user.cin} onChange={(e)=> handleChange(e)} 
                                                            type="text" className="form-control" id="cin" aria-describedby="emailHelp" placeholder="Cin" />
                                                       </div>
                                                       <div className="form-group">
                                                           <label for="structure">structure</label>
                                                           <select value={user.structureName}   onChange={(e)=> handleChangeSelectStrucutre(e)} className="mb-3 form-control">
                                                           
                                                           {structuresList.map((structure) => (
                                                             <option value={structure.label}>{structure.label}</option>
                                                           ))}
                                                        </select>
                                                       </div>

                                                       
                                                       <button type="submit" onClick={update} className="btn btn-primary">Ajouter</button>
                                                   </form>
                                               </div>
                                            </div>
                                        </div>
                                    
          <Button onClick={props.handleClose}>close</Button>
        </Box>
      </Modal>
    </div>
  );
}