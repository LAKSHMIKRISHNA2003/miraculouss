import React, { useRef, useState, useEffect, useCallback } from "react";
import emailjs from '@emailjs/browser';
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore"
import { db } from "../firebase/firebase";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";


function Form() {

    useEffect(()=>{
        window.scrollTo({
            top: 0, behavior: "smooth"
        })
    },[])

    const navigate = useNavigate();
    const form = useRef();

    // Regext Starts here 
    const nameRegex = useRef(/^(?!\s*$)(?!\d+$)[a-zA-Z\s]+$/);
    const emailRegex = useRef(/^(?!\s*$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    const phoneRegex = useRef(/^(\d{9,11}|\(\d{3}\)\s?\d{3}[-\s]?\d{4})$/);
    // Regex ends here 


    // States for error rendering in form starts
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [service, setService] = useState("")
    const [message, setMessage] = useState("")
    const [selectedDate, setSelectedDate] = useState(null); // State for calendar date
    const [selectedTime, setSelectedTime] = useState("");
    const [timeSlots, setTimeSlots] = useState([]);
    const [check, setCheck] = useState(0)
    const [dateFilter, setDateFilter] = useState([]); // Data from firestore will be donwloaded here 
    const [filteredDates, setFilteredDates] = useState(false) // Filtered Date will be here based on selected date so already booked times can be checked 
    const [slotElements, setSlotElements] = useState([]);
    const [isLoading, setIsLoading] = useState(false)


    const [isValid, setIsValid] = useState(false);
    const [nameEmpty, setNameEmpty] = useState(true);
    const [emailEmpty, setEmailEmpty] = useState(true);
    const [phoneValid, setPhoneValid] = useState(false);
    const [optionsSelected, setOptionsSelected] = useState(false)
    const [optionValid, setOptionValid] = useState(false)

    const [nameError, setNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [phoneError, setPhoneError] = useState(false)
    const [optionError, setOptionError] = useState(false)

    // States for error rendering in form ends

    // This is UseRef to render slots only when filterDates are ready 
    const isFilteredDatesReady = useRef(false)

    // Utility function to generate time slots
    const generateTimeSlots = (date) => {
        const day = date.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
        let slots = [];
        let startHour, endHour;

        if (day === 6) { // Saturday
            startHour = 11;
            endHour = 15;
        } else if (day >= 2 && day <= 5) { // Tuesday to Friday
            startHour = 10;
            endHour = 18;
        } else {
            return []; // No slots on Sunday and Monday
        }

        const formatTime = (hour, minutes) => {
            const period = hour >= 12 ? 'PM' : 'AM';
            const hour12 = hour % 12 || 12; // Convert to 12-hour format
            return `${hour12}:${minutes} ${period}`;
        };

        for (let hour = startHour; hour < endHour; hour++) {
            slots.push(`${formatTime(hour, '00')} - ${formatTime(hour, '30')}`);
            slots.push(`${formatTime(hour, '30')} - ${formatTime(hour + 1, '00')}`);
        }

        // console.log(slots);

        return slots;
    }

       // form reset on sumbit function
       const formReset = () => {
        console.log("form reset");
        setEmail("")
        setName("")
        setPhone("")
        setMessage("")
        setNameEmpty(null)
        setEmailEmpty(null)
        setPhoneValid(true)
        setIsValid(false)
        setOptionValid(true)
        setService("")
        setSelectedDate(null)
        setSelectedTime("")
        setNameError(false)
        setEmailError(false)
        setPhoneError(false)
        setOptionError(false)
        navigate("/")

    }
    const formResetRef = useRef(formReset)

    // Test useeffect
    useEffect(() => {
        console.log("test is", nameEmpty, emailEmpty, phoneValid, optionValid);

    }, [nameEmpty, emailEmpty, phoneValid, optionValid])


    // This function downloads all the data from the cloud and sets it in a state for further filter  
    const doubleBookingCheck = async () => {
        const docRef = doc(db, "appointments", "appointmentArray");
        const docSnap = await getDoc(docRef)


        if (docSnap.exists()) {
            const data = docSnap.data();
            setDateFilter(data)
            console.log("Document data:", data);
            return data;
        } else {
            console.log("No such document!");
            return null;
        }
    }

    // This useEffect filters the dates for checking booked timings
    useEffect(() => {

        if (selectedDate) {
            console.log("effect working");
            console.log("dateFilter: ", dateFilter);

            // Check if dateFilter has appointments and is an array
            if (dateFilter.appointments && Array.isArray(dateFilter.appointments)) {
                const allAppointments = dateFilter.appointments; // Directly access appointments array
                const filters = allAppointments.filter(appointment =>
                    appointment.selectedDate === selectedDate
                );
                setFilteredDates(filters);
                console.log("Filtered Dates: ", filters); // Log the filtered results
            } else {
                console.error("dateFilter.appointments is not an array:", dateFilter.appointments);
            }
        }
    }, [dateFilter, selectedDate]);

    // Handle date selection to generate time slots for the selected date
    const handleDateChange = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);
        setIsLoading(true)
        setSelectedDate(formattedDate);
        doubleBookingCheck()
        setTimeSlots(generateTimeSlots(date));
        setSelectedTime("")
    };



    // Disable Sundays and Mondays on the calendar
    const disableDays = ({ date }) => {
        const day = date.getDay();
        return day === 0 || day === 1; // 0 = Sunday, 1 = Monday
    };

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30)


    const submitAppointment = useCallback(async () => {
        setCheck(check + 1)
        if (isValid) { // Construct the appointment object based on form inputs
            const appointment = {
                name,
                email,
                phone,
                service,  // selected service
                message,
                BookingTime: new Date(), // add a timestamp
                selectedDate,
                selectedTime,
            };

            try {
                const appointmentRef = doc(db, "appointments", "appointmentArray");

                // Use arrayUnion to add the appointment as an object inside the array
                await updateDoc(appointmentRef, {
                    appointments: arrayUnion(appointment)
                });

                alert("Appointment booked successfully!");
                formResetRef.current();
            } catch (error) {
                console.error("Error booking appointment: ", error);
                alert("There was an error booking your appointment. Please try again.");
            }
        }
        else { alert("Please check the form and make sure all the fields are correctly filled and Date and Timeslot for booking is selected") }
        console.log("error render working");

        if (!nameEmpty) {
            setNameError(false)
        } else { setNameError(true) }

        if (!emailEmpty) {
            setEmailError(false)
        } else { setEmailError(true) }

        if (optionValid) {
            setOptionError(false)
        } else { setOptionError(true) }

        if (phoneValid) {
            setPhoneError(false)
        } else { setPhoneError(true) }




    }, [email, message, name, phone, selectedDate, selectedTime, service, isValid, nameEmpty, emailEmpty, phoneValid, optionValid, check])

    //   This simply checks if a service option is selected or not 
    const optionsChecker = () => {
        setOptionsSelected(true)
        console.log("selected");

    }

    const duplicateCards = [

        {
            id: 1,
            image: "/images/Haircuts.jpg",
            title: "Regular Haircut",
            description: "Our expert barbers provide top-notch haircuts tailored to your style.",
            price: "$28"
        },
        {
            id: 2,
            image: "/images/HaircutBeard.jpg",
            title: "Haircut + Beard ",
            description: "Transform your style with our expert haircut services and achieve the perfect look with our meticulous beard grooming, all tailored just for you.",
            price: "$ 45"
        },
        {
            id: 3,
            image: "/images/HotTowel.jpg",
            title: "Hot Towel Shave",
            description: "Indulge in the ultimate relaxation with our soothing hot towel shave, leaving your skin refreshed and smooth",
            price: "$ 35"
        },
        {
            id: 4,
            image: "/images/Beard.jpg",
            title: "Beard Trim",
            description: "Refresh your look with our precise beard trimming, ensuring a clean and polished appearance",
            price: "$ 15"
        },
        {
            id: 5,
            image: "/images/Eyebrows.jpg",
            title: "Eyebrows",
            description: "rame your face beautifully with our expert eyebrow shaping, enhancing your natural features.",
            price: "$ 10"
        },
        {
            id: 6,
            image: "/images/Fades.jpg",
            title: "Fades",
            description: "Achieve a sharp, stylish look with our expertly blended fades, perfect for any occasion.",
            price: "$ 30"
        },
        {
            id: 7,
            image: "/images/Massage.png",
            title: "Shape Up",
            description: "Define your style with a precise shape-up, giving you a fresh and clean appearance.",
            price: "$ 20"
        }, {
            id: 8,
            image: "/images/Shampoo.jpg",
            title: "Shampoo ",
            description: "Revitalize your hair with our luxurious shampoo treatment, leaving it clean, fresh, and full of life.",
            price: "$ 15"
        }, {
            id: 9,
            image: "/images/Senior.png",
            title: "Senior (62-74)",
            description: "Experience gentle grooming tailored for seniors, ensuring comfort and style with every visit.",
            price: "$ 25"

        }, {
            id: 10,
            image: "/images/SeniorCitizen.png",
            title: "Senior Citizen (75 and over) ",
            description: "Enjoy a relaxed and dignified grooming experience designed for senior citizens, where care meets classic style.",
            price: "$ 20"
        }, {
            id: 11,
            image: "/images/Haircut.jpg",
            title: "Kids (10 and under) ",
            description: "Make every haircut an adventure with our fun and friendly kids' grooming services, tailored for little ones!",
            price: "$ 25"
        },
    ];

    // This sets the inputs inside form fields into states
    const nameSetter = (e) => {
        if (e.target.id === "name") {
            setName(e.target.value);
            console.log(e.target.value);
        } else if (e.target.id === "email") {
            setEmail(e.target.value)
            console.log(e.target.value);
        } else if (e.target.id === "number") {
            setPhone(e.target.value)
            console.log(e.target.value);
        } else if (e.target.id === "select") {
            setService(e.target.value)
            console.log(e.target.value);
        } else if (e.target.id === "message") {
            setMessage(e.target.value)
        }
    }

    // This gives alert for checking form when you click submit 
    // useEffect(() => {
    //     if (nameEmpty || emailEmpty || !phoneValid || !optionValid) {
    //         alert("Please check the form");
    //     }

    // }, [nameEmpty, emailEmpty, phoneValid, optionValid, check]);


    useEffect(() => {
        // console.log("validating");
        if (nameRegex.current.test(name)) {
            setNameEmpty(false)
        } else { setNameEmpty(true) }

        if (emailRegex.current.test(email)) {
            setEmailEmpty(false)
        } else { setEmailEmpty(true) }

        if (optionsSelected === true) {
            setOptionValid(true)
        } else { setOptionValid(false) }

        if (phoneRegex.current.test(phone)) {
            setPhoneValid(true)
        } else { setPhoneValid(false) }

        // setCheck(check + 1)
        // console.log(nameEmpty, emailEmpty, phoneValid, optionValid);
        // console.log("validatoin complete")
    }, [name, email, optionsSelected, phone])


    // const formValidation = () => {

    //     console.log("validating");
    //     if (nameRegex.test(name)) {
    //         setNameEmpty(false)
    //     } else { setNameEmpty(true) }

    //     if (emailRegex.test(email)) {
    //         setEmailEmpty(false)
    //     } else { setEmailEmpty(true) }

    //     if (optionsSelected === true) {
    //         setOptionValid(true)
    //     } else { setOptionValid(false) }

    //     if (phoneRegex.test(phone)) {
    //         setPhoneValid(true)
    //     } else { setPhoneValid(false) }

    //     setCheck(check + 1)
    //     console.log(nameEmpty, emailEmpty, phoneValid);
    //     console.log("validatoin complete")

    // }



    useEffect(() => {
        console.log("is valid working");
        // console.log(isValid)

        if (nameEmpty === false && emailEmpty === false && phoneValid === true && optionsSelected === true && selectedDate !== null && selectedTime !== "") {
            setIsValid(true);

        } else { setIsValid(false) }
    }, [nameEmpty, emailEmpty, phoneValid, optionsSelected, isValid, selectedDate, selectedTime]);





    // Send email function 
    useEffect(() => {
        if (isValid === true) {
            const templateParams = {
                selected_date: selectedDate,
                selected_time: selectedTime,
                selected_service: service,
                user_name: name, 
                user_email: email, 
                user_phone: phone, 
                message: message,
            }
            emailjs
                .send('service_pkqrsxl', 'template_tkeeb5t',templateParams,  {
                    publicKey: 'FU75s0Yp7qdRv8lyp',
                })
                .then(
                    () => {
                        console.log('SUCCESS!');
                        alert("Your Request has been receieved")
                        formResetRef.current()
                    },
                    (error) => {
                        console.log('FAILED...', error.text);
                    },
                );
        }
    }, [check,]); //eslint-disable-line react-hooks/exhaustive-deps

 


    // This sets the selected time slot the selectedTime state
    const clickTrigger = (slot) => {
        setSelectedTime(slot)

    }

    useEffect(() => {
        console.log(selectedTime);

    }, [selectedTime,])




    useEffect(() => {


        if (filteredDates) {
            isFilteredDatesReady.current = true;
        }

        const slotMaker = () => {
            const data = timeSlots.map((slot) => {
                const isSlotSelected = filteredDates.some((time) => time.selectedTime === slot);
                if (isSlotSelected) {
                    return null;
                } else {
                    return (
                        <div
                            key={slot}
                            onClick={() => clickTrigger(slot)}
                            className={selectedTime === slot ? "m-2 btn btn-primary" : "m-2 btn btn-secondary"}
                        >
                            {slot}
                        </div>
                    );
                }
            }).filter(Boolean);
            setSlotElements(data);
            console.log(data);
        }
        if (isFilteredDatesReady.current) {
            slotMaker();
            setIsLoading(false)
        }

    }, [filteredDates, selectedTime, timeSlots])


    return (
        <div className="container  my-5">
            <div className="h3 write-to-us"> Select Booking Date</div>
            <div className="outer rounded mx-auto ">
                <div className="inner py-5 mx-auto">
                    {/* Date Picker Func */}
                    <div>
                        {/* Unresolved Bug : going to year selction will make any selection disabled
                        Update: The cuase of the bug is disabling Sunday and Monday selection */}
                        <h2>Pick a date</h2>
                        <Calendar onChange={handleDateChange} maxDate={maxDate} minDate={minDate} tileDisabled={disableDays} value={selectedDate}  // No date will be selected initially
                            selected={selectedDate}  // Highlight the selected date
                            
                        />
                        <h4 className="my-2">    Selected Date: {selectedDate ? selectedDate : "No date selected"}


                            {/* .toLocaleDateString("en-US", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })  */}

                        </h4>
                        <h4 className="my-2">Selected Time: {selectedTime.toString()} </h4>
                    </div>
                    {/* Time slot func */}
                    <div className="time-slots">
                        <h4>Availble slots:</h4>
                       
                        {isLoading ? <div className="d-flex justify-content-center">
                            <div div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                            : null}

                        {slotElements}
                    </div>

                    <form ref={form} action="">
                        {nameError ? <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Name"
                                onInput={nameSetter}
                                name='user_name'
                            />
                            <div className="text-start text-danger">* Please enter Name</div>
                        </div> : <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Name"
                                onInput={nameSetter}
                                name='user_name'
                            />
                        </div>}



                        {emailError ? <div className="mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="E-mail"
                                onInput={nameSetter}
                                name='user_email'
                            />
                            <div className="text-start text-danger">* Please enter valid email</div>
                        </div> : <div className="mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="E-mail"
                                onInput={nameSetter}
                                name='user_email'
                            />
                        </div>}


                        {!phoneError ? <div className="mb-3">
                            <input
                                type="number"
                                className="form-control"
                                id="number"
                                placeholder="Number"
                                onInput={nameSetter}
                                name="user_number"
                            />
                        </div> : <div className="mb-3">
                            <input
                                type="number"
                                className="form-control"
                                id="number"
                                placeholder="Number"
                                onInput={nameSetter}
                                name="user_number"
                            />
                            <div className="text-start text-danger">* Please enter valid Phone Number </div>
                        </div>}
                        <div className="mb-3">
                            {!optionError ? <>
                                <select onChange={(e) => { optionsChecker(); nameSetter(e); }} className="form-control" name="select" id="select" value={service}>
                                    <option value="" disabled >Select an option</option>
                                    {duplicateCards.map((card) =>
                                        <option key={card.id} >{card.title} {card.price}</option>)}
                                </select>
                            </> : <>
                                <select onChange={(e) => { optionsChecker(); nameSetter(e); }} className="form-control" name="select" id="select" value={service}>
                                    <option value="" disabled >Select an option</option>
                                    {duplicateCards.map((card) =>
                                        <option key={card.id} >{card.title} {card.price}</option>)}
                                </select>
                                <div className="text-start text-danger">* Please select a service </div></>}
                        </div>


                        <div className="mb-3">
                            <textarea
                                className="form-control"
                                id="message"
                                rows={3}
                                defaultValue={""}
                                placeholder="You Message Here (optional)"
                                onInput={nameSetter}
                                name="message"
                            />
                        </div>

                        <div className="btn btn-primary" onClick={submitAppointment}  >SUBMIT</div>
                    </form>

                </div>
            </div >
        </div >
    );
}

export default Form;
