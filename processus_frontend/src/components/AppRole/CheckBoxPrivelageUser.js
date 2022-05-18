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
import axios from "axios";
export default function CheckBoxPrivelageUser(props) {
  const  state=props.state
  const setState =props.setState
  const id =props.id 
  const updateUrl=props.updateUrl
  
  const privelageName=[
    "privelage9","privelage10"
  ]
  const Labels=["Demandeur","Administrateur"]
   
  const handleChange = (event) => {
    console.log(state)
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    }); 
    
  };
  

  
  return (
    <Box sx={{ display: "flex" }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend"><h5> Activtiés</h5></FormLabel>
        <FormGroup>
          {privelageName.map((p) => (
            <FormControlLabel
            
              control={
                 
                <Checkbox
                 
                  key={p}
                  checked={state[p]}
                  onChange={(event) => handleChange(event)}
                  name={p}
                />
              }
              label={Labels[privelageName.indexOf(p)]}
            />
          ))}

        </FormGroup>
      </FormControl>
     
      

    </Box>
  );
}
