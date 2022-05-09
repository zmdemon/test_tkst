import React from 'react';
import AuthPage from "./pages/auth";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import RequireAuth from "./hoc/RequireAuth";
import ContactsPage from "./pages/contacts";


function App() {
    return (
        <>
            <Router basename={"/"}>
                <Routes>
                    <Route path={"*"} element={
                        <RequireAuth>
                            <Navigate to="/contacts"/>
                        </RequireAuth>
                    }/>
                    <Route path={"contacts"} element={
                        <RequireAuth>
                            <ContactsPage/>
                        </RequireAuth>
                    }/>
                    <Route path="login" element={<AuthPage/>}/>
                </Routes>
            </Router>
        </>
    );
}

export default App;
