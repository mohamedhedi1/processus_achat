import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
function Alert(props) {
    const [open, setOpen] = React.useState(true);
    
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      
      setOpen(false);
      props.setFaux(false)
    };
  
    return (
      <div>
        
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{props.titre}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {props.objet}
            </DialogContentText>
           
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Fermer</Button>
            
          </DialogActions>
        </Dialog>
      </div>
        );
      }

export default Alert