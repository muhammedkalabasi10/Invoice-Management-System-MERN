import React from "react";
import Button from "@mui/material/Button";
import UploadIcon from "@mui/icons-material/Upload";

export default function UploadButton({setState}) {

    const uploadImage=(e)=>{
        const file=e.target.files[0]
        const reader=new FileReader()
        reader.onloadend=()=>{setState((pic)=>({...pic,selectedFiles:reader.result.toString()}))}
        reader.readAsDataURL(file)
      }

  return (
    <Button
      variant="contained"
      component="label"
      startIcon={<UploadIcon />}
      sx={{ marginTop: 2 }}
    >
      Upload Image
      <input
        hidden
        accept="image/*"
        type="file"
        onChange={(e) => uploadImage(e)}
      />
    </Button>
  );
}
