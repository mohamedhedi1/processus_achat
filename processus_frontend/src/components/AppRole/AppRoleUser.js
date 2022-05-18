import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckBoxPrivelageUser from './CheckBoxPrivelageUser';
import  axios  from 'axios';
import { Fab } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const id=props.id ; 
  const [state, setState] = React.useState(
    {
      privelage9:false,
      privelage10:false ,
      
    

    });
  const UpdateURL=props.upUrl;
  const getPermission=props.getUrl
  const [body, setBody]=React.useState()
  const handleClickOpen = async() => {
    console.log(getPermission)
    const r =await axios.get(getPermission+id)
    console.log(r)
    let p=r.data
    let f=state
    p.map(p_id=>{
      switch(p_id){
        case 9:
            f.privelage9=true
            break
        case 10:
            f.privelage10=true
            console.log("setting to true")
             break
        

}
    })
    console.log(state)
    setOpen(true);

  };
  const post=async ()=>{
    let t=[]
            Object.entries(state).map(p=>{
              if(p[1]==true){
                  switch(p[0]){
                      case "privelage9":
                          t.push(9)
                          break
                      case "privelage10":
                           t.push(10)
                           break
                      case "privelage3":
                           t.push(3)
                           break
                      case "privelage4":
                          t.push(4)
                          break
                      case "privelage5":
                           t.push(5)
                           break
                      case "privelage6":
                           t.push(6)
                           break
                      case "privelage7":
                          t.push(7)
                          break
                      case "privelage8":
                            t.push()
                            break
              }
             }
         }
             
       )
    //url
    
    const r = await axios.put(UpdateURL+id,t);
    console.log(t)
    handleClose();
     
  }
  const handleClose = () => {
    setOpen(false);
    console.log(body)
  };

  return (
    <div>
      <Fab size="small"  onClick={handleClickOpen} sx={{ m:1  }} className="label theme-bg text-white f-12"  aria-label="add">
            <InfoOutlinedIcon />
        </Fab>
     
      <Dialog  style={{height:'600px'}} open={open} onClose={handleClose}>
       
            <CheckBoxPrivelageUser setState={setState} state={state} id={id} UpdateURL={UpdateURL} ></CheckBoxPrivelageUser>
  
        <DialogActions>
          <Button onClick={handleClose}>Quitter</Button>
          <Button  onClick={post} variant="contained" endIcon={<SendIcon />}>
             Valider
                </Button> 
          
        </DialogActions>
      </Dialog>
    </div>
  );
}
