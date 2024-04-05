import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Review {
  author_name: string
  profile_photo_url: string
  rating: number
  text: string
}

interface GoogleMapsReviewsProps {
  placeId: string
  apiKey: string
}

const GoogleMapsReviews: React.FC<GoogleMapsReviewsProps> = ({ placeId, apiKey }) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const fetchReviews = async () => {
      try {
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const response = await fetch(`${proxyUrl}https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews&key=${apiKey}`);
        const data = await response.json();
        const reviewsData = data.result.reviews;
        const filteredReviews = reviewsData.filter((review: { rating: number }) => review.rating > 2);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setReviews(filteredReviews);
      } catch (error) {
        console.error('Error fetching reviews: ', error);
      }
    };

    void fetchReviews();
  }, [placeId, apiKey]);

  // Settings for the slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };

  return (
    <div>
      <h2>Reviews</h2>
      <Slider {...settings}>
        {reviews.map((review, index) => (
          <div key={index} style={{ padding: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src={review.profile_photo_url} alt="User" style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
              <p>{review.author_name}</p>
            </div>
            <div>
              {Array.from({ length: review.rating }, (_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <p style={{ textAlign: 'center' }}>{review.text}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default GoogleMapsReviews;
