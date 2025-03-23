/* eslint-disable */
import React, { type ReactElement, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import LanguageSwitch from '../LanguageSwitch/LanguageSwitch';
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';

import logo from './logo.png';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const salonName = 'BEST GROOM STUDIO';

const DrawerAppBar: React.FC = (props: Props): ReactElement => {
  const { t } = useTranslation();
  const { window: windowProp } = props;
  
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>('en');
  const [scrolled, setScrolled] = useState(false);
  
  const handleDrawerToggle = (): void => {
    setMobileOpen((prevState) => !prevState);
  };
  
  const scrollTo = (id: string): void => {
    const element = document.getElementById(id);
    if (element != null) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleLanguageSelect = (language: string): void => {
    setSelectedLanguage(language);
    void i18n.changeLanguage(language);
  };

  useEffect(() => {
    const handleScroll = (): void => {
      const offset = global.window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    global.window.addEventListener('scroll', handleScroll);
    return () => {
      global.window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const navItems = [
    { text: `${t('reviews')}`, id: 'reviewsId' },
    { text: `${t('map')}`, id: 'howToFindId' }
  ];
  
  const container = windowProp !== undefined ? () => windowProp().document.body : undefined;
  
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
      <Divider />
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar 
        position="fixed" 
        component="nav" 
        elevation={scrolled ? 2 : 0}
        sx={{ 
          backgroundColor: scrolled ? 'rgba(10, 186, 181, 0.9)' : 'rgba(249, 247, 242, 0.9)', 
          color: scrolled ? 'white' : '#333', 
          boxShadow: scrolled ? '0px 2px 4px rgba(0, 0, 0, 0.1)' : 'none',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(5px)',
          pb: 1,
          pt: 1
        }}
      >
        <Toolbar sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          maxWidth: 1200,
          width: '100%',
          margin: '0 auto'
        }}>
          {/* Left: Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center'}}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <img src={logo} alt="Salon Logo" style={{ height: 45 }} />
              <Box sx={{ 
                ml: 2, 
                fontFamily: 'Recoleta, serif',
                fontSize: '1.4rem',
                fontWeight: 600,
                color: scrolled ? 'white' : '#333',
                transition: 'color 0.3s ease'
              }}>
                {salonName}
              </Box>
            </Link>
          </Box>

          {/* Center: Nav items (desktop) */}
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' }, 
            justifyContent: 'center', 
            flex: 1,
            ml: 4 
          }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                sx={{ 
                  color: scrolled ? 'white' : '#333', 
                  mx: 1,
                  fontFamily: 'CamptonBook, sans-serif',
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  transition: 'color 0.3s ease'
                }}
                onClick={() => item.id ? scrollTo(item.id) : null}
              >
                {item.text}
              </Button>
            ))}
          </Box>

          {/* Right: Call-to-action button and menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            {/* Language Selector */}
            <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
              <LanguageSwitch
                icon={require('./globe.png')}
                onSelectLanguage={handleLanguageSelect}
              />
            </Box>
            
            {/* Desktop - Book now button */}
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Button
                component={Link}
                to="/appointments"
                sx={{
                  backgroundColor: scrolled ? '#088F8A' : '#0ABAB5',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '30px',
                  fontFamily: 'CamptonBook, sans-serif',
                  fontSize: '0.9rem',
                  textTransform: 'none',
                  transition: 'background-color 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#099A9A'
                  }
                }}
              >
                Book now
              </Button>
            </Box>
            
            {/* Mobile hamburger */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 2 }}>
              <IconButton 
                color="inherit" 
                aria-label="open drawer" 
                onClick={handleDrawerToggle}
                sx={{ color: scrolled ? 'white' : '#333', transition: 'color 0.3s ease' }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Empty toolbar to prevent content from hiding behind fixed AppBar */}
      <Toolbar />
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
            display: { xs: 'block', md: 'none' },
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