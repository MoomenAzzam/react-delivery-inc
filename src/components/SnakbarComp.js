import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function SnakbarComp({ isOpen, msg, severity }) {
    return (
        <div>
            <Snackbar open={isOpen} autoHideDuration={1500}>
                <Alert severity={severity} sx={{ width: "100%" }}>
                    {msg}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default SnakbarComp;
