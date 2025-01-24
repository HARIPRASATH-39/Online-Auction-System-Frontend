import React from "react";
import "../css/Home.css"; // Import the CSS file for styling

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section text-center py-5">
        <div className="container">
          <h1 className="display-3 fw-bold text-white mb-4">
            AuctionSphere{" "}
            <span className="icon">
              <i class="fa-solid fa-gavel custom-icon"></i>
            </span>
          </h1>
          <h4 className="lead text-white">
            Your Gateway to Rare Finds and Exclusive Auctions
          </h4>
        </div>
      </div>

      {/* Why Choose AuctionSphere? Section */}
      <div className="why-choose-section py-5">
        <div className="container">
          <h2 className="text-center mb-4">Why Choose AuctionSphere?</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="feature-card p-4">
                <i className="bi bi-search feature-icon"></i>
                <h5 className="feature-title">Discover Rare Items</h5>
                <p className="feature-description">
                  Explore a curated selection of rare and exclusive items from
                  around the world.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-card p-4">
                <i className="bi bi-shield-lock feature-icon"></i>
                <h5 className="feature-title">Secure Bidding</h5>
                <p className="feature-description">
                  Enjoy a safe and transparent bidding process with our secure
                  platform.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-card p-4">
                <i className="bi bi-headset feature-icon"></i>
                <h5 className="feature-title">24/7 Support</h5>
                <p className="feature-description">
                  Our dedicated support team is always here to assist you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="about-section py-5">
        <div className="container">
          <h2 className="text-center mb-4">About AuctionSphere</h2>
          <p className="text-center about-text">
            AuctionSphere is a premier online auction platform dedicated to
            bringing you the rarest and most exclusive items from around the
            world. Whether you're a collector, enthusiast, or just looking for
            something unique, AuctionSphere is your gateway to unforgettable
            finds.
          </p>
        </div>
      </div>

      {/* Ads Section */}
      <div className="ads-section py-5">
        <div className="container">
          <h2 className="text-center mb-4">Featured Auctions</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="ad-card p-4">
                <img
                  src="https://www.levyjewelers.com/blog/upload/blog/1712690602_post_image.jpg"
                  alt="Auction Item 1"
                  className="img-fluid mb-3"
                />
                <h5 className="ad-title">Vintage Watch Collection</h5>
                <p className="ad-description">
                  Bid on rare vintage watches from the 1920s.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="ad-card p-4">
                <img
                  src="https://skyryedesign.com/wp-content/uploads/2016/01/The-Best-Vintage-Car-Wallpapers-22-Best-Vintage-Car-wv-aston-martin-ferarri.jpg"
                  alt="Auction Item 2"
                  className="img-fluid mb-3"
                />
                <h5 className="ad-title">Vintage Cars</h5>
                <p className="ad-description">
                  Exclusive Vintage Cars from trusted owners.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="ad-card p-4">
                <img
                  src="https://cdn10.bigcommerce.com/s-331n0h/product_images/uploaded_images/istock-467916272.jpg"
                  alt="Auction Item 3"
                  className="img-fluid mb-3"
                />
                <h5 className="ad-title">Antique Furniture</h5>
                <p className="ad-description">
                  Beautifully crafted furniture from the 1800s.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
    </div>
  );
};

export default Home;
