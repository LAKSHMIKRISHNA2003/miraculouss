import React, { useRef, useState, useEffect } from "react";
import emailjs from '@emailjs/browser';


function Form({ formRef }) {

  const form = useRef();

  // Regext Starts here 
  const nameRegex = /^(?!\s*$)(?!\d+$)[a-zA-Z\s]+$/;
  const emailRegex = /^(?!\s*$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^(\d{9,11}|\(\d{3}\)\s?\d{3}[-\s]?\d{4})$/;
  // Regex ends here 



  // States for error rendering in form starts
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("")
  const [check , setCheck] = useState(0)

  const [isValid, setIsValid] = useState(false);
  const [nameEmpty, setNameEmpty] = useState(null);
  const [emailEmpty, setEmailEmpty] = useState(null);
  const [phoneValid, setPhoneValid] = useState(true);
  // States for error rendering in form ends



  const nameSetter = (e) => {
    if (e.target.id === "name") {
      setName(e.target.value);
      console.log(e.target.value);
      console.log(message);


    } else if (e.target.id === "email") {
      setEmail(e.target.value)
      console.log(e.target.value);

    } else if (e.target.id === "number") {
      setPhone(e.target.value)
      console.log(e.target.value);
    }
  }


  useEffect(() => {
    if (nameEmpty || emailEmpty || !phoneValid) {
      alert("Please check the form");
    }
  }, [nameEmpty, emailEmpty, phoneValid, check]);

  const formValidation = () => {

    console.log("validating");
    if (nameRegex.test(name)) {
      setNameEmpty(false)
    } else { setNameEmpty(true) }

    if (emailRegex.test(email)) {
      setEmailEmpty(false)
    } else { setEmailEmpty(true) }

    if (phoneRegex.test(phone)) {
      setPhoneValid(true)
    } else { setPhoneValid(false) }

    setCheck(check + 1)
    console.log(nameEmpty, emailEmpty, phoneValid);
    console.log("validatoin complete")
  }



  useEffect(() => {
    console.log("is valid working");

    if (nameEmpty === false && emailEmpty === false && phoneValid === true) {
      setIsValid(true);

    } else { setIsValid(false) }
  }, [nameEmpty, emailEmpty, phoneValid]);





  // Send email function 
  useEffect(() => {
    if (isValid === true) {
      emailjs
        .sendForm('service_pkqrsxl', 'template_tkeeb5t', form.current, {
          publicKey: 'FU75s0Yp7qdRv8lyp',
        })
        .then(
          () => {
            console.log('SUCCESS!');
            alert("Your Request has been receieved")
            formReset()
          },
          (error) => {
            console.log('FAILED...', error.text);
          },
        );
    }
  }, [isValid]);

  // form reset on sumbit function
  const formReset = () => {
    console.log("form reset");
    form.current.reset();
    setEmail("")
    setName("")
    setPhone("")
    setMessage("")
    setNameEmpty(null)
    setEmailEmpty(null)
    setPhoneValid(true)
    setIsValid(false)
  }




  return (
    <div ref={formRef} className="container  my-5">
      <div className="h3 write-to-us"> WRITE TO US</div>
      <hr className="divider" />
      <div className="outer rounded mx-auto ">
        <div className="inner py-5 mx-auto">
          <form ref={form} action="">
            {nameEmpty ? <div className="mb-3">
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



            {emailEmpty ? <div className="mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="E
                mail"
                onInput={nameSetter}
                name='user_email'
              />
              <div className="text-start text-danger">* Please enter valid email</div>
            </div> : <div className="mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="E
                mail"
                onInput={nameSetter}
                name='user_email'
              />
            </div>}


            {phoneValid ? <div className="mb-3">
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
              <textarea
                className="form-control"
                id="message"
                rows={3}
                defaultValue={""}
                placeholder="You Message Here"
                onInput={nameSetter}
                name="message"
              />
            </div>
            <div className="btn btn-primary" onClick={formValidation} >SUBMIT</div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
