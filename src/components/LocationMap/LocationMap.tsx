/* eslint-disable */
import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import Button from '@mui/material/Button';
import DirectionIcon from '@mui/icons-material/Directions';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material';

interface Props {
  isLoaded: boolean;
}

const salonPosition = { lat: 51.083752, lng: 17.038425 };
const cityCenterPosition = { lat: 51.095876, lng: 17.032726 };

const DirectionButton = styled(Button)({
  backgroundColor: '#f10f8f',
  '&:hover': { backgroundColor: '#0ABA' },
});

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
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h6" component="div" sx={{ mb: 2 }}>
          {t('howToFindUs')}
        </Typography>
        <Box sx={{ height: '450px', mb: 2 }}>
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={cityCenterPosition}
            zoom={13}
          >
            <Marker position={salonPosition} />
          </GoogleMap>
        </Box>
        <DirectionButton variant="contained" startIcon={<DirectionIcon />} onClick={openGoogleMaps} sx={{ m: 1 }}>
          al. Armii Krajowej 6c/4, 50-541
        </DirectionButton>
      </Box>
    </Container>
  );
};

export default LocationMap;
