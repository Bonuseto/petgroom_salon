import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import classes from './GoogleMapsReviews.module.css';

const GoogleMapsReviews: React.FC = (): JSX.Element => {
  interface Review {
    name: string
    rating: number
    text: string
    profilePhotoUrl: string
  };

  const createReview = (name: string, rating: number, text: string, profilePhotoUrl: string): Review => ({
    name,
    rating,
    text,
    profilePhotoUrl
  });

  const reviews = [
    createReview('Magdalena Piprek', 5, 'Great as always. My dogs have been groomed here for years', 'https://lh3.googleusercontent.com/a/ACg8ocKCRD30ljGYOtLW2SvQRaFjXZwA-XpFSMPqfUYqDfLROhT82A=w75-h75-p-rp-mo-ba3-br100'),
    createReview('Robert Ch.', 4, "My wife is delighted with her pet's appearance after visiting this salon", 'https://lh3.googleusercontent.com/a-/ALV-UjU2bKrvJMq0iG4SRcA7ygMay9a_HB-R8vf6XsByAYn1ZtSbYS5e=w75-h75-p-rp-mo-ba5-br100'),
    createReview('Anna Klodowska', 5, 'Very good service, a beautiful and fragrant dog, I recommend it.', 'https://lh3.googleusercontent.com/a/ACg8ocKH7Zfyai7MyJ0XMGNWwC_iqmSXYSgCvbA-U56BVFtOkKUO=w75-h75-p-rp-mo-br100'),
    createReview('Pedro Augusto', 5, 'Great place, team and awesome service. Bonnie loves going there', 'https://lh3.googleusercontent.com/a/ACg8ocIbJmpgqJg4vbtD7-VwIker7Y-YVc1HRj4JDd6wVeSajhqeGg=w180-h180-p-rp-mo-ba2-br100'),
    createReview('Grzegorz Joniec', 5, 'The best dog hairdresser. I recommend it 100%.', 'https://lh3.googleusercontent.com/a-/ALV-UjWgOfXI3kJaxZAVIFHbntukD-aTpMD7D_D_og3BPPQUhyNm3NY8=w75-h75-p-rp-mo-br100')
  ];

  const sliderSettings = {
    dots: true,
    infinite: reviews.length > 1,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    adaptiveHeight: true,
    swipe: true,
    cssEase: 'linear',
    accessibility: true,
    focusOnSelect: false,
    responsive: [
      {
        breakpoint: 1920,
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

  const handleImageError = (e: { currentTarget: HTMLImageElement }): void => {
    const target = e.currentTarget;
    const name = target.alt.replace(/'s profile$/, '');
    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=128&rounded=true`;
    target.onerror = null;
  };

  return (
    <section className={classes.reviewsSection} aria-label="Customer Reviews">
      <h2 className={classes.reviewsHeading}>Reviews</h2>
      <div className={classes.reviewsSliderContainer}>
        <Slider {...sliderSettings}>
          {reviews.map((review, index) => (
            <div key={index} className={classes.reviewSlide} role="group" aria-label={`Review ${index + 1} of ${reviews.length}`}>
              <div className={classes.reviewCard}>
                <div className={classes.reviewContent}>
                  <img
                    src={review.profilePhotoUrl}
                    alt={`${review.name}'s profile`}
                    className={classes.authorPhoto}
                    loading="lazy"
                    onError={handleImageError}
                  />
                  <div>
                    <h3 className={classes.authorName}>{review.name}</h3>
                    <div className={classes.starsContainer} aria-label={`Rating: ${review.rating} out of 5 stars`}>
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={i < review.rating ? classes.star : classes.emptyStar}
                          aria-hidden="true"
                        >
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
