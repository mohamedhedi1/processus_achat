import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';



function ModalUser(props) {
 

  const handleClose = () => {
    onClose();
  };
 const open=props.open
 const onClose =props.onClose
 const emails =props.emails

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>utilisateurs</DialogTitle>
      <List sx={{ pt: 0 }}>
        { emails !== undefined  &&emails.map((email) => (
          <ListItem key={email}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={email} />
          </ListItem>
        ))} 
      </List>
    </Dialog>
  );
} export default ModalUser ;