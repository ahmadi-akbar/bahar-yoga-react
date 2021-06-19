import React from 'react';
import { Navbar, NavbarBrand } from 'shards-react';
import { withTranslation } from 'react-i18next';

import { toggleSidebar } from '@/functions';
import { useSelector } from 'react-redux';

// import Logo from '@/images/logo-256x512.png';

function SidebarMainNavbar({ t, hideLogoText = false }) {
  const menu = useSelector((st) => !!st.store.menuVisible);

  const handleToggleSidebar = () => toggleSidebar(menu);

  return (
    <div className="main-navbar">
      <Navbar
        className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0"
        type="light">
        <NavbarBrand
          className="w-100 mr-0"
          href="#"
          style={{ lineHeight: '25px' }}>

          <div className="d-table m-auto oiuytrt akbar-logo-parent1">
            {window.globalTS.theme_options.akbar_header_logo_image == "" && window.globalTS.blog_title && <span>{window.globalTS.blog_title}</span>}
            {window.globalTS.theme_options.akbar_header_logo_image != "" &&
            <img style={{ maxWidth: 116 }} src={window.globalTS.theme_options.akbar_header_logo_image}
                 alt={window.globalTS.blog_title}/>}
            {/*{!hideLogoText && (*/}
              {/*<span className=" d-md-inline ml-1 gfds">{window.globalTS.blog_title}</span>*/}
              {/*)}*/}

          </div>
        </NavbarBrand>
        {/* eslint-disable-next-line */}
        <a
          className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
          onClick={handleToggleSidebar}>
          <i className="material-icons">&#xE5C4;</i>
        </a>
      </Navbar>
    </div>
  );
}

export default withTranslation()(SidebarMainNavbar);
