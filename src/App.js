import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";

import Header from "./components/Header";
import DrawerComp from "./components/DrawerComp";
import Custores from "./components/Custores";
import packages from "./components/Packgaes";
import Invoices from "./components/Invoices";
import Invoice from "./components/Invoice";

const AppContext = createContext();
function App() {
    const [showMenu, setshowMenu] = useState(false);
    const [appData, setAppData] = useState({ customers: [], packages: [] });
    const [invoices, setInvoices] = useState([]);
    useEffect(() => {
        fetch("/data.json")
            .then((response) => response.json())
            .then((data) => {
                setAppData(data);
            });
    }, []);
    const appContextValue = {
        showMenu,
        setshowMenu,
        appData,
        setAppData,
        invoices,
        setInvoices,
    };
    return (
        <AppContext.Provider value={appContextValue}>
            <div className="App">
                <Header />
                <Router>
                    <DrawerComp />
                    <Route exact path="/custores" component={Custores} />
                    <Route path="/packages" component={packages} />
                    <Route path="/invoices" component={Invoices} />
                    <Route path="/invoice/:id" component={Invoice} />
                </Router>
            </div>
        </AppContext.Provider>
    );
}
export { AppContext };
export default App;
