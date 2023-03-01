import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Formcontrol({title, index, handleChange, list}) {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id={title.toLowerCase()}>{title}</InputLabel>
      <Select
        labelId={title.toLowerCase()}
        id={title.toLowerCase()}
        label={title.toLowerCase()}
        name={title.toLowerCase()}
        onChange={(e)=>handleChange(e, index)}
      >
        {
          list.map((item, index)=>
            <MenuItem value={item} id={index} >{item}</MenuItem>
          )
        }
      </Select>
    </FormControl>
  )
}
