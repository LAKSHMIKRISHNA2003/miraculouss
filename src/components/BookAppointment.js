import React from 'react'
import Navbar from './Navbar'
import BottomNav from './BottomNav'
import ApppointmentForm from "./AppointmentForm"

function BookAppointment() {
  return (
    <div><Navbar></Navbar>
    <div >
        <ApppointmentForm></ApppointmentForm>
    </div>
    <BottomNav></BottomNav>
    
    </div>
  )
}

export default BookAppointment