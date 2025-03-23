import React from 'react';
import styles from './WaveDivider.module.css';

interface WaveDividerProps {
  fillColor?: string
  backgroundColor?: string
}

const WaveDivider: React.FC<WaveDividerProps> = ({
  fillColor = '#f9f7f2',
  backgroundColor = 'white'
}) => {
  return (
    <div
      className={`${styles.waveDivider}`}
      style={{ backgroundColor }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className={styles.waveSvg}
      >
        <path
          d="M0,64L48,80C96,96,192,128,288,122.7C384,117,480,75,576,69.3C672,64,768,96,864,128C960,160,1056,192,1152,186.7C1248,181,1344,139,1392,117.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          fill={fillColor}
          className={styles.wavePath}
        ></path>
      </svg>
    </div>
  );
};

export default WaveDivider;
