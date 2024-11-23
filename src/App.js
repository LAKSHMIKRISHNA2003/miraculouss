import './App.css';
import BookAppointment from './components/BookAppointment';
import Home from './components/Home';
import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TestCards from './components/ServicesCards';
import Form from './components/Form';
import AdminPanel from './components/AdminPanel';


function App() {

  return (

    <div className='App'  >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home></Home>} ></Route>
          <Route path='/Appointments' element={<BookAppointment></BookAppointment>} ></Route>
          <Route path='/ServiceCards' element={<TestCards></TestCards>}></Route>
          <Route path="/Form" element={<Form></Form>}></Route>
          <Route path='/Admin' element={<AdminPanel></AdminPanel>} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
