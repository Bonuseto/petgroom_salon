import React from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styles from './LocationMap.module.css';

interface Props {
  isLoaded: boolean
}

const salonPosition = { lat: 51.083752, lng: 17.038425 };
const MAP_ID = '30c8f8aa0ac1d97e';
const ADDRESS = 'al. Armii Krajowej 6c/4 1 piętro, 50-541 Wrocław, Polska';

const openGoogleMaps = (): void => {
  window.open(
    'https://www.google.com/maps/place/BEST+GROOM+STUDIO+Nina+Vorona/@51.0836649,17.0377478,19z/data=!3m1!4b1!4m6!3m5!1s0x470fc2f7c44f30b1:0xfa473c5008e1f423!8m2!3d51.0836649!4d17.0383929!16s%2Fg%2F11f01qx71q',
    '_blank'
  );
};

const LocationMap: React.FC<Props> = ({ isLoaded }) => {
  const { t } = useTranslation();
  const copyAddress = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(ADDRESS);
    } catch {
    }
  };

  if (!isLoaded) {
    return <Typography>Loading map…</Typography>;
  }

  return (
    <Box component="section" sx={{ backgroundColor: '#fafafa', py: 8 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          {t('howToFindUs')}
        </Typography>

        <Grid container spacing={4} alignItems="stretch">
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
                height: { xs: 300, md: '100%' }
              }}
            >
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={salonPosition}
                zoom={15}
                options={{ mapId: MAP_ID }}
                onLoad={(map: google.maps.Map) => {
                  const marker = new google.maps.marker.AdvancedMarkerElement({
                    position: salonPosition,
                    map
                  });
                  void marker;
                }}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
              <div className={styles.contactDetails}>
                <Typography variant="h6" component="strong">
                  BEST GROOM STUDIO
                </Typography>

                <div className={styles.addressWrapper}>
                  <Typography variant="body2" className={styles.address}>
                    {ADDRESS}
                  </Typography>
                  <button
                    type="button"
                    onClick={() => { void copyAddress(); }}
                    className={styles.copyBtn}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                      className={styles.copyIcon}
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  </button>
                </div>

                <a
                  href="mailto:team@bestgroomstudio.pl"
                  className={styles.actionButton}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                    className={styles.directionIcon}
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  team@bestgroomstudio.pl
                </a>

                <a href="tel:+48574516116" className={styles.actionButton}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                    className={styles.directionIcon}
                  >
                    <path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3 5.18A2 2 0 0 1 5 3h4.09a1 1 0 0 1 1 .75l1.12 4.45a1 1 0 0 1-.29.95l-2.2 2.2a16 16 0 0 0 6.36 6.36l2.2-2.2a1 1 0 0 1 .95-.29l4.45 1.12a1 1 0 0 1 .75 1z" />
                  </svg>
                  +48 574 516 116
                </a>

                <button
                  type="button"
                  onClick={openGoogleMaps}
                  className={styles.actionButton}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                    className={styles.directionIcon}
                  >
                    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {t('buttons.openGoogleMaps')}
                </button>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LocationMap;
