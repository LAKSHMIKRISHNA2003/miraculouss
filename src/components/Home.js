import Navbar from './Navbar';
import MainImg from "./MainImg";
import ServicesCards from './ServicesCards';
import Testimony from './Testimony';
import BottomNav from './BottomNav';
import AboutUS from './AboutUS';
import Form from './Form';
import Timings from './Timings'; // Import Timings component
import React, { useRef, useEffect } from "react"
import { useLocation } from 'react-router-dom';

function Home() {

  const location = useLocation();
  const servicesRef = useRef();
  const formRef = useRef();

  const scrollToServices = () => {
    servicesRef.current.scrollIntoView({ behavior: 'smooth', block: "center" });
  }

  const scrollToForm = () => {
    formRef.current.scrollIntoView({ behavior: 'smooth', block: "end" });
  }

  // Scroll to the desired section when the component mounts
  useEffect(() => {
    if (location.state && location.state.target) {
      const target = location.state.target;
      if (target === "services" && servicesRef.current) {
        scrollToServices();
      } else if (target === "contactus" && formRef.current) {
        setTimeout(() => {
          scrollToForm();
        }, 100)
      }
    }
  }, [location]);

  return (
    <div>
      <Navbar scrollToForm={scrollToForm} scrollToServices={scrollToServices}></Navbar>
      <div>
        <MainImg scrollToForm={scrollToForm} id="home"></MainImg>
        <ServicesCards servicesRef={servicesRef} id="services"></ServicesCards>
        <Testimony></Testimony>
        <Timings></Timings>
        <AboutUS></AboutUS>
        <Form formRef={formRef} id="contactus"></Form>
        <BottomNav></BottomNav>
      </div>
    </div>
  )
}

export default Home;
