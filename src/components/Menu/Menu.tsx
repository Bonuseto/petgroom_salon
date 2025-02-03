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
import { useTranslation } from 'react-i18next';

import logo from './logo.png';
import Button from '@mui/material/Button';

interface Props {
  window?: () => Window
}

const drawerWidth = 240;

const salonName = 'BEST GROOM STUDIO';
// const LocationMap: React.FC = (): ReactElement => {
// : React.FC = (): ReactElement
const DrawerAppBar: React.FC = (props: Props): ReactElement => {
  const { t } = useTranslation();

  const navItems = [
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
      <Box sx={{ my: 2 }}>
        <img src={logo} alt="Salon Logo" style={{ height: 60 }} />
      </Box>
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
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: '#0ABAB5' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <LanguageSwitch
            icon={require('./globe.png')}
            onSelectLanguage={handleLanguageSelect}
          />
          <Typography
            variant="h6"
            component="div"
            fontFamily={'JalalLTBold, sans-serif'}
            sx={{ flexGrow: 1, textAlign: 'center', paddingTop: '0.5rem' }}
          >
            {salonName}
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                sx={{ color: '#fff', fontFamily: 'CamptonBook' }}
                onClick={() => { scrollTo(item.id); }}>
                {item.text}
              </Button>
            ))}
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' }, marginLeft: 'auto' }}
          >
            <MenuIcon />
          </IconButton>
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
    </Box>
  );
};

export default DrawerAppBar;
