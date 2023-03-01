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
    const {invoice,receiverEmail}=await req.body
    let message=await (`<html><body>
      <h3>Client</h3>
      <p>${invoice.client.name}, ${invoice.client.phone}, ${invoice.client.address}</p>
      <h3>Due Date</h3>
      <p>${invoice.dueDate}</p>
      <table><tr>
      <th>No</th>
      <th>Product Name</th>
      <th>Product Photo</th>
      <th>Quantity</th>
      <th>Unit</th>
      <th>Tax</th>
      <th>Price</th>
      <th>Discount(%)</th>
      <th>Total Price</th></tr>`)
      message+=await invoice.items.map((item,index)=>{return
        `<tr>
        <td>${index+1}</td>
        <td>${item.itemName}</td>
        <td><img
                        src=${item.selectedFiles}
                        alt=""
                        width="150"
                        height="100"
                        value=${item.selectedFiles}
                      /></td>
        <td>${item?.quantity}</td>
        <td>${item?.unit}</td>
                    <td>%${item?.tax.taxname}</td>
                    <td>${item?.unitPrice}</td>
                    <td>%${item?.discount}</td>
                    <td>
                      ${(
                        item.unitPrice *
                        item.quantity *
                        ((100 + item.tax.taxvalue) / 100) *
                        ((100 - item.discount) / 100)
                      ).toFixed(2)}
                    </td>
        </tr>`
                      })
      message+=await `</table></body></html>`
      console.log(message)
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
        html: message
  },(error,info)=>{
    if(error) console.log(error)
    else console.log(info)
  })
};
