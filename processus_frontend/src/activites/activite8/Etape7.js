import React from 'react';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { Button, FormControl } from '@mui/material';
import { FormLabel,FormGroup,FormControlLabel,Checkbox, } from '@mui/material'
import { SettingsCell } from '@mui/icons-material';
const Etape7 = () => {
    const [ve,setVe]=useState(true)
    const [email_check,setEmail_check]=useState({})
    const [email_labels,setEmail_labels]=useState([])
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
        let b={
          emails:t
        }
        
         const r3=await axios.post("http://localhost:8080/etape6/1",b)
        
      };
    return ( 
        <>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend"><h5> choisir un ou des utlisateurs</h5></FormLabel>
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
        <Button className="label theme-bg2 text-white f-12" onClick={post}>post </Button>
   
       
      </FormControl>
        {ve && 
        <h1>list is empty</h1>
        }
        </>
     );
}
 
export default Etape7;