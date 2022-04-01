import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    console.log(e.target.id);
    console.log(e.target.value);
  };
  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Button onClick={handleClickOpen} variant="contained">
          Text
        </Button>
        <Button variant="contained">Contained</Button>
      </Stack>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Ajouter des remarque</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "30ch" }
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                label="Size"
                id="outlined-size-small"
                defaultValue="Small"
                size="small"
              />
              <TextField
                width="30ch"
                label="Size"
                id="outlined-size-small"
                defaultValue="Small"
                size="small"
              />
            </div>
          </Box>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "62ch" }
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Remarque"
              fullWidth
              multiline
              rows={4}
              onChange={(e) => handleChange(e)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>quitter</Button>
          <Button onClick={handleClose}>valider</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}