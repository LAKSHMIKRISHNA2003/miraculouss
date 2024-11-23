import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { db, } from '../firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'
import Calendar from 'react-calendar'
import BottomNav from './BottomNav'

function AdminPanel() {
    // These 3 variables will get the today's date in correct format
    const date = new Date()
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);

    // Different states to be used
    const [bookingExist, setBookingExist] = useState(false)
    const [noBookingExist, setNoBookingExist] = useState(false)
    const [selectedDate, setSelectedDate] = useState(formattedDate)
    const [allBookikngData, setAllBookingData] = useState(null)
    const [filteredData, setFilteredData] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [mainError, setMainError] = useState(false)


    // Function for when A date is selected from Calendar
    const handleDateChange = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);
        setIsLoading(true)
        setSelectedDate(formattedDate);
        setBookingExist(false)
        setNoBookingExist(false)
        getAllBookingData();
    }

    // This loads up all the data from firestore to the allBookikngData state
    const getAllBookingData = async () => {
        const docRef = doc(db, "appointments", "appointmentArray");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            setAllBookingData(data)
        } else {
            console.log("no such data");
        }
    }

    // This gives filtered and sorted array for today's day
     const filterData = () => {
        if (allBookikngData && Array.isArray(allBookikngData.appointments) && allBookikngData.appointments.length > 0) {
            console.log("array found");
            setMainError(false)

            const bookings = allBookikngData.appointments.filter((date) => date.selectedDate === selectedDate)

            const sortedData = bookings.sort((a, b) => {
                const parseTime = (time) => {
                    const [hours, minutes] = time.match(/\d+/g).map(Number); // Extract hours and minutes
                    const isPM = time.toLowerCase().includes('pm');
                    return hours % 12 + (isPM ? 12 : 0) + minutes / 60; // Convert to 24-hour format
                };

                const getStartTime = (timeSlot) => timeSlot.split(' - ')[0]; // Get the starting time of the slot

                return parseTime(getStartTime(a.selectedTime)) - parseTime(getStartTime(b.selectedTime));
            });


            setFilteredData(sortedData)

        } else {
            console.log("all book is not an array ");               
            setMainError(true);
            
        }
    }

    // if Appointmenst are found, we see them otherwise we se no appointments found
    useEffect(() => {

        setTimeout(() => {
            if(filteredData !== ""){
                if (filteredData.length >= 1) {
                    setBookingExist(true)
                    setIsLoading(false)
                } else {
                    setNoBookingExist(true);
                    setIsLoading(false)
                }
            }       
        }, 1000);
     
        
    }, [filteredData])


    // This useEffect works everytime to trigger the getBookingData functoin
    useEffect(() => {
        console.log(formattedDate);
        getAllBookingData();
        // eslint-disable-next-line 
    }, [])  


    useEffect(() => { 
        filterData() 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allBookikngData])  

    return (
        <div>
            <Navbar></Navbar>
            <div className="container">
                <div className="outer rounded mx-auto ">
                    <div className="inner py-5 mx-auto">
                        {/* Date Picker Func */}
                        <div>
                            {/* Unresolved Bug : going to year selction will make any selection disabled */}
                            <div className='h3 write-to-us'>Welcome Admin</div>
                            <div className='h3 write-to-us'>Pick a date to view Bookings</div>
                            <Calendar onChange={handleDateChange} value={selectedDate} selected={selectedDate}/>

                        </div>
                        {/* Time slot func */}
                    </div>
                </div >
            </div >
            <div className='h1 fw-bold write-to-us  my-5'>Appointments for : {selectedDate}</div>
            {isLoading ?
                <div div className="spinner-border mb-5" style={{ width: "100px", height: "100px", fontSize: "100px" }} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div> : null}
            {bookingExist ? <div className="container mb-5">
                <div className='row'>
                    {filteredData.map((data, index) => (
                        <div key={index} className="col-md-4 my-2">
                            <div className="card h-100">
                                <div className="card-body">
                                    <div className="text-start"><b>Name:</b> {data.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</div>

                                    <div className="text-start"><b>Servcie:</b> {data.service}</div>
                                    <div className='text-start'><b>Date:</b> {data.selectedDate}</div>
                                    <div className='text-start'><b>TimeSlot:</b> {data.selectedTime} </div>
                                    <div className='text-start'><b>Email:</b> {data.email}</div>
                                    <div className='text-start'><b>Phone:</b> {data.phone}</div>
                                    <div className='text-start'><b>Message:</b> {data.message}</div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div> : null}

            {noBookingExist? <div className='write-to-us h3 mb-5'> No Appointments Found  </div>
                : null}

            {mainError && !isLoading ? <div className='write-to-us h3 mb-5'> Error in fetching Data, Contact Developer  </div> : null}
            <BottomNav></BottomNav>
        </div>
    )
}

export default AdminPanel