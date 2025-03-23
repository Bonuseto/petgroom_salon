/* eslint-disable */
import React from 'react';
import { GoogleMap } from '@react-google-maps/api';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';
import styles from './LocationMap.module.css';

interface Props {
  isLoaded: boolean;
}

const salonPosition = { lat: 51.083752, lng: 17.038425 };
const cityCenterPosition = { lat: 51.095876, lng: 17.032726 };
const MAP_ID = '30c8f8aa0ac1d97e';

const openGoogleMaps = () => {
  const url =
    'https://www.google.com/maps/place/BEST+GROOM+STUDIO+Nina+Vorona/@51.0836649,17.0377478,19z/data=!3m1!4b1!4m6!3m5!1s0x470fc2f7c44f30b1:0xfa473c5008e1f423!8m2!3d51.0836649!4d17.0383929!16s%2Fg%2F11f01qx71q?hl=ru-RU&entry=ttu';
  window.open(url, '_blank');
};

const LocationMap: React.FC<Props> = ({ isLoaded }) => {
  const { t } = useTranslation();

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <Container>
      <Box className={styles.mapSection}>
        <Typography variant="h6" component="div" className={styles.mapTitle}>
          {t('howToFindUs')}
        </Typography>
        <div className={styles.mapContainer}>
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={cityCenterPosition}
            zoom={13}
            options={{ mapId: MAP_ID } as google.maps.MapOptions}
            onLoad={(map) => {
              if (!google.maps.marker) {
                console.error('Marker library not loaded');
                return;
              }
              const marker = new google.maps.marker.AdvancedMarkerElement({
                position: salonPosition,
                map: map,
              });
            }}
          />
        </div>
        <button 
          onClick={openGoogleMaps} 
          className={styles.directionButton}
        >
          <span className={styles.directionIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-6l-2 3h-4l-2-3H2"/>
              <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
            </svg>
          </span>
          al. Armii Krajowej 6c/4, 50-541
        </button>
      </Box>
    </Container>
  );
};

export default LocationMap;