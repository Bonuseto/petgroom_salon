import React from "react";
import { GoogleMap } from "@react-google-maps/api";
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import {
  Email,
  Phone,
  LocationOn,
  ContentCopySharp,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";

interface Props {
  isLoaded: boolean;
}

const salonPosition = { lat: 51.083752, lng: 17.038425 };
const MAP_ID = "30c8f8aa0ac1d97e";
const ADDRESS = "al. Armii Krajowej 6c/4 1 piętro, 50-541 Wrocław, Polska";
const GOOGLE_MAPS_URL = `https://www.google.com/maps/place/BEST+GROOM+STUDIO+Nina+Vorona/@${salonPosition.lat},${salonPosition.lng},19z/data=!3m1!4b1!4m6!3m5!1s0x470fc2f7c44f30b1:0xfa473c5008e1f423!8m2!3d51.0836649!4d17.0383929!16s%2Fg%2F11f01qx71q`;

const LocationMap: React.FC<Props> = ({ isLoaded }) => {
  const { t } = useTranslation();

  const actionButtons = [
    {
      id: "email",
      icon: <Email />,
      text: "team@bestgroomstudio.pl",
      href: "mailto:team@bestgroomstudio.pl",
    },
    {
      id: "phone",
      icon: <Phone />,
      text: "+48 574 516 116",
      href: "tel:+48574516116",
    },
    {
      id: "maps",
      icon: <LocationOn />,
      text: t("buttons.openGoogleMaps"),
      onClick: () => window.open(GOOGLE_MAPS_URL, "_blank"),
    },
  ];

  if (!isLoaded) {
    return <Typography>Loading map…</Typography>;
  }

  return (
    <Box component="section" sx={{ backgroundColor: "#fafafa", py: 8 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          {t("howToFindUs")}
        </Typography>

        <Grid container spacing={4} alignItems="stretch">
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                height: { xs: 300, md: "100%" },
              }}
            >
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={salonPosition}
                zoom={15}
                options={{ mapId: MAP_ID }}
                onLoad={(map: google.maps.Map) => {
                  const marker = new google.maps.marker.AdvancedMarkerElement({
                    position: salonPosition,
                    map,
                  });
                  void marker;
                }}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{ fontWeight: 600 }}
                >
                  BEST GROOM STUDIO
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                  }}
                >
                  <Typography sx={{ fontSize: "0.875rem" }}>
                    {ADDRESS}
                  </Typography>
                  <IconButton
                    onClick={() => {
                      navigator.clipboard.writeText(ADDRESS);
                    }}
                    size="small"
                    sx={{
                      color: "rgba(10, 186, 181, 0.9)",
                      "&:hover": { color: "text.primary" },
                    }}
                    title="Copy address"
                  >
                    <ContentCopySharp fontSize="small" />
                  </IconButton>
                </Box>

                {actionButtons.map((button) => (
                  <Button
                    key={button.id}
                    href={button.href}
                    onClick={button.onClick}
                    variant="contained"
                    startIcon={button.icon}
                    fullWidth
                    sx={{
                      backgroundColor: "rgba(10, 186, 181, 0.9)",
                      color: "white",
                      py: 1.5,
                      borderRadius: 7,
                      textTransform: "none",
                      fontSize: "1rem",
                      "&:hover": {
                        backgroundColor: "rgba(10, 186, 181, 1)",
                      },
                    }}
                  >
                    {button.text}
                  </Button>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LocationMap;
