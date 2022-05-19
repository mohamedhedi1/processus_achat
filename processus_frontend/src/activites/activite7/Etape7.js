import React from 'react';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { Button, FormControl } from '@mui/material';
import { FormLabel,FormGroup,FormControlLabel,Checkbox, } from '@mui/material'
import { FlareSharp, SettingsCell } from '@mui/icons-material';
import { Dialog } from '@mui/material';
import { Alert } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { Box } from '@mui/system';
function RedBar() {
  return (
    <Box
      sx={{
        height: 10,
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? "rgba(0, 0, 0, 0)"
            : "rgb( 0  0 0 / 0 %)"
      }}
    />
  );
}
const Etape7 = (props) => {
  const handleChangeSelectStrucutre = (e) =>
  {
      const value = e.target.value;
      setS(
      parseInt(value));
      

      }
      const [structuresList,setStructureList]=useState([{
      
    }])
    const [ve,setVe]=useState(false)
    const [verif,setVerif]=useState(false)
    const [email_check,setEmail_check]=useState({})
    const [email_labels,setEmail_labels]=useState([])
    const [open,setOpen]=useState(false)
    const [s,setS]=useState(0)

      const handleClose = () => {
        setOpen(false)
      };
      const handleOpen = () => {
        setOpen(true)
      };
    useEffect(  () => {
      
    
    
        async function fetchData() {
          
          
          const response=await axios.get("http://localhost:8080/api/dmcde/stuctureachat")
          const r2=await response.data
          if(r2.length>0){
            setVe(false)
          }
          
        
         
       
          
       
          setStructureList(r2)
        }
       fetchData();
        
      }, [setStructureList]);
      const handleMail = (event) => {
       
        setEmail_check({
          ...email_check,
          [event.target.name]: event.target.checked,
        }); 
        
      };
      const post =async()=>{
        
        
      
        if(s==0){
          setVerif(true)
        } else{

         const r3=await axios.get("http://localhost:8080/api/dmcde/etape6/"+props.id+"/"+s);
        setOpen(false)}
        }
         // missingi dosssier achat in props
        
      
    return ( 

        <>
        <Button onClick={handleOpen}>choisir un structure</Button>
        <Dialog onClose={handleClose} open={open}>
      <DialogTitle></DialogTitle>
        
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        
        <div className="form-group">
                            <label for="structure">structure</label>
                                    <select value={s}    onChange={(e)=> handleChangeSelectStrucutre(e)} className="mb-3 form-control">
                                   <option value="0">choisir un structure</option>
                                     {structuresList.map((structure) => (
                                    <option value={structure.id}>{structure.name} {structure.region} </option>
                                         ))}
                                                </select>
                                            </div>
      
        {verif && (
          <>
            <RedBar/>
            <Alert variant="outlined" severity="error">
              il faust choisir un structure
            </Alert>
             <RedBar/>
             </>
          )}
        <Button className="label theme-bg2 text-white f-12" onClick={post}>valider </Button>
   
       
      </FormControl>
        {ve && 
        <h1>list is empty</h1>
        }
        </Dialog>
        </>
     );
}
 
export default Etape7;