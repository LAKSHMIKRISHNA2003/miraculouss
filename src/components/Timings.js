import React from 'react';

function Timings() {
    const days = [
        { day: 'Monday', time: '7:00 AM - 8:00 PM' },
        { day: 'Tuesday', time: '7:00 AM - 8:00 PM' },
        { day: 'Wednesday', time: '7:00 AM - 8:00 PM' },
        { day: 'Thursday', time: '7:00 AM - 8:00 PM' },
        { day: 'Friday', time: '7:00 AM - 8:00 PM' },
        { day: 'Saturday', time: '7:00 AM - 8:00 PM' },
        { day: 'Sunday', time: '7:00 AM - 8:00 PM' },
    ];

    return (
        <div className="container mt-5">
            <h2 className="timings-title text-center mb-4">OPENING & CLOSING</h2>
            <hr className="divider" />
            <div className="timings-list">
                {days.map((day, index) => (
                    <div
                        key={index}
                        className={`timing-item py-3 px-4 ${
                            index % 2 === 0 ? 'bg-black text-white' : 'bg-white text-black'
                        }`}
                    >
                        <div className="d-flex justify-content-between">
                            <span className="day">{day.day}</span>
                            <span className="time">{day.time}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Timings;
