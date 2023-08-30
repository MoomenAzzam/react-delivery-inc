import React, { useContext } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AppContext } from "../App";

function Invoices() {
    const { appData } = useContext(AppContext);
    const customerData = {};

    appData.packages.forEach((pkg) => {
        if (!customerData[pkg.customerid]) {
            customerData[pkg.customerid] = {
                customerName: appData.customers.find(
                    (customer) => customer.id === pkg.customerid
                ).name,
                totalOfWeight: 0,
                totalPrice: 0,
            };
        }
        const asNum = parseInt(pkg.weight.split("k")[0]);
        customerData[pkg.customerid].totalOfWeight += asNum;
        customerData[pkg.customerid].totalPrice += pkg.price;
    });
    const invoices = Object.values(customerData);
    console.log(customerData);

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Customer Name</TableCell>
                            <TableCell>Total Weight</TableCell>
                            <TableCell>Total Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {invoices.map((row) => {
                            return (
                                <TableRow
                                    key={row.customerName}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell>{row.customerName}</TableCell>
                                    <TableCell>{row.totalOfWeight}kg</TableCell>
                                    <TableCell>{row.totalPrice}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Invoices;
