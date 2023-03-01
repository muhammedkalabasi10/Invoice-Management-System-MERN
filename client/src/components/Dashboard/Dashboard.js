import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import module from "./Dashboard.module.css";
import { getInvoices } from "../../actions/invoiceAction";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import CardItem from "./CardItem";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Monthly Payments",
    },
  },
};

export default function Dashboard() {
  const dispatch = useDispatch();
  const [months2, setMonths2] = useState({
    "01": 0,
    "02": 0,
    "03": 0,
    "04": 0,
    "05": 0,
    "06": 0,
    "07": 0,
    "08": 0,
    "09": 0,
    10: 0,
    11: 0,
    12: 0,
  });

  const invoices = useSelector((state) => state.invoices.invoices);
  const paymentsAndDates = invoices.reduce(
    (acc, { paymentRecords }) => acc.concat(paymentRecords),
    []
  );
  const paymentsAndMonths = paymentsAndDates.map((pam) => {
    const sliceDatePaid = pam.datePaid.slice(5, 7);
    return {
      ...pam,
      datePaid: sliceDatePaid,
    };
  });

  useEffect(() => {
    dispatch(getInvoices());
    const newMonths = { ...months2 };
    paymentsAndMonths.forEach(({ payment, datePaid }) => {
      newMonths[datePaid] += payment;
    });
    setMonths2(newMonths);
  }, [dispatch]);

  const labels = Object.keys(months2);

  const data = {
    labels,
    datasets: [
      {
        label: "Payments",
        data: Object.values(months2),
        backgroundColor: "rgba(51, 181, 71, 0.64)",
      },
    ],
  };

  return (
    <div className={module.maindiv}>
      <Grid container spacing={3} marginBottom={10}>
      <CardItem
        width={250}
        title="Total Invoices"
        avatar={<ReceiptIcon />}
        value={invoices.length}
        status="Positive"
      />
      <CardItem
        width={320}
        title="Total Invoice Amounts"
        avatar={<RequestQuoteIcon />}
        value={invoices.reduce((acc, item) => item.total + acc, 0)}
        status="Positive"
      />
      <CardItem
        width={250}
        title="Paid Invoices"
        avatar={<CreditScoreIcon />}
        value={invoices.reduce(
          (acc, item) => (item.status === "Paid" ? acc + 1 : acc + 0),
          0
        )}
        status="Positive"
      />
      <CardItem
        width={250}
        title="Unpaid Invoices"
        avatar={<ProductionQuantityLimitsIcon />}
        value={invoices.reduce(
          (acc, item) => (item.status === "Unpaid" ? acc + 1 : acc + 0),
          0
        )}
        status="Negative"
      />
      <CardItem
        width={320}
        title="Expired and Unpaid Invoice"
        avatar={<MoneyOffIcon />}
        value={invoices.reduce(
          (acc, item) =>
            new Date(item.dueDate) < new Date(Date.now()) ? acc + 1 : acc + 0,
          0
        )}
        status="Negative"
      />
      </Grid>
      <Bar options={options} data={data} />
    </div>
  );
}
