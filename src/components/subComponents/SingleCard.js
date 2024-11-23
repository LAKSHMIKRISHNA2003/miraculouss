import React from 'react'
import { motion } from 'framer-motion';

function SingleCard({cardKey, currentIndex, duplicateCards}) {
  return (
    <div>
        <div className="card-slider" style={{ overflow: 'hidden', width: '100%' }}>
                <motion.div
                    key={cardKey}
                    className=" cards-container d-flex "
                    animate={{ x: -currentIndex * 100 + '%' }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    style={{ display: 'flex' }} // Ensure width covers all cards
                // onAnimationComplete={handleAnimationComplete}
                >
                    {duplicateCards.map((duplicateCards) => (
                        <div key={duplicateCards.id} className="holder" style={{ minWidth: "100%" }}>
                            <div className="card h-100 mx-3">
                                <div className="card-header">
                                    <div>
                                        <img className="card-image greyscale rounded-circle" src={duplicateCards.image} alt="" />
                                    </div>
                                    <b>{duplicateCards.title}</b>
                                </div>
                                <div className="card-body">
                                    {duplicateCards.description}
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div> 
    </div>
  )
}

export default SingleCard