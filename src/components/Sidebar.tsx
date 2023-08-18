import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from './Sidebar.module.css';

import templates from '../assets/icons/templates.svg';
import dashboard from '../assets/icons/dashboard.svg';
import settings from '../assets/icons/settings.svg';


const Sidebar: React.FC = () => {
  const location = useLocation();
  const isLinkActive = (linkPath: string) => {
      return location.pathname === linkPath;
    };

  return (
    <div className='h-screen w-min flex flex-col justify-center'>

      <div className="h-fit w-24 px-3 py-10 flex flex-col gap-11 rounded-tr-3xl rounded-br-3xl shadow-menu">
        
        <Link to="/templates" className={`${styles.container}
        ${isLinkActive('/templates') ? styles.current : ''}
        flex flex-col items-center gap-1 text-menu-title text-customGray`} >
          <img src={templates} alt="templates" className="w-9 h-9" />
          Templates
        </Link>

        <Link to="/" className={`${styles.container}
        ${isLinkActive('/') ? styles.current : ''}
        flex flex-col items-center gap-1 text-menu-title text-customGray`} >
          <img src={dashboard} alt="dashboard" className="w-9 h-9" />
          Dashboard
        </Link>

        <Link to="/setting" className={`${styles.container}
        ${isLinkActive('/setting') ? styles.current : ''}
        flex flex-col items-center gap-1 text-menu-title text-customGray`} >
          <img src={settings} alt="setting" className="w-9 h-9" />
          Setting
        </Link>

      </div>

    </div>
  );
};

export default Sidebar;
