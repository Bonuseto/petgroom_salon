/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Review {
  author_name: string;
  rating: number;
  text: string;
  profile_photo_url: string;
}

interface Props {
  isLoaded: boolean;
}

const GoogleMapsReviews: React.FC<Props> = ({ isLoaded }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const placeId = 'ChIJsTBPxPfCD0cRI_ThCFA8R_o';

  useEffect(() => {
    if (!isLoaded || !window.google) return;

    const service = new window.google.maps.places.PlacesService(document.createElement('div'));
    const request = { placeId, fields: ['reviews'] };

    service.getDetails(request, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && place?.reviews) {
        setReviews(
          place.reviews
            .filter(review => review.rating && review.rating > 2)
            .map(review => ({
              author_name: review.author_name,
              rating: review.rating || 0,
              text: review.text,
              profile_photo_url: review.profile_photo_url,
            }))
        );
      } else {
        console.error('Error fetching reviews:', status);
      }
    });
  }, [isLoaded]);

  if (!isLoaded) return <p>Loading Google Maps...</p>;

  return (
    <div>
      <h2>Reviews</h2>
      <Slider dots infinite speed={500} slidesToShow={3} slidesToScroll={3}>
        {reviews.map((review, index) => (
          <div key={index} style={{ padding: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img
                src={review.profile_photo_url}
                alt="User"
                style={{ width: '80px', height: '80px', borderRadius: '50%' }}
              />
              <p>{review.author_name}</p>
            </div>
            <div>{'★'.repeat(review.rating)}</div>
            <p style={{ textAlign: 'center' }}>{review.text}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default GoogleMapsReviews;
