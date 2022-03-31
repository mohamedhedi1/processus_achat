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
export default function CheckBoxPrivelage(props) {
  const  state=props.state
  const setState =props.setState
  const id =props.id 
  const updateUrl=props.updateUrl
  
     const privelageName=[
       "privelage1","privelage2","privelage3","privelage4","privelage5","privelage6","privelage7"
     ]
     const Labels=["traitement la demane d'achat","Approuvation de CPT","Préparation de projet de CCAP","Finalisation le CC et Preparation la methodologie de depouillement"
    ,"Approuvation le CC","Affectaion de dossier d'achat a une structure d 'achat",
    "Plantification les date de lancement de l'AO et de La séance d'ouvertur de plis","designation les membres de ma commission d'evaluation"
    ]
     
   
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
        <FormLabel component="legend"><h5> choisir un des privelage</h5></FormLabel>
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
