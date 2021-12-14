import React from "react";
import { Route, Routes, Navigate} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Students from "./components/students/Students";
import StudentForm from "./components/students/StudentForm";
import Addresses from "./components/address/Addresses";
import AddressForm from "./components/address/AddressForm";
import Neptuns from "./components/neptuns/Neptun";
import NeptunForm from "./components/neptuns/NeptunForm";

function App() {
    return (
        <>
            <Navbar/>
            <div className='container'>
                <Routes>
                    <Route path="/" element={<Navigate to="/students"/>}/>

                    <Route path="/students" element={<Students/>}/>
                    <Route path="/students/:id" element={<StudentForm/>}/>
                    <Route path="/students/new" element={<StudentForm/>}/>

                    <Route path="/addresses" element={<Addresses/>}/>
                    <Route path="/addresses/:id" element={<AddressForm/>}/>
                    <Route path="/addresses/new" element={<AddressForm/>}/>

                    <Route path="/neptuns" element={<Neptuns/>}/>
                    <Route path="/neptuns/:id" element={<NeptunForm/>}/>
                    <Route path="/neptuns/new" element={<NeptunForm/>}/>
                </Routes>
            </div>
            <Footer/>
        </>
    );
}

export default App;
