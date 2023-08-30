import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import SnakbarComp from "./SnakbarComp";

function Custores() {
    const { appData, setAppData } = useContext(AppContext);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const handelDeleteBtn = (id) => {
        deletePackgaesByCustomerId(id);
        const updateCustomersList = appData.customers.filter(
            (customer) => customer.id !== id
        );
        setAppData((prevAppData) => ({
            ...prevAppData,
            customers: updateCustomersList,
        }));
        setOpenSnackbar(true);
        setTimeout(() => {
            setOpenSnackbar(false);
        }, 1500);
    };

    const deletePackgaesByCustomerId = (id) => {
        const updatePackagesList = appData.packages.filter(
            (packages) => packages.customerid !== id
        );

        setAppData((prevAppData) => ({
            ...prevAppData,
            packages: updatePackagesList,
        }));
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appData.customers.map((row) => {
                            return (
                                <TableRow
                                    key={row.id}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>
                                        <Link to={`/invoice/${row.id}`}>
                                            <Button variant="contained">
                                                Create Invoice
                                            </Button>
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            onClick={() => {
                                                handelDeleteBtn(row.id);
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <SnakbarComp
                isOpen={openSnackbar}
                msg="Deleted success"
                severity="error"
            />
        </div>
    );
}

export default Custores;
