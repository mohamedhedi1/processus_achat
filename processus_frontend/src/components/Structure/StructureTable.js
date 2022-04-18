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
import { useEffect } from 'react';
import axios from 'axios';
import { Container } from '@mui/material';
import Chip from '@mui/material/Chip';
import { useState } from 'react';
import { Stack } from '@mui/material';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import AddIcon from '@mui/icons-material/Add'
import ModalEditStructure from './ModalEditStructure';
import { useNavigate } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import AppRole from '../AppRole/AppRole'
import { Card } from '@mui/material';
import { ModelTraining } from '@mui/icons-material';
import ModalUser from './modalUser';
export default function StructureTable() {
const columns = [
  { field: 'name', headerName: 'Nom', width: 300 ,editable: false},

  {field: 'abrivation',headerName: 'Abriviation',width: 90,editable: false
  },
  {
    field: "Activtie",width:160,
    renderCell: (cellValues) => {
      return (
        <div >
        <AppRole upUrl="http://localhost:8080/api/v1/appPermission/structure/" getUrl="http://localhost:8080/api/v1/appPermission/structure/" id={cellValues.row.id}></AppRole>
        </div>
      );
    }
  },
  {
    field: "Action",width:160,
    renderCell: (cellValues) => {
      return (
        <div >
        <Fab size="small" onClick={ ()=> set_commission(cellValues)} sx={{ m:1  }} className="label theme-bg text-white f-12"  aria-label="add">
            <EditIcon />
        </Fab>
        <Fab size="small"   onClick={()=>deleteCommission(cellValues)}  sx={{ m:1  }} className="label theme-bg2 text-white f-12" aria-label="edit">
          <DeleteIcon />
        </Fab>
        </div>
      );
    }
  },
  {
    field: "utilisateurs",width:100,
    renderCell: (cellValues) => {
      return (
        <div >
        <Fab size="small" onClick={ ()=>  handleClickOpen1(cellValues)} sx={{ m:1  }} className="label theme-bg text-white f-12"  aria-label="add">
            <PeopleIcon />
        </Fab>
        </div>
      );
    }
  }
];
const [open, setOpen] = useState(false);
const [open1, setOpen1] = React.useState(false);
const [echange_value,setEchange]=useState();
  const handleClickOpen1 = (cellValues) => {
    console.log(cellValues.row.emails)
    setEchange(cellValues.row.emails)
    
    setOpen1(true);
  };

  const handleClose1 = () => {
    console.log(echange_value)
    setOpen1(false);
   ;
  };

const handleOpen = () => {
 setOpen(true);
}
let navigate = useNavigate();
const handleClose = () => setOpen(false);
const[commissions,setCommissions]=useState([{
  id:0,name:"",permission:[],abrivation:"",emails:[]
}])
const [commission,setCommission]=useState({
  id:0,name:"",permission:[],abrivation:"",emails:[]
})
const deleteCommission=async (cellValues)=>{
  
  const id=cellValues.row.id 
  console.log("deleteling commission "+id)
  const response = await axios.delete("http://localhost:8080/api/structure/"+id)//delte users
  const newCommission = commissions.filter((item) => item.id !== cellValues.row.id);
  
  setCommissions(newCommission);
}

const [emails,SetEmails] = useState([]);
const set_commission=(cellValues)=>{
  console.log(cellValues.row);
  setCommission(cellValues.row);
  handleOpen();
}
useEffect(  () => {
  async function fetchData() {
    const response = await axios.get("http://localhost:8080/api/structure")
    const l =await response.data
    console.log(l)
    setCommissions(l)
    

    

    
  }
 fetchData();
  
}, [setCommissions]);
  return (
    <Container mb={2}>
      <ModalUser open={open1} onClose={handleClose1} emails={echange_value}></ModalUser>
      <ModalEditStructure
          commission={commission}
          open={open}
          commissions={commissions}
          setCommissions={setCommissions}
          handleClose = {handleClose}
          setCommission={setCommission}
        />  
    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
      <h4>
      Structures
        </h4>
        <Fab  onClick={()=>{navigate('/addStructure')}} className="label theme-bg2 text-white f-12" variant="extended">
        <AddIcon size="small"  sx={{ mr: 1 }} />
           Ajouter un Commission
             </Fab>
    </Stack>

    <Card>
    <div style={{ height: 800, width: '100%' }}>
      <DataGrid
        rows={commissions}
        columns={columns}
        
      />

    </div>
    </Card>
    </Container>
  );
}
