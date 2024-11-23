
import React, { useState, useEffect } from 'react'
import SingleCard from './subComponents/SingleCard';
import DoubleCard from './subComponents/DoubleCard';
import TripleCard from './subComponents/TripleCard';

function TestCards() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardKey, setCardKey] = useState(1)
    const [windowSize, setWindowSize] = useState(window.innerWidth)
    const [singleCard, setSingleCard] = useState(false)
    const [doubleCard, setDoubleCard] = useState(false)
    const [tripleCard, setTripleCard] = useState(false)
    let interval;


    const duplicateCards = [
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
            image: "/images/HairColor.jpg",
            title: "Hair Color",
            description: "Enjoy full-body relaxation with our soothing massages.",
        },
        {
            id: 5,
            image: "/images/Shaving.avif",
            title: "Shaving",
            description: "Get a clean and smooth shave with our expert barbers.",
        },
        {
            id: 6,
            image: "/images/Facial.jpg",
            title: "Facial",
            description: "Refresh your skin with our rejuvenating facial treatments.",
        },
        {
            id: 7,
            image: "/images/Haircut.jpg",
            title: "Haircuts",
            description: "Our expert barbers provide top-notch haircuts tailored to your style.",
        }, {
            id: 8,
            image: "/images/Beard.jpg",
            title: "Beard Grooming",
            description: "Enhance your look with our professional beard grooming services.",
        }, {
            id: 9,
            image: "/images/Massage.png",
            title: "Head Massage",
            description: "Relax and unwind with our rejuvenating head massage services.",
        }
    ];

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth)
            console.log("the width is " + windowSize)
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [window.innerWidth])

    useEffect(() => {
        if (windowSize <= 550) {
            setSingleCard(true);
            setDoubleCard(false);
            setTripleCard(false)
        } else if (windowSize <= 992) {
            setSingleCard(false);
            setDoubleCard(true);
            setTripleCard(false)
        } else if (windowSize >= 993) {
            setSingleCard(false);
            setDoubleCard(false);
            setTripleCard(true);
        }
    }, [windowSize])



    useEffect(() => {
        if (currentIndex <= 6) {
            interval = setInterval(() => {
                setCurrentIndex(prevIndex => (prevIndex + 1));
            }, 5000);

            // Cleanup function to clear the interval
            return () => clearInterval(interval);

        } else {

            setCardKey(cardKey + 1)
            setCurrentIndex(1)

        }
    }, [currentIndex, cardKey]); // You can keep cards.length in the dependency array



    return (
        <div className='container my-5 '>
            <div className="h2 mb-4 service-title">Our Services</div>
            {singleCard ? <SingleCard cardKey={cardKey} currentIndex={currentIndex} duplicateCards={duplicateCards} /> : null}
            {doubleCard ? <DoubleCard cardKey={cardKey} currentIndex={currentIndex} duplicateCards={duplicateCards} /> : null}
            {tripleCard ? <TripleCard cardKey={cardKey} currentIndex={currentIndex} duplicateCards={duplicateCards} /> : null}

        </div>
    )
}

export default TestCards






