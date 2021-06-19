import React from 'react';
import clsx from 'clsx';
import { Container, Navbar } from 'shards-react';

import NavbarSearch from './NavbarSearch';
import NavbarNav from './NavbarNav';
import NavbarToggle from './NavbarToggle';

export default function MainNavbar({ layout, stickyTop = true, onChange }) {
  const classes = clsx('main-navbar', 'bg-white', stickyTop && 'sticky-top');

  return (
    <div className={classes}>
      <Container className="p-0">
        <Navbar type="light" className="align-items-stretch flex-md-nowrap p-0">
          {/*<NavbarSearch onChange={onChange} />*/}
          <NavbarNav />
          <NavbarToggle />
        </Navbar>
      </Container>
    </div>
  );
}
