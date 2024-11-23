import React from 'react'

function Testimony() {
    return (
        <div className='testimony-container '>
            <div className='h2 py-3 testimony-title '> WHAT OUR CUSTOMERS SAY</div>
            <hr className="divider" />
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <div className="card border-0 transparent">
                            <div className="card-header border-0 transparent"><div className=''></div> <div className='mt-3'><b>"Best haircut experience ever! The staff is incredibly skilled. Clean, welcoming environment with top-notch service. "</b></div> </div>
                            <div className="card-body">- James McNeal</div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card border-0 transparent">
                            <div className="card-header border-0 transparent"> <div className=''> </div> <div className="mt-3"><b>"Fantastic experience at Miraculous MVP Kutz & Salon! The barber was skilled, attentive, and gave me exactly the cut I wanted. "</b> </div>  </div>
                            <div className="card-body">- Sarah Johnson</div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Testimony