import React, { type ReactElement } from 'react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import Button from '@mui/material/Button';
import DirectionIcon from '@mui/icons-material/Directions';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material';

const salonPosition = { lat: 51.083752458581884, lng: 17.038425091441333 };
const cityCenterPosition = { lat: 51.09587635516876, lng: 17.03272634796446 };

const DirectionButton = styled(Button)({
  backgroundColor: '#f10f8f',
  borderColor: '#0063cc',
  '&:hover': {
    backgroundColor: '#0ABA',
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
  }
});

const openGoogleMaps = (): void => {
  const url = 'https://www.google.com/maps/place/BEST+GROOM+STUDIO+Nina+Vorona/@51.0836649,17.0377478,19z/data=!3m1!4b1!4m6!3m5!1s0x470fc2f7c44f30b1:0xfa473c5008e1f423!8m2!3d51.0836649!4d17.0383929!16s%2Fg%2F11f01qx71q?hl=ru-RU&entry=ttu';
  window.open(url, '_blank');
};

const LocationMap: React.FC = (): ReactElement => {
  const { t } = useTranslation();
  return (
    <Container>
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h6" component="div" sx={{ mb: 2 }}>
            {t('howToFindUs')}
        </Typography>
        <Box sx={{ height: '450px', mb: 2 }}>
          <APIProvider apiKey={'YOUR_API_KEY'}>
            <Map
              defaultCenter={cityCenterPosition}
              defaultZoom={13}
              gestureHandling="greedy"
              draggableCursor="default"
              draggingCursor="move"
              mapId={'MapID'}
            >
              <AdvancedMarker position={salonPosition} />
            </Map>
          </APIProvider>
        </Box>
        <DirectionButton
          variant="contained"
          startIcon={<DirectionIcon />}
          onClick={openGoogleMaps}
          sx={{ m: 1 }}
        >
          al. Armii Krajowej 6c/4, 50-541
        </DirectionButton>
        </Box>
    </Container>
  );
};

export default LocationMap;
