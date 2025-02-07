/* eslint-disable */
import React from 'react';
import classes from './HeaderComponent.module.css'; // Import CSS module
import previewVideo from './preview.mp4';
import { Link } from "react-router-dom";

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
