
import React, { useState, useEffect } from 'react'
import DoubleCard from './subComponents/DoubleCard';
import TripleCard from './subComponents/TripleCard';

function TestCards({ servicesRef }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardKey, setCardKey] = useState(1)
    const [windowSize, setWindowSize] = useState(window.innerWidth)
    const [singleCard, setSingleCard] = useState(false)
    const [doubleCard, setDoubleCard] = useState(false)
    const [tripleCard, setTripleCard] = useState(false)
         
    const duplicateCards = [
        
        {
            id: 1,
            image: "/images/1.png",
            title: "Men's Haircut",
            description:"",
            price: "$ 25",
            time : "15min"
        },
        {
            id: 2,
            image: "/images/2.png",
            title: "Clipper Shave ",
            description: "",
            price : "$ 10"
        },
        {
            id: 3,
            image: "/images/3.png",
            title: "Straight Razor Shave",
            description: "",
            price: "$ 15"
        },
        {
            id: 4,
            image: "/images/4.png",
            title: "Kids haircut 13 and under",
            description: "",
            price: "$ 20"
        },
        {
            id: 5,
            image: "/images/5.png",
            title: "Designs",
            description: "",
            price: "$ 0"
        },
        
    ];

    const cardLength = duplicateCards.length; 


    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth)
            console.log("the width is " + windowSize)
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    })

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
            let interval = setInterval(() => {
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
        <div  className='container my-5 '>
            <div ref={servicesRef} className="h2 mb-4 service-title">OUR SERVICES</div>
            <hr className="divider" />
            {singleCard ? <DoubleCard cardKey={cardKey} currentIndex={currentIndex} duplicateCards={duplicateCards} /> : null}
            {doubleCard ? <DoubleCard cardKey={cardKey} currentIndex={currentIndex} duplicateCards={duplicateCards} /> : null}
            {tripleCard ? <TripleCard cardKey={cardKey} currentIndex={currentIndex} duplicateCards={duplicateCards} cardLength={cardLength} /> : null}


            <div className='my-2'>
                <div className='mx-5' >
                    </div>
            </div>
        </div>
    )
}

export default TestCards






