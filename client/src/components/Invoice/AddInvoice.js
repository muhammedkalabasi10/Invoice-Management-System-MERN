import React, { useContext, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import classes from "./AddInvoice.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getClients } from "../../actions/clientActions";
import { getProducts } from "../../actions/productActions";
import { addInvoice } from "../../actions/invoiceAction";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import DialogPage from "../Dial/DialogPage";
import Button from "@mui/material/Button";
import Formcontrol from "../Formcontrol";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SnackBar from "../SnackBar";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

export default function AddInvoice() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const clients = useSelector((state) => state.clients.clients);
  const products = useSelector((state) => state.products.products);

  const productNames = products.map((prod) => {
    return prod.name;
  });
  const [clientValue, setClientValue] = useState("");
  const [inputClient, setInputClient] = useState("");
  const [openUnit, setOpenUnit] = useState(false);
  const [openTax, setOpenTax] = useState(false);
  const [currentUnit, setCurrentUnit] = useState("");
  const [currentTax, setCurrentTax] = useState({ taxname: "", taxvalue: 0 });
  const [selectedProducts, setSelectedProducts] = useState([
    {
      itemName: "",
      selectedFiles: "",
      unitPrice: 0,
      quantity: 1,
      unit: "meter",
      tax: { taxname: "No Tax", taxvalue: 0 },
      discount: 0,
    },
  ]);
  const [units, setUnits] = useState([
    "meter",
    "centimeter",
    "kilogram",
    "gram",
    "litre",
    "mililitre",
  ]);
  const [taxes, setTaxes] = useState({
    taxnames: ["No Tax", "UST 19", "UST 7", "KDV 18", "KDV 8", "TVA 20"],
    taxvalues: [0, 19, 7, 18, 8, 20],
  });
  const [openSnackbar, setOpenSnackbar] = useState({
    message: "",
    status: false,
  });
  const [total, setTotal] = useState(0);
  const [selectedClient, setSelectedClient] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const clientNames = clients.map((client) => {
    return (
      client.name +
      ", " +
      client.email +
      ", " +
      client.phone +
      ", " +
      client.address
    );
  });

  const dispatch = useDispatch();
  const date = new Date();
  const [selectedDate, setSelectedDate] = useState({ date: new Date() });

  useEffect(() => {
    dispatch(getClients());
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    const totals = selectedProducts.map((product) => {
      return (
        product.unitPrice *
        product.quantity *
        ((100 + product.tax.taxvalue) / 100) *
        ((100 - product.discount) / 100)
      );
    });
    setTotal(totals.reduce((a, b) => a + b, 0));
  }, [selectedProducts]);

  const productHandle = (e, newInputValue, index) => {
    const values = [...selectedProducts];
    values[index]["itemName"] = newInputValue;
    const inputProduct = products.find((prod) => {
      return prod.name === newInputValue;
    });
    if (inputProduct !== undefined) {
      values[index]["unitPrice"] = inputProduct.price;
      values[index]["selectedFiles"] = inputProduct.selectedFiles;
    }
    setSelectedProducts(values);
  };

  const handleChange = (e, index) => {
    if (
      (e.target.name !== "quantity" &&
        e.target.name !== "unitPrice" &&
        e.target.name !== "discount") ||
      e.target.value >= 0
    ) {
      const values = [...selectedProducts];
      if (e.target.name === "tax") {
        values[index][e.target.name].taxname = e.target.value;
        values[index][e.target.name].taxvalue =
          taxes.taxvalues[taxes.taxnames.indexOf(e.target.value)];
      } else {
        values[index][e.target.name] = e.target.value;
      }
      setSelectedProducts(values);
    }
  };

  const addUnit = () => {
    setUnits([...units, currentUnit]);
    setOpenUnit(false);
  };

  const handleUnitOpen = () => {
    setOpenUnit(true);
  };

  const handleUnitClose = () => {
    setOpenUnit(false);
  };

  const addTax = () => {
    setTaxes((prevTaxes) => ({
      taxnames: [...prevTaxes.taxnames, currentTax.taxname],
      taxvalues: [...prevTaxes.taxvalues, Number(currentTax.taxvalue)],
    }));
    setOpenTax(false);
  };

  const handleTaxOpen = () => {
    setOpenTax(true);
  };

  const handleTaxClose = () => {
    setOpenTax(false);
  };

  const handleRemoveField = (index) => {
    if (index !== 0) {
      const values = [...selectedProducts];
      values.splice(index, 1);
      setSelectedProducts(values);
    } else {
      setOpenSnackbar({
        message: "You can't delete last product",
        status: true,
      });
    }
  };

  const closeSnackbar = () => {
    setOpenSnackbar({ message: "", status: false });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    setSelectedProducts((prevProducts) => [
      ...prevProducts,
      {
        itemName: "",
        selectedFiles: "",
        unitPrice: 0,
        quantity: 1,
        unit: "",
        tax: { taxname: "", taxvalue: 0 },
        discount: 0,
      },
    ]);
  };

  const saveHandler = (e) => {
    e.preventDefault();
    const pNames = selectedProducts.map((product) => {
      return product.itemName;
    });
    if (selectedClient.name === "") {
      setOpenSnackbar({ message: "Plesae select client", status: true });
    } else if (total === 0) {
      setOpenSnackbar({
        message: "Plesae add product to invoice",
        status: true,
      });
    } else if (pNames.includes("")) {
      setOpenSnackbar({
        message: "Plesae enter correct product information",
        status: true,
      });
    } else {
      //CreatorId düzenlenecek
      dispatch(
        addInvoice(
          {
            dueDate: selectedDate.date.toISOString(),
            items: selectedProducts,
            client: selectedClient,
            total: total.toFixed(2),
            status: "Unpaid",
            creatorId: user.user._id,
            createDate: date.toISOString(),
          },
          navigate
        )
      );
    }
  };

  return (
    <div className={classes.invoice}>
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="space-between">
          <Grid xs={9}>
            <label for="clientcomplete" className={classes.label}>
              {clientValue}
            </label>
            <Autocomplete
              sx={{ width: "70vh" }}
              id="clientcomplete"
              value={clientValue}
              onChange={(event, text) => {
                setClientValue(text);
              }}
              inputValue={inputClient}
              onInputChange={(event, newInputValue) => {
                setSelectedClient(clients[clientNames.indexOf(newInputValue)]);
                setInputClient(newInputValue);
              }}
              options={clientNames}
              renderInput={(params) => (
                <TextField {...params} label="Clients" />
              )}
            />
          </Grid>
          <Grid xs={3}>
            <Stack spacing={2} sx={{ textAlign: "left" }}>
              <p className={classes.date}>
                Date: <span>{`${date.toJSON().slice(0, 10)}`}</span>
              </p>
              <p className={classes.date}>
                Due Date:{" "}
                <span>{`${selectedDate.date.toJSON().slice(0, 10)}`}</span>
              </p>
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <Divider
        sx={{
          marginBottom: "2rem",
          marginTop: "2rem",
        }}
      />
      <Container maxWidth="xl">
        <TableContainer component={Paper}>
          <Table aria-label="product-table">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Photo</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Tax(%)</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Discount(%)</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedProducts.map((item, index) => (
                <TableRow key={index}>
                  <TableCell align="left">{index + 1}</TableCell>
                  <TableCell align="left">
                    <Autocomplete
                      sx={{ width: "10rem" }}
                      id="productcomplete"
                      options={productNames}
                      renderInput={(params) => (
                        <TextField {...params} label="Products" />
                      )}
                      onInputChange={(e, newInputValue) => {
                        productHandle(e, newInputValue, index);
                      }}
                      freeSolo
                    />
                  </TableCell>
                  <TableCell align="left">
                    {item.selectedFiles && (
                      <img
                        src={item.selectedFiles}
                        alt="Product photo"
                        style={{
                          maxWidth: "100%", height:"auto"
                        }}
                        value={item.selectedFiles}
                      />
                    )}
                  </TableCell>
                  <TableCell align="left">
                    <InputBase
                      sx={{ width: "3rem" }}
                      type="number"
                      name="quantity"
                      onChange={(e) => handleChange(e, index)}
                      value={item.quantity}
                      placeholder="0"
                    />
                  </TableCell>
                  <TableCell align="left">
                    <Formcontrol
                      title="Unit"
                      index={index}
                      handleChange={handleChange}
                      list={units}
                    />
                    <br />
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleUnitOpen}
                      sx={{ marginLeft: "0.6rem" }}
                    >
                      Add New Unit
                    </Button>
                    <DialogPage
                      open={openUnit}
                      handleClose={handleUnitClose}
                      action="Add"
                      title="Unit"
                      textfields={["Name"]}
                      state={{ setState: setCurrentUnit }}
                      btnHandle={addUnit}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <Formcontrol
                      title="Tax"
                      index={index}
                      handleChange={handleChange}
                      list={taxes.taxnames}
                    />
                    <br />
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleTaxOpen}
                      sx={{ marginLeft: "0.6rem" }}
                    >
                      Add New Tax
                    </Button>
                    <DialogPage
                      open={openTax}
                      handleClose={handleTaxClose}
                      action="Add"
                      title="Tax"
                      textfields={["taxname", "taxvalue"]}
                      state={{ setState: setCurrentTax }}
                      btnHandle={addTax}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <InputBase
                      sx={{ width: "5rem" }}
                      type="number"
                      name="unitPrice"
                      onChange={(e) => handleChange(e, index)}
                      value={item.unitPrice}
                      placeholder="0"
                    />
                  </TableCell>
                  <TableCell>
                    <InputBase
                      sx={{ width: "3rem" }}
                      type="number"
                      name="discount"
                      onChange={(e) => handleChange(e, index)}
                      value={item.discount}
                      placeholder="0"
                    />
                  </TableCell>
                  <TableCell>
                    <label>
                      {(
                        item.unitPrice *
                        item.quantity *
                        ((100 + item.tax.taxvalue) / 100) *
                        ((100 - item.discount) / 100)
                      ).toFixed(2)}
                    </label>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleRemoveField(index)}>
                      <DeleteOutlineIcon
                        style={{ width: "20px", height: "20px" }}
                      />
                      <SnackBar
                        state={openSnackbar}
                        handleClose={closeSnackbar}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <IconButton
                  onClick={handleAddProduct}
                  aria-label="add"
                  size="large"
                  color="info"
                >
                  <AddShoppingCartIcon fontSize="inherit" />
                </IconButton>
              </TableRow>
              <TableRow>
                <TableCell colSpan={7} />
                <TableCell colSpan={1}>
                  <h4>
                    <b>Total</b>
                  </h4>
                </TableCell>
                <TableCell align="right">
                  <h6>
                    <b>{total.toFixed(2)}</b>
                  </h6>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Divider
        sx={{
          marginBottom: "2rem",
          marginTop: "2rem",
        }}
      />
      <Container align="center">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {
            <DatePicker
              disablePast
              label="Responsive"
              openTo="year"
              views={["year", "month", "day"]}
              value={selectedDate.date}
              onChange={(newValue) => {
                setSelectedDate({ date: newValue });
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          }
        </LocalizationProvider>
      </Container>
      <Divider
        sx={{
          marginBottom: "2rem",
          marginTop: "2rem",
        }}
      />
      <Container align="center">
        <Button
          onClick={saveHandler}
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
      </Container>
    </div>
  );
}
