import React from 'react'
import { Link } from 'react-router-dom'

function DoubleCard({ cardKey, currentIndex, duplicateCards }) {
    return (
        <div>
            <Link className="nostyle" to={"/Appointments"} >
            <div className="card-slider row" >
                {duplicateCards.map((duplicateCards) => (
                    <div key={duplicateCards.id} className="holder col-md-12 my-2" style={{ minWidth: "80%" }}>
                        <div className="card h-100 mx-3">
                            <div className='d-flex '>
                                <div>
                                    <img className="card-image greyscale " src={duplicateCards.image} alt="" />
                                </div>

                                <div className='d-flex flex-column mt-3 w-100'>
                                    <div className='w-100'>{duplicateCards.title.toUpperCase()}</div>
                                    <div className='w-100 desc mt-2 '> {duplicateCards.description} </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            </Link>


            {/* <div className="card-slider" style={{ overflow: 'hidden', width: '100%' }}>
                <motion.div
                    key={cardKey}
                    className=" cards-container d-flex "
                    animate={{ x: -currentIndex * 50 + '%' }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    style={{ display: 'flex' }} // Ensure width covers all cards
                // onAnimationComplete={handleAnimationComplete}
                >
                    {duplicateCards.map((duplicateCards) => (
                        <div key={duplicateCards.id} className="holder" style={{ minWidth: "50%" }}>
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
            </div> */}
        </div>
    )
}

export default DoubleCard