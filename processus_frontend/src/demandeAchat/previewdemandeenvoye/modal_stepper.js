import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Modal_stepper(props) {
  let listFichier =props.listApp
  console.log(props)
  console.log("fiche11111111111111111111111111111111111111111111")
  
  const Affichierfichier =(props)=>
  {
    return(   <tr>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>)

  }
  const AfficheEtat =(props) =>

  {
    if(props.app.approuvation==='a')
    {
      return(<li class="list-group-item">Etat du dossier d'achat:  validé </li>
      )

    }
    if(props.app.approuvation==='r')
    {
      return(<li class="list-group-item">Etat du dossier d'achat:  rejeté </li>
      )

    }
    if(props.app.approuvation==='notraite')
    {
      return(<li class="list-group-item">Etat du dossier d'achat:  en cours de traitement </li>
      )
     

    }
    
  }
  const Remaquegenerale =(props) =>
  {
    if(props.app.remarque!=='')
    {
      return(<li class="list-group-item">Remaque génerale: {props.app.remarque} </li>)

    }
    else return(<></>)

  }
  console.log("modal active")
  console.log(props.listApp)

  return (
    <div>
     
      <Dialog open={props.open} onClose={props.handleClose}>
      {/* <DialogTitle>S</DialogTitle> */}  
        <DialogContent>
          
        <div className="card text-center">
 
  <div className="card-body">
  <ul class="list-group list-group-flush"> <AfficheEtat app={props.listApp} />
  <Remaquegenerale app={props.listApp} />
  <li>


  <table class="table">
  <thead>
    <tr>
      <th scope="col">Nom fichier</th>
      <th scope="col">Etat</th>
      <th scope="col">Remaque</th>
     
    </tr>
  </thead>
  <tbody>
  
    
  
   
  </tbody>
</table>

  </li>
      </ul>
    
  </div>
 
</div>


        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Fermer</Button>
         
        </DialogActions>
        {/*
       
        */}
       
      </Dialog>
    </div>
  );
}




/*
{props.listApp.approuvation_file_requestList.map((listf)=>
  {
    <Affichierfichier  listf={listf} />

  })}
  */