import InvoiceModel from "../models/InvoiceModel.js";
import nodemailer from "nodemailer";

export const getInvoicesByUser = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const invoices = await InvoiceModel.find({ creatorId: searchQuery });
    res.status(200).json(invoices);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getInvoices = async (req, res) => {
  try {
    const allInvoices = await InvoiceModel.find();
    res.status(200).json(allInvoices);
  } catch (error) {
    res.status(409).json(error.message);
  }
};

export const addInvoice = async (req, res) => {
  const invoice = req.body;
  const newInvoice = await new InvoiceModel(invoice);
  try {
    await newInvoice.save();
    res.status(201).json(newInvoice);
  } catch (err) {
    res.status(409).json(err.message);
  }
};

export const getInvoice = async (req, res) => {
  const { id } = req.params;
  try {
    const invoice = await InvoiceModel.findById(id);
    res.status(200).json(invoice);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateInvoice = async (req, res) => {
  const { id: _id } = await req.params;
  const invoice = await req.body;
  try {
    const updatedInvoice = await InvoiceModel.findByIdAndUpdate(
      _id,
      { ...invoice },
      { new: true }
    );
    res.json(updatedInvoice);
  } catch (err) {
    res.json({ message: err.message });
  }
};

export const deleteInvoice = async (req, res) => {
  const { id } = req.params;
  try {
    await InvoiceModel.findByIdAndRemove(id);
    res.json({ message: "Invoice successfully deleted" });
  } catch (err) {
    res.json({ message: err.message });
  }
};

export const sendEmail = async (req, res) => {
    const {receiverEmail}=await req.body
  const transporter = await nodemailer.createTransport({
    service:process.env.EMAIL_SERVICE,
    secure:false,
    auth : {
        user : process.env.EMAIL_USERNAME,
        pass : process.env.EMAIL_PASSWORD
    }
    /*tls:{
            rejectUnauthorized:false
        }*/
  });
  transporter.sendMail({
    from:process.env.EMAIL_USERNAME,
        to:`${receiverEmail}`,
        subject:"Invoice",
        text:"Invoice Text",
        html: '<p>This is e-mail sample</p>'
  },(error,info)=>{
    if(error) console.log(error)
    else console.log(info)
  })
};
