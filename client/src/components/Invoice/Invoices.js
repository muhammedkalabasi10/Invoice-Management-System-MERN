import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteInvoice, getInvoices } from "../../actions/invoiceAction";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { NavLink } from "react-router-dom";

export default function Invoices() {
  const invoices = useSelector((state) => state.invoices.invoices);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInvoices());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteInvoice(id));
  };
  console.log(invoices);
  return (
    <table
      className="table table-bordered table-hover"
      style={{
        textAlign: "center",
        margin: "auto",
        width: "80%",
        marginTop: "1rem",
        backgroundColor: "white",
      }}
    >
      <thead className="thead-dark">
        <tr>
          <th scope="col">No</th>
          <th scope="col">Client Name</th>
          <th scope="col">Total</th>
          <th scope="col">Due Date</th>
          <th scope="col">Status</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice, index) => (
          <tr key={index}>
            <th style={{ verticalAlign: "middle" }} scope="row">
              <NavLink
                to={`/invoices/${invoice._id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                {index + 1}
              </NavLink>
            </th>

            <td style={{ verticalAlign: "middle" }}>
              <NavLink
                to={`/invoices/${invoice._id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                {invoice.client.name}
              </NavLink>
            </td>

            <td style={{ verticalAlign: "middle" }}>
              <NavLink
                to={`/invoices/${invoice._id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                {invoice.total}
              </NavLink>
            </td>

            <td style={{ verticalAlign: "middle" }}>
              <NavLink
                to={`/invoices/${invoice._id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                {invoice.dueDate.slice(0, 10)}
              </NavLink>
            </td>

            <td style={{ verticalAlign: "middle" }}>
              <NavLink
                to={`/invoices/${invoice._id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                {invoice.status}
              </NavLink>
            </td>
            <td style={{ verticalAlign: "middle" }}>
              <IconButton
                onClick={() => handleDelete(invoice._id)}
                aria-label="delete"
                size="large"
                color="error"
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
