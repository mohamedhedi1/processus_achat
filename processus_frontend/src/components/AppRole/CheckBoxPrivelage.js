import * as React from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import { useEffect } from "react";
import { createRef } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { PropaneSharp } from "@mui/icons-material";
export default function CheckBoxPrivelage(props) {
  const body=props.body
  const [state, setState] = React.useState(
    {
      privelage1:false,
      privelage2:false ,
      privelage3:false,
      privelage4:false
    }
     );
     const privelageName=[
       "privelage1","privelage2","privelage3","privelage4","privelage5"
     ]
     const [roleName,setName]=React.useState("")

  const handleChange = (event) => {
    
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    }); 
    let t=[]
    Object.entries(state).map(p=>{
      if(p[1]==true){
        t.push(p[0])
      }
    })
    t.push(event.target.name)    
    props.setBody({
      ...body,
      privelages: t

    })
  };
  const handleValue=(e)=>{
    props.setBody({...body,name:e.target.value})
    
  }

  const post=()=>{
    /*let body={
      name:roleName,
      privelages:[]
    }
    Object.entries(state).map(p=>{
      if(p[1]==true){
        body.privelages.push(p[0])
      }
    })*/
    console.log(body)
     
  }
  return (
    <Box sx={{ display: "flex" }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
      <FormLabel component="legend"><h5>Nom de role:</h5></FormLabel>
      <TextField
          onChange={(e) => handleValue(e)}
          required
          id="name"
          label="obligatoire"
          defaultValue=""
        />
        <Box
      sx={{
        height: 20,
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? 'rgba(0, 0, 0, 0)'
            : 'rgb(255 132 132 / 25%)',
      }}
    />
        <FormLabel component="legend"><h5> choisir un des privelage</h5></FormLabel>
        <FormGroup>
          {privelageName.map((p) => (
            <FormControlLabel
            
              control={
                 
                <Checkbox
                
                  key={p}
                  checked={state[privelageName.indexOf(p)]}
                  onChange={(event) => handleChange(event)}
                  name={p}
                />
              }
              label={p}
            />
          ))}

        </FormGroup>
        
       <Button onClick={post}  >Post</Button>
      </FormControl>
     
      

    </Box>
  );
}
