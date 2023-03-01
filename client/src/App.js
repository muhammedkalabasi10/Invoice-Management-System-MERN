import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Clients from "./components/Client/Clients";
import AuthContext from "./components/Context/AuthContext";
//import Clients from "./components/Client/Clients";
import Dashboard from "./components/Dashboard/Dashboard";
import AddInvoice from "./components/Invoice/AddInvoice";
import InvoiceDetails from "./components/Invoice/InvoiceDetails";
import Invoices from "./components/Invoice/Invoices";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Product/Products";
import PageNotFound from "./components/PageNotFound/PageNotFound"
import './style.css'
import SignUp from "./components/Login/SignUp";
import Profile from "./components/Profile/Profile";
import EmailSent from "./components/Login/EmailSent";
import VerifyEmail from "./components/Login/VerifyEmail";
import ForgotPassword from "./components/Login/ForgotPassword"
import ResetPassword from "./components/Login/ResetPassword";

function App() {
  const {user}=useContext(AuthContext)
  return (
    <BrowserRouter>

      {user && <Navbar/>}
      <Routes>
        {user ? <Route path="/" element={<Dashboard/>}/>: <Route path="/" element={<Login/>}/>}
        {user && <><Route path="/products" element={<Products/>} />
        <Route path="/clients" element={<Clients/>}/>
        <Route path="/addinvoice" element={<AddInvoice/>}/>
        <Route path="/invoices/:id" element={<InvoiceDetails/>}/>
        <Route path="/invoices" element={<Invoices/>}/>
        <Route path="/profile" element={<Profile/>}/></>}
        {!user && <Route path="/signup" element={<SignUp/>}/>}
        {!user && <Route path="/sentactivate/:email" element={<EmailSent/>}/>}
        {!user && <Route path="/forgot" element={<ForgotPassword/>}/>}
        <Route path="/verify/:id/:token" element={<VerifyEmail/>}/>
        <Route path="/reset/:id/:token" element={<ResetPassword/>}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
