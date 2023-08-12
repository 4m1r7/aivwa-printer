import React, { ReactNode } from 'react';

import Sidebar from './Sidebar';
import AivwaLogo from '../assets/icons/aivwa-logo.svg';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-11/12 h-screen p-0 px-4">{children}</div>
      <div className='absolute bottom-0 w-full flex justify-center'>
        <img src={AivwaLogo} alt="Icon 1" className="w-24 h-14" />
      </div>
    </div>
  );
};

export default Layout;
