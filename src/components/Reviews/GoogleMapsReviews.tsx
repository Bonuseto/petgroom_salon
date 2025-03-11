import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import classes from './GoogleMapsReviews.module.css';

const GoogleMapsReviews: React.FC = (): JSX.Element => {
  const reviews = [
    {
      author_name: 'Sarah Johnson',
      rating: 5,
      text: 'Absolutely amazing service! My poodle has never looked so good. The groomers were gentle and professional.',
      profile_photo_url: `https://ui-avatars.com/api/?name=${encodeURIComponent('Sarah Johnson')}&size=128&rounded=true`
    },
    {
      author_name: 'Mike Peterson',
      rating: 4,
      text: 'Great grooming job on my labrador. The staff was friendly and the place was clean. Will come back!',
      profile_photo_url: `https://ui-avatars.com/api/?name=${encodeURIComponent('Mike Peterson')}&size=128&rounded=true`
    }
  ];

  const sliderSettings = {
    dots: true,
    infinite: reviews.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: reviews.length > 1,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    adaptiveHeight: true,
    swipe: true,
    cssEase: 'linear',
    accessibility: true,
    focusOnSelect: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, reviews.length),
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(2, reviews.length),
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

  return (
    <section className={classes.reviewsSection}>
      <h2 className={classes.reviewsHeading}>Reviews</h2>
      <div className={classes.reviewsSliderContainer }>
        <Slider {...sliderSettings}>
          {reviews.map((review, index) => (
            <div key={index} className={classes.reviewSlide}>
              <div className={classes.reviewCard}>
                <div className={classes.reviewContent}>
                  <img
                    src={review.profile_photo_url}
                    alt={`${review.author_name}'s profile`}
                    className={classes.authorPhoto}
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.author_name)}&size=128&rounded=true`;
                      e.currentTarget.onerror = null;
                    }}
                  />
                  <div>
                    <h3 className={classes.authorName}>{review.author_name}</h3>
                    <div className={classes.starsContainer}>
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i} className={classes.star}>
                          ★
                        </span>
                      ))}
                    </div>
                    <p className={classes.reviewText}>{review.text}</p>
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
