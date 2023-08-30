import React, { useContext, useEffect, useState, useMemo } from "react";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { AppContext } from "../App";
import AddNewPackge from "./AddNewPackge";

function Packgaes() {
    const { appData, setAppData } = useContext(AppContext);

    const sortedData = useMemo(
        () =>
            appData.packages
                .slice()
                .sort((a, b) => a.shippingOrder - b.shippingOrder),
        [appData.packages]
    );

    const upElement = (index) => {
        console.log(index);
        const updatedData = [...sortedData];
        const currentPackage = updatedData[index];
        const abovePackage = updatedData[index - 1];

        currentPackage.shippingOrder -= 1;
        abovePackage.shippingOrder += 1;
        setAppData((prevAppData) => ({
            ...prevAppData,
            packages: updatedData,
        }));
    };
    const downElement = (index) => {
        console.log(index);
        const updatedData = [...sortedData];
        const currentPackage = updatedData[index];
        const abovePackage = updatedData[index + 1];

        currentPackage.shippingOrder += 1;
        abovePackage.shippingOrder -= 1;
        setAppData((prevAppData) => ({
            ...prevAppData,
            packages: updatedData,
        }));
    };

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell>Customer Name</TableCell>
                            <TableCell>Weight</TableCell>
                            <TableCell>Price</TableCell>

                            <TableCell>
                                <IconButton
                                    onClick={handleClickOpen}
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                >
                                    <AddIcon />
                                </IconButton>
                                <AddNewPackge
                                    open={open}
                                    closeDialog={handleClose}
                                />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedData.map((row, index) => {
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
                                    <TableCell>
                                        {appData.customers.map((c) => {
                                            if (row.customerid == c.id) {
                                                return c.name;
                                            }
                                        })}
                                    </TableCell>

                                    <TableCell>{row.weight}</TableCell>
                                    <TableCell>{row.price}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            sx={{ mr: 3 }}
                                            disabled={index === 0}
                                            onClick={() => {
                                                upElement(index);
                                            }}
                                        >
                                            Up
                                        </Button>
                                        <Button
                                            variant="contained"
                                            disabled={
                                                index ===
                                                appData.packages.length - 1
                                            }
                                            onClick={() => downElement(index)}
                                        >
                                            Down
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Packgaes;
