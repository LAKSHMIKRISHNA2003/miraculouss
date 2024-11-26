import React from 'react';



function MainImg() {
  return (
    <div>
      <div className="mb-5 image-section">
        <div className="image-container text-center">
          {/* Title Inside the Image Section */}
          <h1 className="title-text mb-4">WHERE STYLE MEETS PERFECTION</h1>

          {/* Bullet Points Displayed Side by Side */}
          <div className="bullet-points d-flex justify-content-center">
            <span className="mx-3">• GROOMING</span>
            <span className="mx-3">• HAIR COLOR</span>
            <span className="mx-3">• FACIAL</span>
            <span className="mx-3">• HAIR CARE</span>
          </div>

          {/* Button Section */}
          <div className="btn schebton mt-5">CONTACT US</div>
        

        </div>
      </div>

      {/* Horizontal Divider */}
      <hr className="mx-5 mt-5 mb-3" />
    </div>
  );
}

export default MainImg;
