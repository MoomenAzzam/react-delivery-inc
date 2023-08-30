import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { AppContext } from "../App";
import SnakbarComp from "./SnakbarComp";

export default function AddNewPackge({ open, closeDialog }) {
    const { appData, setAppData } = useContext(AppContext);
    const [id, setId] = useState("");
    const [weight, setWeight] = useState(0);
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [price, setPrice] = useState(0);
    const [shippingOrder, setShippingOrder] = useState("");

    const handleCustomerChange = (event) => {
        setSelectedCustomer(event.target.value);
    };

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleAddNewPackge = () => {
        const newData = {
            id,
            weight,
            customerid: selectedCustomer,
            price: parseInt(price),
            shippingOrder,
        };

        setAppData((prevAppData) => ({
            ...prevAppData,
            packages: [...prevAppData.packages, newData],
        }));
        setOpenSnackbar(true);
        setTimeout(() => {
            setOpenSnackbar(false);
        }, 1500);
    };

    return (
        <div>
            <Dialog open={open} onClose={closeDialog}>
                <DialogTitle>Add New Packgae</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="ID"
                        type="text"
                        fullWidth
                        variant="standard"
                        sx={{ marginTop: "20px" }}
                        onChange={(event) => setId(event.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Weight"
                        type="text"
                        fullWidth
                        variant="standard"
                        sx={{ marginTop: "20px" }}
                        onChange={(event) =>
                            setWeight(event.target.value + "kg")
                        }
                    />
                    <div>
                        <InputLabel
                            id="select-label"
                            sx={{ marginTop: "20px" }}
                        >
                            Select an customer
                        </InputLabel>
                        <Select
                            fullWidth
                            labelId="select-label"
                            id="select"
                            value={selectedCustomer}
                            onChange={handleCustomerChange}
                            label="Select an Option"
                        >
                            {appData.customers.map((customer) => (
                                <MenuItem key={customer.id} value={customer.id}>
                                    {customer.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Price"
                        type="text"
                        fullWidth
                        variant="standard"
                        sx={{ marginTop: "20px" }}
                        onChange={(event) => setPrice(event.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Shoping Order"
                        type="text"
                        fullWidth
                        variant="standard"
                        sx={{ marginTop: "20px" }}
                        onChange={(event) =>
                            setShippingOrder(event.target.value)
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>Cancel</Button>
                    <Button
                        onClick={() => {
                            handleAddNewPackge();
                            closeDialog();
                        }}
                    >
                        Add Packgae
                    </Button>
                </DialogActions>
            </Dialog>
            <SnakbarComp
                isOpen={openSnackbar}
                msg="Created Success"
                severity="info"
            />
        </div>
    );
}
