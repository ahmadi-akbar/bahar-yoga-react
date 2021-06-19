import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'shards-react';

import MainNavbar from '@/components/layout/MainNavbar/MainNavbar';
import MainSidebar from '@/components/layout/MainSidebar/MainSidebar';
import MainHeader from '@/components/layout/MainHeader';
import MainFooter from '@/components/layout/MainFooter';

const DefaultLayout = ({ children, noNavbar, noFooter, onChange = () => null }) => {
  return (
    <Container fluid>
      <Row>
        <MainSidebar {...children.props} />

        <Col
          className="main-content p-0 pb-5"
          lg={{ size: 10, offset: 2 }}
          md={{ size: 9, offset: 3 }}
          sm="12"
          tag="main">
          {!noNavbar && <MainNavbar onChange={onChange} />}
          <MainHeader />
          {children}
          {!noFooter && <MainFooter/>}

        </Col>
      </Row>
    </Container>
  );
};

DefaultLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool,
};

DefaultLayout.defaultProps = {
  noNavbar: false,
  noFooter: false,
};

export default DefaultLayout;
