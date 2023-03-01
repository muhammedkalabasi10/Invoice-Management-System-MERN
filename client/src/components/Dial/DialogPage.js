import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SaveIcon from '@mui/icons-material/Save'

export default function DialogPage({open, handleClose, action, title, textfields, state, btnHandle, ...rest}) {

  return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{`${action} ${title}`}</DialogTitle>
        <DialogContent>
          {
            textfields?.map((text,key)=>(
              <TextField
            autoFocus
            margin="dense"
            id={text}
            label={text}
            type="text"
            fullWidth
            variant="outlined"
            defaultValue={state.state && state.state[text.toLowerCase()]}
            onChange={(e)=>state.setState((prevState)=>({...prevState, [text.toLowerCase()]:e.target.value}))}
          />
            ))
          }
          {
            //Geri kalan componentlerin hepsini buraya koyduk
            Object.keys(rest).length!==0 && Object.values(rest).map((comp,key)=>{
              return comp
            })
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">Cancel</Button>
          <Button onClick={btnHandle} variant="contained" endIcon={<SaveIcon/>}>{`${action} ${title}`}</Button>
        </DialogActions>
      </Dialog>
  )
}
