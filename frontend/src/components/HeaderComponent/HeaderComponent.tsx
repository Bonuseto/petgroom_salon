import React, { useEffect, useRef, useState } from 'react';
import classes from './HeaderComponent.module.css';
import previewVideo from './preview.mp4';
import previewSnapshotVideo from './previewSnapshot.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function HeaderComponent (): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  useEffect(() => {
    const handleLanguageChange = (): void => {
      setCurrentLang(i18n.language);
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement != null) {
      videoElement.addEventListener('error', (e) => {
        console.error('Video error:', e);
      });

      videoElement.addEventListener('loadeddata', () => {
        videoElement.play().catch((err) => {
          console.warn('Auto-play was prevented:', err);
        });
      });
    }
  }, []);

  return (
    <header className={classes.headerContainer}>
      <div className={classes.heroBackground}>
        <div className={classes.container}>
          <div className={classes.headerElements}>
            <div className={classes.headerContent}>
              <h1 className={classes.headerSecondText}>
                {t('header.trustedServices')}
              </h1>
              <div className={classes.titleContainer}>
                {currentLang === 'pl'
                  ? (
                  <h2
                    className={`${classes.headerMainText} ${classes.polishText}`}
                  >
                    Pielęgnacja zwierząt{' '}
                    <span
                      className={`${classes.withHeart} ${classes.polishText}`}
                    >
                      z sercem
                    </span>
                  </h2>
                    )
                  : (
                  <h2 className={classes.headerMainText}>
                    {t('header.petGrooming')}&nbsp;
                    <span className={classes.withHeart}>
                      {t('header.withHeart')}
                    </span>
                  </h2>
                    )}
                <p className={classes.headerSecondText}>
                  {t('header.bringingBest')}
                </p>
              </div>
              <div className={classes.headerButtonGroup}>
                <Link className={classes.primaryButton} to="/appointments">
                  {t('header.bookAppointment')}
                </Link>
              </div>
            </div>
            <div className={classes.headerImageWrapper}>
              <div className={classes.shapeBgElement}></div>
              <div className={classes.shapeImageGraphic}>
                <div className={classes.shapeImage}>
                  <video
                    ref={videoRef}
                    muted
                    loop
                    className={classes.shapeBgVideo}
                    poster={previewSnapshotVideo}
                    preload="auto"
                    playsInline
                    autoPlay
                  >
                    <source src={previewVideo} type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderComponent;
