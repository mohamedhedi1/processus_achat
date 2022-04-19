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
    const [ve,setVe]=useState(false)
    const [verif,setVerif]=useState(false)
    const [email_check,setEmail_check]=useState({})
    const [email_labels,setEmail_labels]=useState([])
    const [open,setOpen]=useState(true)

      const handleClose = () => {
        setOpen(false)
      };
      const handleOpen = () => {
        setOpen(true)
      };
    useEffect(  () => {
      
    
    
        async function fetchData() {
          
          
          const response=await axios.get("http://localhost:8080/api/v1/user/structureDachat")
          const r2=await response.data
          if(r2.length>0){
            setVe(false)
          }
          console.log(r2)
          
          let l=[]
          let l2={}
          let l3=[]
        
          r2.map(email=>{
            
             
             l2[email]=false;
             
            
             l3.push(email)
          })
         
       
          
       
          setEmail_check(l2)
          setEmail_labels(l3)
        }
       fetchData();
        
      }, [setEmail_check,setEmail_labels]);
      const handleMail = (event) => {
       
        setEmail_check({
          ...email_check,
          [event.target.name]: event.target.checked,
        }); 
        
      };
      const post =async()=>{
        let t=[]
        Object.entries(email_check).map(p=>{
          if(p[1]==true){
            t.push(p[0])
          }
        }
        )
        console.log(t)
        if(t.length==0){
          setVerif(true)
        }
        else{
        let b={
          emails:t
        }
        
         const r3=await axios.post("http://localhost:8080/etape6/"+props.id,b)
        setOpen(false)
        }
         // missingi dosssier achat in props
        
      };
    return ( 

        <>
        <Button onClick={handleOpen}>open</Button>
        <Dialog onClose={handleClose} open={open}>
      <DialogTitle> choisir un ou des utlisateurs</DialogTitle>
        
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        
        {email_labels && email_labels.length>0 && (
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

        </FormGroup>)}
      
        {verif && (
          <>
            <RedBar/>
            <Alert variant="outlined" severity="error">
              il faust choisir au moins un utlisateurs
            </Alert>
             <RedBar/>
             </>
          )}
        <Button className="label theme-bg2 text-white f-12" onClick={post}>post </Button>
   
       
      </FormControl>
        {ve && 
        <h1>list is empty</h1>
        }
        </Dialog>
        </>
     );
}
 
export default Etape7;