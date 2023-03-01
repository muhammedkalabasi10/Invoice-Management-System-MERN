import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteClient, getClients, updateClient } from "../../actions/clientActions";
import Dial from "../Dial/Dial";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DialogPage from "../Dial/DialogPage";

export default function Clients() {
    const [open, setOpen] = useState(false);
    const clients = useSelector((state) => state.clients);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getClients());
    }, [dispatch, clients]);
  
    const [clientState, setClientState]=useState({name:"", email:"", phone:"", address:""})
  
    const update=()=>{
      dispatch(updateClient(clientState))
      setOpen(false)
    }
  
    const handleEdit=(clnt)=>{
      setClientState({_id:clnt._id, name:clnt.name, email:clnt.email, phone:clnt.phone, address:clnt.address})
      setOpen(true)
    }
  
    const handleDelete=(clientId)=>{
      dispatch(deleteClient(clientId))
    }
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        {open && <DialogPage open={open} handleClose={handleClose} action="Update" title="Client" textfields={["Name", "Email", "Phone", "Address"]} state={{state:clientState, setState:setClientState}} btnHandle={update} />}
        <table
          className="table table-bordered table-hover"
          style={{
            textAlign: "center",
            margin: "auto",
            width: "70%",
            marginTop: "1rem",
            backgroundColor:"white"
          }}
        >
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {clients.clients.map((client,index) => (
              <tr key={client._id}>
                <th style={{ verticalAlign: "middle" }} scope="row">
                  {index+1}
                </th>
                <td style={{ verticalAlign: "middle" }}>{client.name}</td>
                <td style={{ verticalAlign: "middle" }}>{client.email}</td>
                <td style={{ verticalAlign: "middle" }}>{client.phone}</td>
                <td style={{ verticalAlign: "middle" }}>{client.address}</td>
                <td style={{ verticalAlign: "middle" }}>
                  <IconButton onClick={()=>handleEdit(client)} aria-label="delete" size="large" color="success">
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  <IconButton onClick={()=>handleDelete(client._id)} aria-label="delete" size="large" color="error" >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Dial />
      </div>
    );
}
