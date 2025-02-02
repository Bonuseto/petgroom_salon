/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Review {
  author_name: string
  rating: number
  text: string
  profile_photo_url: string
}

interface PlaceReview {
  author_name: string
  rating?: number
  text: string
  profile_photo_url: string
}

const GoogleMapsReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    function fetchReviews () {
      const placeId = 'ChIJsTBPxPfCD0cRI_ThCFA8R_o'; // Replace with your place ID
      const apiKey = process.env.REACT_APP_API_KEY; // Replace with your Google API key
      const request = {
        placeId,
        fields: ['reviews']
      };

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.defer = true;
      script.onload = () => {
        const service = new google.maps.places.PlacesService(document.createElement('div'));
        service.getDetails(request, (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && place && place.reviews) {
            const formattedReviews: Review[] = place.reviews
              .filter((review: PlaceReview) => review.rating && review.rating > 2) // Filter reviews with rating greater than 2
              .map((review: PlaceReview) => ({
                author_name: review.author_name,
                rating: review.rating || 0,
                text: review.text,
                profile_photo_url: review.profile_photo_url
              }));
            setReviews(formattedReviews);
          } else {
            console.error('Error fetching reviews:', status);
          }
        });
      };
      document.body.appendChild(script);
    }

    fetchReviews();
  }, []);

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
                <span style={{ color: '#FBBC04' }} key={i}>★</span>
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
