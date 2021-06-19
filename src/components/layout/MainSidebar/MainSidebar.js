import React from 'react';
import clsx from 'clsx';
import { Col } from 'shards-react';

import SidebarMainNavbar from './SidebarMainNavbar';
import SidebarNavItems from './SidebarNavItems';
import { useSelector } from 'react-redux';

export const APP_VERSION = process.env.REACT_APP_VERSION_NUM;

export default function NavbarToggle(props) {
  const menuVisible = useSelector((st) => !!st.store.menuVisible);

  const classes = clsx('main-sidebar', 'px-0', 'col-12', menuVisible && 'open');

  return (
    <Col tag="aside" className={classes} lg={{ size: 2 }} md={{ size: 3 }}>
      <div className="version">Ver: {APP_VERSION}</div>
      <SidebarMainNavbar hideLogoText={props.hideLogoText} />

      <SidebarNavItems {...props} />
    </Col>
  );
}
