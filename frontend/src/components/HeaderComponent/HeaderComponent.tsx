import React, { useEffect, useRef } from 'react';
import classes from './HeaderComponent.module.css';
import previewVideo from './preview.mp4';
import previewSnapshotVideo from './previewSnapshot.png';
import { Link } from 'react-router-dom';

function HeaderComponent (): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);

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
    <header>
      <div className={classes.paddingHeader}>
        <div className="container-large">
          <div className={classes.headerElements}>
            <div className={classes.headerContent}>
              <h1 className={classes.headerSecondText}>
                Trusted Grooming Services in Wroclaw
              </h1>
              <div>
                <h2 className={classes.headerMainText}>
                  Pet grooming <em>with&nbsp;heart</em>
                </h2>
                <p className={classes.headerSecondText}>
                  Bringing out the best in every Wroclaw pet.
                </p>
              </div>
              <div className={classes.headerButtonGroup}>
                <Link className={classes.button} to="/appointments">
                  Book appointment
                </Link>
                <Link className={classes.button} to="/dog-grooming">
                  Grooming services
                </Link>
              </div>
            </div>
            <div className={classes.headerImageWrapper}>
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
            <div className={classes.headerMobileButtonGroup}>
              <Link className={classes.button} to="/appointments">
                Book appointment
              </Link>
              <Link className={classes.button} to="/dog-grooming">
                Grooming services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderComponent;
