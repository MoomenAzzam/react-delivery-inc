import React, { useContext } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

function DrawerComp() {
    const { showMenu, setshowMenu } = useContext(AppContext);

    return (
        <div>
            <Drawer anchor={"left"} open={showMenu} onClose={() => {}}>
                <List style={{ width: "300px" }}>
                    <Link to="/packages" onClick={() => setshowMenu(!showMenu)}>
                        <ListItem button>
                            <ListItemText primary={"Packages"} />
                        </ListItem>
                    </Link>
                    <Link to="/custores" onClick={() => setshowMenu(!showMenu)}>
                        <ListItem button>
                            <ListItemText primary={"Customers"} />
                        </ListItem>
                    </Link>
                    <Link to="/invoices" onClick={() => setshowMenu(!showMenu)}>
                        <ListItem button>
                            <ListItemText primary={"Invoices"} />
                        </ListItem>
                    </Link>
                    <Link to="/invoice" onClick={() => setshowMenu(!showMenu)}>
                        <ListItem button>
                            <ListItemText primary={"Invoice"} />
                        </ListItem>
                    </Link>
                </List>
            </Drawer>
        </div>
    );
}

export default DrawerComp;
