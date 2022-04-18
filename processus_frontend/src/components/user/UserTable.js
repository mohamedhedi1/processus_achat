import * as React from 'react';
import { DataGrid, renderActionsCell } from '@mui/x-data-grid';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import DeleteIcon from'@mui/icons-material/Delete';
import { spacing } from '@mui/system';
import Box from '@mui/material/Box';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Link } from "react-router-dom";
import AppRole from '../AppRole/AppRole'
import { useEffect } from 'react';
import axios from 'axios';
import { Container } from '@mui/material';
import Chip from '@mui/material/Chip';
import { useState } from 'react';
import { Stack } from '@mui/material';
import useAuth from '../hooks/useAuth';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import AddIcon from '@mui/icons-material/Add'
import ModalEditUser from'../user/ModalEditUser'
import { useNavigate } from 'react-router-dom';

import { Card } from '@mui/material';
export default function DataTable() {
const columns = [
  { field: 'firstName', headerName: 'Prenom', width: 130 ,editable: false},
  {field: 'structureName', headerName: 'nom de Structure', width: 220 ,
  renderCell: (cellValues) => {
    return (
      <div >
      {cellValues.value}
      </div>
    );
  }
  },
  { field: 'lastName', headerName: 'nom', width: 130 ,editable: false},
  {field: 'email',headerName: 'Email',width: 220,editable: false
  },
  {field: 'cin',headerName: 'Matircule',type: 'number',width: 90,editable: false
  },
  {field: 'post',headerName: 'Poste',width: 90,editable: false
  },
  {
    field: "Activtie",width:80,
    renderCell: (cellValues) => {
      return (
        <div >
        <AppRole upUrl="http://localhost:8080/api/v1/appPermission/user/" getUrl="http://localhost:8080/api/v1/appPermission/user/" id={cellValues.row.id}></AppRole>
        </div>
      );
    }
  },
  { field:'locked',headerName: "Locked",width:80,editable: false,
    renderCell: (cellValues) => {
      return (
        <div  >
        <Fab  size="small"   onClick={() =>changeLockState(cellValues)}  sx={{ m:1  }} className="label theme-bg2 text-white f-12"  aria-label="add">
          {cellValues.value===true &&<LockIcon />}
          {cellValues.value===false &&<LockOpenIcon/>}
        </Fab>
        </div>
      );
    }
  },
  {
    field: "Action",width:120,
    renderCell: (cellValues) => {
      return (
        <div >
        <Fab size="small" onClick={ ()=> set_user(cellValues)} sx={{ m:1  }} className="label theme-bg text-white f-12"  aria-label="add">
            <EditIcon />
        </Fab>
        <Fab size="small"   onClick={()=>deleteUser(cellValues)}  sx={{ m:1  }} className="label theme-bg2 text-white f-12" aria-label="edit">
          <DeleteIcon />
        </Fab>
        </div>
      );
    }
  }
];
const [open, setOpen] = useState(false);
const handleOpen = () => {
 setOpen(true);
}
const { auth } = useAuth();
let navigate = useNavigate();
const handleClose = () => setOpen(false);
const [user,setUser]=useState({
  id:0,
  firstName:"",
  lastName:"",
  email:"",
  cin:"",
  post:"", 
  appRoleName:"",
  locked:"",
  structureName:""

})
const deleteUser=async (cellValues)=>{
  const id=cellValues.row.id 
  console.log("deleteling user "+id)
  const response = await axios.delete("http://localhost:8080/api/v1/user/"+id)//delte users
  const newusers = users.filter((item) => item.id !== cellValues.row.id);
  setUsers(newusers);
}
const changeLockState=(cellValues)=>{
  users.map(async(u)=>{
  if(u.id==cellValues.row.id){ 
    if(cellValues.value==true){
      u.locked=false
      const response = await axios.get("http://localhost:8080/api/v1/user/setLockUser/"+u.id+"?lock=false")
    }
    if(cellValues.value==false){
      u.locked=true
      const response = await axios.get("http://localhost:8080/api/v1/user/setLockUser/"+u.id+"?lock=true")
    }
  }  
  })
  setUsers(users);
}
const [users, setUsers] = useState([]);
const set_user=(cellValues)=>{
  console.log(cellValues.row);
  setUser(cellValues.row);
  handleOpen();
}
useEffect(  () => {
  async function fetchData() {
    const response = await axios.get("http://localhost:8080/api/v1/user")
    const l =await response.data
    console.log(l)
    setUsers(l)
  }
 fetchData();
 console.log(auth)
  
}, [setUsers,auth]);
  return (
    <Container mb={2}>
       <ModalEditUser
          user={user}
          open={open}
          users={users}
          setUsers={setUsers}
          handleClose = {handleClose}
          setUser={setUser}
        />   
    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
      <h4>
       utilisateurs
        </h4>
        <Fab  onClick={()=>{navigate('/addUser')}} className="label theme-bg2 text-white f-12" variant="extended">
        <AddIcon size="small"  sx={{ mr: 1 }} />
           Ajouter un utilisateur
             </Fab>
    </Stack>

    <Card>
    <div style={{ height: 800, width: '100%' }}>
      <DataGrid
        rows={users}
        columns={columns}
        
      />

    </div>
    </Card>
    </Container>
  );
}
