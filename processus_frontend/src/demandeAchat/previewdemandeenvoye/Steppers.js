import React, {useState} from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { elementAcceptingRef } from '@mui/utils';
import Modal_stepper from './modal_stepper'
function Steppers(props) {
 let  listetape= [`Traitement demande d'achat`,"Approuvation du CPT","Préparation CCAP","Finalisation CC","Approuvation du CC","Affectation à une structure d'achat","Planification les dates de lancement de l'AO ","Désigner les membres de la commission d'évaluation","Publier l'AO"]
 
 let listApps= props.listApprouvation
 let suitelist=[]
 for(let i=listApps.length;i<listetape.length;i++)
 {
   suitelist.push(listetape[i])
 }
 console.log(props.listApprouvation)
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ width: '100%' }}>
   <Stepper activeStep={listApps.length-1}>
     {listApps.map((listApp)=>
     {
       if(listApp.approuvation==="a")
       {return(
        <Step onClick={handleClickOpen} >
          <Modal_stepper handleClose={handleClose} open={open}  listApp={listApp}></Modal_stepper>
        <StepLabel >{listetape[listApp.etape-1]}</StepLabel>
      </Step>
       )}
       else if(listApp.approuvation==="r")
       {return(
        <Step >
          <Modal_stepper handleClose={handleClose} open={open}  listApp={listApp}></Modal_stepper>
        <StepLabel optional={ <Typography variant="caption" color="error">
                   {listetape[listApp.etape-1]}
                   </Typography>} error={true} >Non approuver</StepLabel>
      </Step>
       )
      }
      else return(<Step >
        <StepLabel >{listetape[listApp.etape-1]}</StepLabel>
      </Step>)
     }
     
     )}
     {suitelist.map((suite)=>
    {
      return(
        <Step >
        <StepLabel >{suite}</StepLabel>
      </Step>
     
      
      )
      

    })}
   
    
   
  
 </Stepper>
    </Box>

   
   )
}

export default Steppers

  
  {/*

   {suitelist.map((suite)=>
    {
      return(
        <Step >
        <StepLabel >{suite}</StepLabel>
      </Step>
      )
      

    })}


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