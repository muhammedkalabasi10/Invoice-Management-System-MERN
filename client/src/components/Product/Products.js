import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts, updateProduct } from "../../actions/productActions";
import Dial from "../Dial/Dial";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DialogPage from "../Dial/DialogPage";
import UploadButton from "../UploadButton";

export default function Products() {
  const [open, setOpen] = useState(false);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch, products]);

  const [prodState, setProdState]=useState({_id:"", name:"", price:"", selectedFiles:""})

  const update=()=>{
    dispatch(updateProduct(prodState))
    setOpen(false)
  }

  const handleEdit=(prod)=>{
    setProdState({_id:prod._id, name:prod.name, price:prod.price, selectedFiles:prod.selectedFiles})
    setOpen(true)
  }

  const handleDelete=(prodId)=>{
    dispatch(deleteProduct(prodId))
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {open && <DialogPage open={open} handleClose={handleClose} action="Update" title="Product" textfields={["Name", "Price"]} state={{state:prodState, setState:setProdState}} btnHandle={update} upload={<UploadButton setState={setProdState}/>} />}
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
            <th scope="col">Picture</th>
            <th scope="col">Price</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.products.map((prod,index) => (
            <tr key={prod._id}>
              <th style={{ verticalAlign: "middle" }} scope="row">
                {index+1}
              </th>
              <td style={{ verticalAlign: "middle" }}>{prod.name}</td>
              <td style={{ verticalAlign: "middle" }}>
                {
                  <img
                    src={prod.selectedFiles}
                    alt=""
                    width="150"
                    height="70"
                  />
                }
              </td>
              <td style={{ verticalAlign: "middle" }}>{prod.price}</td>
              <td style={{ verticalAlign: "middle" }}>
                <IconButton onClick={()=>handleEdit(prod)} aria-label="delete" size="large" color="success">
                  <EditIcon fontSize="inherit" />
                </IconButton>
              </td>
              <td style={{ verticalAlign: "middle" }}>
                <IconButton onClick={()=>handleDelete(prod._id)} aria-label="delete" size="large" color="error" >
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
