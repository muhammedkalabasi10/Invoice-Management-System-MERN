import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { getInvoice, updateInvoice } from "../../actions/invoiceAction";
import styles from "./InvoiceDetails.module.css";
import logo from "../logo.png";
import footer from "../footer.jpg";
import { Container, Grid, Typography } from "@mui/material";
import styled from "styled-components";
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import { useReactToPrint } from "react-to-print";
import PaidIcon from "@mui/icons-material/Paid";
import DialogPage from "../Dial/DialogPage";
import AuthContext from "../Context/AuthContext"
import jwtInterceoptor from "../Context/jwtInterceptor";
import Slider from '@mui/material/Slider';

const TableControl = styled.table`
  border: 1px solid black;
  & th {
    border: 1px solid black;
    text-align: center;
  }
  & td {
    border: 1px solid black;
    text-align: center;
  }
  & tr {
    border-bottom: 1pt solid black;
    border-top: 1pt solid black;
  }
`;

export default function InvoiceDetails() {
  const invoice = useSelector((state) => state.invoices.invoice);
  Object.freeze(invoice);
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const componentRef = useRef();
  const {user}=useContext(AuthContext)

  const [open, setOpen] = useState(false);
  const [payment, setPayment] = useState({
    payment: "",
    datePaid: new Date(Date.now()),
  });

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getInvoice(id));
  }, [dispatch, location, open]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `invoice_${invoice?._id}`,
    onAfterprint: () => alert("Successful"),
  });

  const sendPdf = () => {
    const mail=jwtInterceoptor.post("/invoices/sendmail",{senderEmail:user.user.email, receiverEmail:invoice.client.email})
  };

  const createAndDownloadPdf = () => {
    handlePrint();
  };

  const addPayment = async () => {
    let invCopy = await { ...invoice };
    invCopy.paymentRecords = await [...invCopy.paymentRecords, payment];
    const amountPaid=await invoice.paymentRecords.reduce(
      (acc, { payment }) => acc + payment,
      0
    )

    if(invCopy.total==amountPaid+payment.payment){
      console.log("girdi")
      invCopy.status="Paid"
    }
    dispatch(updateInvoice(invCopy))
    setOpen(false)
  };

  function valuetext(value) {
    return `${value}°C`;
  }

  return (
    <div className={styles.pageLayout}>
      {open && (
        <DialogPage
          open={open}
          handleClose={handleClose}
          action="Add"
          title="Payment"
          slider={<Slider
          sx={{marginTop:"2rem"}}
            aria-label="Payment"
            getAriaValueText={valuetext}
            valueLabelDisplay="on"
            onChange={(event)=>setPayment((prevState)=>({...prevState, payment:event.target.value}))}
            min={0}
            max={invoice.total-invoice.paymentRecords.reduce(
              (acc, { payment }) => acc + payment,
              0
            )}
            
          />}
          btnHandle={addPayment}
        />
      )}
      {invoice && (
        <div className={styles.buttons}>
          <Button
            onClick={sendPdf}
            variant="contained"
            inputFormat="MM/DD/YYYY"
            style={{ justifyContentContent: "center" }}
            type="submit"
            color="primary"
            size="large"
            startIcon={<ForwardToInboxOutlinedIcon />}
          >
            Sende to Client
          </Button>
          <Button
            onClick={() => {
              createAndDownloadPdf();
            }}
            variant="contained"
            inputFormat="MM/DD/YYYY"
            style={{ justifyContentContent: "center" }}
            type="submit"
            color="primary"
            size="large"
            startIcon={<SaveIcon />}
          >
            Save and Continue
          </Button>
          <Button
            onClick={() => {
              setOpen(true);
            }}
            variant="contained"
            inputFormat="MM/DD/YYYY"
            style={{ justifyContentContent: "center" }}
            type="submit"
            color="primary"
            size="large"
            startIcon={<PaidIcon />}
          >
            Add Payment
          </Button>
        </div>
      )}
      {invoice && (
        <div
          className={styles.invoiceLayout}
          id="pagetodownload"
          ref={componentRef}
        >
          <img src={logo} style={{ maxWidth: "100%", height:"auto" }} />
          <Container>
            <Grid
              container
              justifyContent="space-between"
              style={{ marginTop: "40px" }}
            >
              <Grid item>
                <Container>
                  <p>{invoice.client.name}</p>
                  <br />
                  <p>{invoice.client.address}</p>
                </Container>
              </Grid>
              <Grid item style={{ marginRight: 20, textAlign: "right" }}>
                <Typography
                  variant="overline"
                  style={{ fontSize: "15px", color: "gray" }}
                  gutterBottom
                >
                  Invoice
                </Typography>
                <br />
                <p>Invoice Id: {invoice._id}</p>
                <p>Client Phone Number: {invoice.client.phone}</p>
                <p>Date: {new Date().toJSON().slice(0, 10)}</p>
                <p>Due Date: {invoice.dueDate.slice(0, 10)}</p>
                <br />
                <br />
              </Grid>
            </Grid>
          </Container>
          <Container>
            <Grid>
              <p>
                Vielen Dank für Ihr freundliches Intresse an unserer Arbeit.
              </p>
              <br />
            </Grid>
          </Container>
          <form>
            <div>
              <TableControl>
                <tr>
                  <th>No</th>
                  <th>Product Name</th>
                  <th>Product Photo</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  <th>Tax</th>
                  <th>Price</th>
                  <th>Discount(%)</th>
                  <th>Total Price</th>
                </tr>
                {invoice.items.map((itemField, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{itemField.itemName}</td>
                    <td>
                      <img
                        src={itemField.selectedFiles}
                        alt=""
                        width="150"
                        height="100"
                        value={itemField.selectedFiles}
                      />
                    </td>
                    <td>{itemField?.quantity}</td>
                    <td>{itemField?.unit}</td>
                    <td>%{itemField?.tax.taxname}</td>
                    <td>{itemField?.unitPrice}</td>
                    <td>%{itemField?.discount}</td>
                    <td>
                      {(
                        itemField.unitPrice *
                        itemField.quantity *
                        ((100 + itemField.tax.taxvalue) / 100) *
                        ((100 - itemField.discount) / 100)
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </TableControl>
              <div className={styles.addButton}></div>
            </div>

            <div className={styles.invoiceSummary}>
              <div className={styles.summary}>Total Amount of the Invoice</div>
              <div className={styles.summaryItem}>
                <p>Total Price of Products</p>
                <h4>{invoice.total}</h4>
              </div>
              <div className={styles.summaryItem}>
                <p>Paid</p>
                <h4>
                  {invoice.paymentRecords.reduce(
                    (acc, { payment }) => acc + payment,
                    0
                  )}
                </h4>
              </div>

              <div className={styles.summaryItem}>
                <p>Gesamtbetrag:</p>
                <h4
                  style={{
                    color: "black",
                    fontSize: "18px",
                    lineHeight: "8px",
                  }}
                >
                  {invoice.total -
                    invoice.paymentRecords.reduce(
                      (acc, { payment }) => acc + payment,
                      0
                    )}
                </h4>
              </div>
            </div>
          </form>
          <img src={footer} style={{ maxWidth: "100%", height:"auto" }} />
        </div>
      )}
    </div>
  );
}