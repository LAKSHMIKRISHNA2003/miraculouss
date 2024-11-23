import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function Correct() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const cards = [
        {
            id: 1,
            image: "/images/Haircut.jpg",
            title: "Haircuts",
            description: "Our expert barbers provide top-notch haircuts tailored to your style.",
        },
        {
            id: 2,
            image: "/images/Beard.jpg",
            title: "Beard Grooming",
            description: "Enhance your look with our professional beard grooming services.",
        },
        {
            id: 3,
            image: "/images/Massage.png",
            title: "Head Massage",
            description: "Relax and unwind with our rejuvenating head massage services.",
        },
        {
            id: 4,
            image: "/images/Massage.png",
            title: "Body Massage",
            description: "Enjoy full-body relaxation with our soothing massages.",
        },
        {
            id: 5,
            image: "/images/Haircut.jpg",
            title: "Shaving",
            description: "Get a clean and smooth shave with our expert barbers.",
        },
        {
            id: 6,
            image: "/images/Beard.jpg",
            title: "Facial",
            description: "Refresh your skin with our rejuvenating facial treatments.",
        }
    ];

    // Automatically move cards every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === cards.length - 3 ? 0 : prevIndex + 1
            );
        }, 5000); // Change cards every 5 seconds

        return () => clearInterval(interval);
    }, [cards.length]);

    return (
        <div className="container my-5">
            <div className="card-slider" style={{ overflow: 'hidden', width: '100%' }}>
                <motion.div
                    className="cards-container d-flex"
                    animate={{ x: `-${currentIndex * 33.33}%` }} // Moves cards left
                    transition={{ duration: 1, ease: 'easeInOut' }} // Smooth transition between cards
                    style={{ display: 'flex' }} // Adjust container width based on the number of cards
                >
                    {cards.map((card) => (
                        <div key={card.id} className="holder" style={{ minWidth: "33.33%" }}>
                            <div className="card h-100 mx-3">
                                <div className="card-header">
                                    <div>
                                        <img className="card-image rounded-circle" src={card.image} alt="" />
                                    </div>
                                    <b>{card.title}</b>
                                </div>
                                <div className="card-body">
                                    {card.description}
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}

export default Correct;