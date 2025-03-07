import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './GoogleMapsReviews.module.css'; // Import separate CSS file

interface Review {
  author_name: string
  rating: number
  text: string
  profile_photo_url: string
}

interface Props {
  isLoaded: boolean
}

const GoogleMapsReviews: React.FC<Props> = ({ isLoaded }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const placeId = 'ChIJsTBPxPfCD0cRI_ThCFA8R_o';

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!isLoaded || !window.google) return;

    const service = new window.google.maps.places.PlacesService(document.createElement('div'));
    const request = { placeId, fields: ['reviews'] };

    service.getDetails(request, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && ((place?.reviews) != null)) {
        setReviews(
          place.reviews
            .filter(review => (review.rating != null) && review.rating > 2)
            .map(review => ({
              author_name: typeof review.author_name === 'string' ? review.author_name : 'Anonymous',
              // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
              rating: review.rating ?? 0,
              // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
              text: review.text || '',
              // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
              profile_photo_url: review.profile_photo_url || 'https://via.placeholder.com/60'
            }))
        );
      } else {
        console.error('Error fetching reviews:', status);
      }
    });
  }, [isLoaded]);

  if (!isLoaded) return <p>Loading Google Maps...</p>;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const renderStars = (rating: number) => {
    const roundedRating = Math.round(rating);
    return (
      <div className="stars-container">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`star ${i < roundedRating ? 'filled' : ''}`}>★</span>
        ))}
      </div>
    );
  };

  return (
    <section className="reviews-section">
      <h2 className="reviews-heading">Reviews</h2>
      <div className="reviews-slider-container">
        <Slider {...sliderSettings}>
          {reviews.map((review, index) => (
            <div key={index} className="review-slide">
              <div className="review-card">
                <div className="review-content">
                  <img
                    src={review.profile_photo_url}
                    alt={`${review.author_name}'s profile`}
                    className="author-photo"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/60';
                    }}
                  />
                  <div className="review-text-content">
                    <h3 className="author-name">{review.author_name}</h3>
                    {renderStars(review.rating)}
                    <p className="review-text">{review.text}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default GoogleMapsReviews;
