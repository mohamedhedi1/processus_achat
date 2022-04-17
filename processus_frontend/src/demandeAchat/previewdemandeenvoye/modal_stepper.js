import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios'

export default function Modal_stepper(props) {
  console.log(props)
 
  let listFichier =props.listApp
  let listf = listFichier.approuvation_file_requestList
  console.log("0000000000000000000000000000000000000000000")
  console.log(props.AllFiles)
  console.log(listf)
  console.log("fiche11111111111111111111111111111111111111111111")
  
  const Affichierfichier =(props)=>
  {
    
    console.log("listfichieraficheeeeeeeeeeeer")
    console.log(props)
    let allfiles= props.AllFiles
    let files=props.listf
    let file1 = allfiles.find(allfile => allfile.fileId === files.file);
    let filename= file1.filename
    let remarque=files.remarque
    let approuvation=files.approuvation
    let etat=""
    let type="Autre fichier"
    
    if(remarque==="")
    {
      remarque  = "Pas de remarque"

    }
    if(approuvation===true)
    {
      etat= "✔️"
    }
    else 
    {
       etat ="❌"
    }
    if(file1.titre==="AED")
    {
      type ="AED"
    }
    else if(file1.titre.length>3)
    {
       type ="CPT"

    }
    


    return(   <tr>
      <td>{filename}</td>
      <td>{type}</td>
      <td>{etat}</td>
      <td>{remarque}</td>
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
     
      <Dialog open={props.open} onClose={()=>{props.setOpen(!props.open)}}>
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
      <th scope="col">type</th>
      <th scope="col">Etat</th>
      <th scope="col">Remaque</th>
     
    </tr>
    {listf.map((listf1)=>
  {
    return(<Affichierfichier  listf={listf1} AllFiles={props.AllFiles} />)
    

  })}
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
          <Button onClick={()=>
          {
            console.log("fermer");
            props.setOpen(!props.open)
            props.setFermer(true)
          }}>Fermer</Button>
         
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