import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function SnackBar({state, handleClose}) {
  return (
    <Snackbar open={state.status} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {state.message}
        </Alert>
      </Snackbar>
  )
}