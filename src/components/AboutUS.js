import React from 'react';

function AboutUS() {
    return (
        <div className="container about-us mt-5">
            <div className="row h-100">
                {/* Location Title */}
                <div className="col-12 text-center mb-3">
                    <h2 className="location-title">LOCATION</h2>
                    <hr className="divider" />
                </div>

                {/* Google Map Section */}
                <div className="col-12 mb-4">
                    <div className="mx-1 h-100">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!4v1732391513811!6m8!1m7!1s-bflD7pnOr2KsYxQyd5ixA!2m2!1d32.52531977342426!2d-94.8054954148977!3f90.42786!4f0!5f0.7820865974627469" 
                            className="h-100 w-100"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="address"
                        />
                    </div>
                </div>

                {/* About Us Section */}
                <div className="col-12">
                    <div className="mx-1 h-100 d-flex align-items-center flex-column text-center">
                        <div className="about-us-text-container">
                            {/* Centered About Us Title */}
                            <div className="about-us-title my-3 h3">ABOUT US</div>
                            <hr className="divider" />
                            
                            {/* Centered About Us Description */}
                            <div className="about-us-text">
                                Welcome to The Miraculous MVP Kutz & Salon, Longview's go-to spot for modern cuts and classic grooming. 
                                Our skilled barbers blend tradition with the latest trends, offering sharp fades, precision trims, and expert shaves. 
                                Whether you're after a fresh look or a simple cleanup, we ensure top-notch service in a relaxed setting. 
                                Stop by today and leave looking your best!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUS;
