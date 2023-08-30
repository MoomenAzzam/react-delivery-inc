import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "./Invoice.module.css";

import SnakbarComp from "./SnakbarComp";

import { AppContext } from "../App";

function Invoice() {
    const { id } = useParams();
    const { appData } = useContext(AppContext);
    const randomId = Math.floor(Math.random() * 100);

    const [invoiceCustomerData, setInvoiceCustomerData] = useState([]);
    const [invoicePackagesData, setInvoicePackagesData] = useState([]);
    const [totalOfPrice, setTotalOfPrice] = useState(0);
    const [totalOfWeight, setTotalOfWeight] = useState(0);

    useEffect(() => {
        const filteredDataC = appData.customers.filter(
            (customer) => customer.id == id
        );
        setInvoiceCustomerData(filteredDataC);
    }, [id]);
    useEffect(() => {
        let newTotalWeight = 0;
        let newTotalPrice = 0;
        const filteredDataP = appData.packages.filter((p) => {
            if (p.customerid == id) {
                const WeightAsNum = parseInt(p.weight.split("k")[0]);
                newTotalWeight += WeightAsNum;
                newTotalPrice += p.price;
            }
            return p.customerid == id;
        });
        setTotalOfPrice(newTotalPrice);
        setTotalOfWeight(newTotalWeight);
        setInvoicePackagesData(filteredDataP);
    }, [id]);

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    return (
        <div className="invoice">
            <div className={styles.upTaple}>
                <div className="date-name">
                    <p>{formattedDate}</p>
                    {invoiceCustomerData.length > 0 && (
                        <p>{invoiceCustomerData[0].name}</p>
                    )}
                </div>
                <div className="invo">
                    <h5>Invoice</h5>
                    <p>{randomId}</p>
                </div>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Weight</TableCell>
                            <TableCell>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {invoicePackagesData.map((row) => {
                            return (
                                <TableRow
                                    key={row.id}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.weight}</TableCell>
                                    <TableCell>{row.price}</TableCell>
                                </TableRow>
                            );
                        })}
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>{totalOfWeight}kg</TableCell>
                            <TableCell>Total:{totalOfPrice}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="thx">
                <p> Your received {invoicePackagesData.length} packages</p>
                <p>Thank you for using our services</p>
            </div>
            <SnakbarComp isOpen={true} msg="Created Success" />
        </div>
    );
}

export default Invoice;
