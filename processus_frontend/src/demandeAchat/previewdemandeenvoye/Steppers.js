import React, {useState} from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { elementAcceptingRef } from '@mui/utils';
function Steppers(props) {
  let listApps= props.listApprouvation

  return (
    <Box sx={{ width: '100%' }}>
   <Stepper activeStep={listApps.length-1}>
     {listApps.map((listApp)=>
     {
       if(listApp.approuvation==="a")
       {return(
        <Step >
        <StepLabel >{listApp.etape.etape}</StepLabel>
      </Step>
       )}
       else if(listApp.approuvation==="r")
       {return(
        <Step >
        <StepLabel optional={ <Typography variant="caption" color="error">
                   {listApp.etape.etape}
                   </Typography>} error={true} >Non approuver</StepLabel>
      </Step>
       )
      }
      else return(<Step >
        <StepLabel >{listApp.etape.etape}</StepLabel>
      </Step>)
     })}
  
   
  
 </Stepper>
    </Box>

   
   )
}

export default Steppers

  
  {/*
<Box sx={{ width: '100%' }}>
   <Stepper activeStep={1}>
  <Step >
   <StepLabel >kia</StepLabel>
 </Step>
   <Step >
   <StepLabel optional={ <Typography variant="caption" color="error">
               oui
              </Typography>} error={true} >bmw</StepLabel>
 </Step>
   <Step >
   <StepLabel >audi</StepLabel>
 </Step>
 </Stepper>
    </Box>
 
*/}