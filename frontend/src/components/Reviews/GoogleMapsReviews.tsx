import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";

const GoogleMapsReviews: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  interface Review {
    name: string;
    rating: number;
    text: string;
    profilePhotoUrl: string;
  }

  const createReview = (
    name: string,
    rating: number,
    textKey: string,
    profilePhotoUrl: string
  ): Review => ({
    name,
    rating,
    text: t(textKey),
    profilePhotoUrl,
  });

  const reviews = [
    createReview(
      "Magdalena Piprek",
      5,
      "reviewsSection.review1",
      "https://lh3.googleusercontent.com/a/ACg8ocKCRD30ljGYOtLW2SvQRaFjXZwA-XpFSMPqfUYqDfLROhT82A=w75-h75-p-rp-mo-ba3-br100"
    ),
    createReview(
      "Robert Ch.",
      4,
      "reviewsSection.review2",
      "https://lh3.googleusercontent.com/a-/ALV-UjU2bKrvJMq0iG4SRcA7ygMay9a_HB-R8vf6XsByAYn1ZtSbYS5e=w75-h75-p-rp-mo-ba5-br100"
    ),
    createReview(
      "Anna Klodowska",
      5,
      "reviewsSection.review3",
      "https://lh3.googleusercontent.com/a/ACg8ocKH7Zfyai7MyJ0XMGNWwC_iqmSXYSgCvbA-U56BVFtOkKUO=w75-h75-p-rp-mo-br100"
    ),
    createReview(
      "Pedro Augusto",
      5,
      "reviewsSection.review4",
      "https://lh3.googleusercontent.com/a/ACg8ocIbJmpgqJg4vbtD7-VwIker7Y-YVc1HRj4JDd6wVeSajhqeGg=w180-h180-p-rp-mo-ba2-br100"
    ),
    createReview(
      "Grzegorz Joniec",
      5,
      "reviewsSection.review5",
      "https://lh3.googleusercontent.com/a-/ALV-UjWgOfXI3kJaxZAVIFHbntukD-aTpMD7D_D_og3BPPQUhyNm3NY8=w75-h75-p-rp-mo-br100"
    ),
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    adaptiveHeight: true,
    swipe: true,
    cssEase: "linear",
    accessibility: true,
    focusOnSelect: false,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleImageError = (e: { currentTarget: HTMLImageElement }): void => {
    const target = e.currentTarget;
    const name = target.alt.replace(/'s profile$/, "");
    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&size=128&rounded=true`;
    target.onerror = null;
  };

  return (
    <section
      className="mx-auto max-w-6xl py-8"
      aria-label="Customer Reviews"
      id="reviewsId"
    >
      <h2 className="mb-8 text-center text-3xl">{t("reviews")}</h2>
      <div className="px-4 md:px-8">
        <Slider {...sliderSettings}>
          {reviews.map((review, index) => (
            <div
              key={index}
              className="h-auto p-2.5"
              role="group"
              aria-label={`Review ${index + 1} of ${reviews.length}`}
            >
              <div className="mx-auto flex h-full max-w-sm flex-col items-center rounded-lg bg-white p-6 text-center shadow-md">
                <img
                  src={review.profilePhotoUrl}
                  alt={`${review.name}'s profile`}
                  className="mb-4 size-16 rounded-full object-cover"
                  loading="lazy"
                  onError={handleImageError}
                />
                <h3 className="mb-2 text-xl">{review.name}</h3>
                <div
                  className="mb-4"
                  aria-label={`Rating: ${review.rating} out of 5 stars`}
                >
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < review.rating ? "text-yellow-400" : "text-gray-300"
                      }
                      aria-hidden="true"
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-sm italic leading-relaxed">{review.text}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default GoogleMapsReviews;
