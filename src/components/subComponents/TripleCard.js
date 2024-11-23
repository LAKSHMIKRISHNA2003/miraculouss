import React from 'react';
import { Link } from 'react-router-dom';

function TripleCard({ cardKey, currentIndex, duplicateCards, cardLength }) {
    return (
        <div>
            <Link to={"/Appointments"} className="nostyle">
                <div className="card-slider row">
                    {duplicateCards.map((duplicateCards, index) => (
                        index + 1 < cardLength ? (
                            <div key={duplicateCards.id} className="holder col-md-6 my-2" style={{ minWidth: "10%" }}>
                                <div className="card h-100 mx-3" style={{ border: "none" }}>
                                    {/* Image on top */}
                                    <div className="card-header text-center">
                                        <img
                                            className="card-image greyscale img-fluid"
                                            src={duplicateCards.image}
                                            alt=""
                                        />
                                    </div>
                                    {/* Title and description */}
                                    <div className="card-body text-center">
                                        <div className="title">
                                            <b>{duplicateCards.title.toUpperCase()}</b>
                                        </div>
                                        <div className="desc mt-2">{duplicateCards.description}</div>
                                    </div>
                                    {/* Price and time */}
                                    <div
                                        className="card-footer d-flex justify-content-between p-3"
                                        style={{ backgroundColor: "black", color: "white" }}
                                    >
                                        <span className="price">{duplicateCards.price}</span>
                                        <span className="time">30 Min</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div key={duplicateCards.id} className="holder col-md-12 my-2" style={{ minWidth: "40%" }}>
                                <div className="card h-100 mx-auto w-50" style={{ border: "none" }}>
                                    {/* Image on top */}
                                    <div className="card-header text-center">
                                        <img
                                            className="card-image greyscale img-fluid"
                                            src={duplicateCards.image}
                                            alt=""
                                        />
                                    </div>
                                    {/* Title and description */}
                                    <div className="card-body text-center">
                                        <div className="title">
                                            <b>{duplicateCards.title.toUpperCase()}</b>
                                        </div>
                                        <div className="desc mt-2">{duplicateCards.description}</div>
                                    </div>
                                    {/* Price and time */}
                                    <div
                                        className="card-footer d-flex justify-content-between p-3"
                                        style={{ backgroundColor: "black", color: "white" }}
                                    >
                                        <span className="price">{duplicateCards.price}</span>
                                        <span className="time">30 Min</span>
                                    </div>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </Link>
        </div>
    );
}

export default TripleCard;
