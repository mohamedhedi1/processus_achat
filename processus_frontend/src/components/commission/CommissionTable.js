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
import ModalEditCommission from'../commission/ModalEditCommission'
import { useNavigate } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';

import { Card } from '@mui/material';
import { ModelTraining } from '@mui/icons-material';
export default function CommissionDataTable() {
const columns = [
  { field: 'name', headerName: 'Nom', width: 130 ,editable: false},
  {field: 'role', headerName: 'Role', width: 130 ,editable: false},
  {field: 'type',headerName: 'Type',width: 90,editable: false
  },
  {field: 'abrivation',headerName: 'ABRIVAITION',width: 90,editable: false
  },
  { field:'emails',headerName: "Users",width:80,editable: false,
    renderCell: (cellValues) => {
      return (
        <div >
        <Fab  size="small"     sx={{ m:1  }} className="label theme-bg2 text-white f-12"  aria-label="add">
         <PeopleIcon></PeopleIcon>
        </Fab>
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
  }
];
const [open, setOpen] = useState(false);
const handleOpen = () => {
 setOpen(true);
}
let navigate = useNavigate();
const handleClose = () => setOpen(false);
const[commissions,setCommissions]=useState([{
  id:0,name:"",role:"",abrivation:"",type:"",emails:[]
}])
const [commission,setCommission]=useState({
  id:0,name:"",role:"",abrivation:"",type:"",emails:[]
})
const deleteCommission=async (cellValues)=>{
  
  const id=cellValues.row.id 
  console.log("deleteling commission "+id)
  const response = await axios.delete("http://localhost:8080/api/v1/commission/"+id)//delte users
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
    const response = await axios.get("http://localhost:8080/api/v1/commission")
    const l =await response.data
    console.log(l)
    setCommissions(l)
    

    

    
  }
 fetchData();
  
}, [setCommissions]);
  return (
    <Container mb={2}>
      <ModalEditCommission
          commission={commission}
          open={open}
          commissions={commissions}
          setCommissions={setCommissions}
          handleClose = {handleClose}
          setCommission={setCommission}
        />  
    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
      <h4>
      <Chip  className="label theme-bg2 text-white f-12" label="Utilisateurs" icon={<PersonRoundedIcon />} />
        </h4>
        <Fab  onClick={()=>{navigate('/addCommission')}} className="label theme-bg2 text-white f-12" variant="extended">
        <AddIcon size="small"  sx={{ mr: 1 }} />
           Ajouter un COmmission
             </Fab>
    </Stack>

    <Card>
    <div style={{ height: 800, width: '100%' }}>
      <DataGrid
        rows={commissions}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />

    </div>
    </Card>
    </Container>
  );
}
