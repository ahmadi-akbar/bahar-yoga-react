import React from 'react';
import { toggleSidebar } from '@/functions';
import { useSelector } from 'react-redux';

export default function NavbarToggle(props) {
  const menu = useSelector((st) => !!st.store.menuVisible);

  const handleClick = () => toggleSidebar(menu);

  return (
    <nav className="nav">
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a
        href="#"
        onClick={handleClick}
        className="nav-link nav-link-icon toggle-sidebar d-sm-inline d-md-inline d-lg-none text-center">
        <i className="material-icons">&#xE5D2;</i>
      </a>
    </nav>
  );
}
