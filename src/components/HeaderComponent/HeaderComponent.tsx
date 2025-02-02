import React from 'react';
import classes from './HeaderComponent.module.css'; // Import CSS module
import previewVideo from './preview.mp4';

function HeaderComponent (): JSX.Element {
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
                <a className={classes.button} href="/appointments">
                  Book appointment
                </a>
                <a className={classes.button} href="/dog-grooming">
                  Grooming services
                </a>
              </div>
            </div>
            <div className={classes.headerImageWrapper}>
              <div className="shape-image-graphic">
                <div className={classes.shapeImage}>
                  <video
                    muted
                    loop
                    className={classes.shapeBgVideo}
                    poster="https://cdn.prod.website-files.com/649972ec5905003f83dfde15/65c096691fc24121af14d1eb_upper-hound-home-poster.webp"
                    preload="none"
                    autoPlay
                    playsInline
                  >
                    <source
                      data-src="./preview.mp4"
                      src={previewVideo}
                      type="video/mp4"
                    />
                  </video>
                </div>
                {/* <img
                  src="https://cdn.prod.website-files.com/649972ec5905003f83dfde15/64a2b204575efcffe6fd477b_UpperHound_BG-element-01.svg"
                  loading="eager"
                  width="346"
                  height="401"
                  alt="Green undefined shape."
                  className={classes.shapeImageShape}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderComponent;
