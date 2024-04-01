import React, { type ReactElement } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import LanguageSwitch from '../LanguageSwitch/LanguageSwitch';
import i18n from '../../i18n';
import { useState } from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Props {
  window?: () => Window
}

const drawerWidth = 240;

const salonName = 'BEST DOG STUDIO';
// const LocationMap: React.FC = (): ReactElement => {
// : React.FC = (): ReactElement
const DrawerAppBar: React.FC = (props: Props): ReactElement => {
  const { t } = useTranslation();

  const navItems = [
    { text: `${t('aboutUs')}`, id: 'aboutUsId' },
    { text: `${t('services')}`, id: 'servicesId' },
    { text: `${t('prices')}`, id: 'pricesId' },
    { text: `${t('reviews')}`, id: 'reviewsId' },
    { text: `${t('map')}`, id: 'howToFindId' }];

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = (): void => {
    setMobileOpen((prevState) => !prevState);
  };

  const scrollTo = (id: string): void => {
    const element = document.getElementById(id);
    if (element != null) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        { salonName }
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.text}
            onClick={() => { scrollTo(item.id); }}
            disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>('en');

  const handleLanguageSelect = (language: string): void => {
    setSelectedLanguage(language);
    void i18n.changeLanguage(language);
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'flex-end', // Align items to the right
      p: 1, // Padding around the container for some space
      mb: '49px'
    }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: '#0ABAB5' }}>
        <Toolbar>
          <LanguageSwitch
            icon={require('./globe.png')}
            onSelectLanguage={handleLanguageSelect}
          />
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }, marginLeft: 'auto' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            { salonName }
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                sx={{ color: '#fff' }}
                onClick={() => { scrollTo(item.id); }}>
                {item.text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          anchor="right"
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      {/* <Box id='MAINBOX' component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box> */}
    </Box>
  );
};

export default DrawerAppBar;
