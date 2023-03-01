import React, { useState } from "react";
import { NavLink } from 'react-router-dom'
import DescriptionIcon from "@mui/icons-material/Description";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import DialogPage from "./DialogPage";
import { useDispatch } from "react-redux";
import { addProduct } from "../../actions/productActions";
import { addClient} from "../../actions/clientActions"
import UploadButton from "../UploadButton";
import SnackBar from "../SnackBar";

const withLink = (to, children) => <NavLink to={to}>{children}</NavLink>;

const actions = [
  { icon: <LocalGroceryStoreIcon />, name: "Product" },
  { icon: <PersonAddIcon />, name: "Client" },
  { icon: withLink("/addinvoice",<DescriptionIcon />), name: "Invoice" },
];

export default function Dial() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState();
  const [texts, setTexts] = useState();

  const productText = ["Name", "Price"];
  const clientText = ["Name", "Email", "Phone", "Address"];
  const [prodState, setProdState]=useState({name:"",price:"",selectedFiles:""})
  const [clientState, setClientState]=useState({name:"",email:"",phone:"",address:""})
  const [selectedState,setSelectedState]=useState()
  const [openSnackbar, setOpenSnackbar]=useState({
    message:"",
    status: false
  })

  const closeSnackbar=()=>{
    setOpenSnackbar({message:"",status:false})
  }

  const dispatch=useDispatch()

  const add=()=>{
    setOpen(false)
    switch(title){
      case "Product":
        if(prodState.name==="" || prodState.price==="" || prodState.selectedFiles===""){
          setOpenSnackbar({message:"Please enter all product information completely",status:true})
        }else{
          dispatch(addProduct(prodState))
        }
        break
      case "Client":
        if(clientState.name==="" || clientState.email==="" || clientState.phone==="" || clientState.address===""){
          setOpenSnackbar({message:"Please enter all client information completely",status:true})
        }else if(!clientState.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
          setOpenSnackbar({message:"Please enter an valid email address",status:true})
        }else if(!/^[0-9\s]*$/.test(clientState.phone)){
          setOpenSnackbar({message:"Please enter an valid phone number",status:true})
        }
        else{
          dispatch(addClient(clientState))
        }
        
        break
    }
    
    //dispatch(title==="Client" && addClient(clientState))
    
    setProdState({name:"",price:"",selectedFiles:""})
    setClientState({name:"",email:"",phone:"",address:""})
  }

  const handleClickOpen = (action) => {
    setTitle(action.name)
    switch (action.name) {
      case "Product":
        setTexts(productText);
        setSelectedState({state: prodState, setState:setProdState})
        setOpen(true);
        break;
      case "Client":
        setTexts(clientText);
        setSelectedState({state: clientState, setState:setClientState})
        setOpen(true);
        break;
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {open && (
        <DialogPage
          open={open}
          handleClose={handleClose}
          action="Add"
          title={title}
          textfields={texts}
          state={selectedState}
          btnHandle={add}
            upload={
              title==="Product" &&
              <UploadButton setState={setProdState}/>
            }
          
        />
      )}
      <SnackBar state={openSnackbar} handleClose={closeSnackbar}/>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 75, right: 75 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action,key) => (
        <SpeedDialAction
          sx={{ width: 50, height: 50 }}
          key={action.name}
          icon={action.icon}
          tooltipTitle={"Add " + action.name}
          onClick={() => {
            handleClickOpen(action);
          }}
        />
        ))}
      </SpeedDial>
    </div>
  );
}
