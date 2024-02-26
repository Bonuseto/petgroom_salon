import React, { useState } from 'react';
import LanguageSwitch from '../LanguageSwitch/LanguageSwitch';
import classes from './Navbar.module.css'; // Import CSS module
import i18n from '../../i18n'; // Import i18n configuration

const Navbar: React.FC = () => {
   const [selectedLanguage, setSelectedLanguage] = useState<string | null>('en'); // Initialize with default language

  // const handleLanguageSelect = (language: string) => {
  //   setSelectedLanguage(language);
  //   i18n.changeLanguage(language); // Change the language using i18next
  // };

  return (
    <nav className={classes.navbar}>
      <div className={classes.left}>
        <div className={classes.language}>
          {/* <LanguageSwitch
            icon={require("./globe.png")}
            onSelectLanguage={handleLanguageSelect}
          /> */}
        </div>
      </div>
      <p className={classes.selectedLanguage}>{selectedLanguage}</p>

      <div className={classes.center}>
        <div className={classes.logo}>BEST GROOM STUDIO</div>
      </div>

      <div className={classes.right}>
        {/* Your other components */}
      </div>
      
      
    </nav>
  );
};

export default Navbar;
