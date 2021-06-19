import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Nav, NavItem, NavLink, Row } from 'shards-react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

const MainFooter = ({ contained, menuItems, copyright, t }) => (
  <>
    {window.globalTS.menu && window.globalTS.menu.footerm && window.globalTS.menu.footerm.items && window.globalTS.menu.footerm.items[0] &&
    <footer className="main-footer d-flex p-2 px-3 bg-white border-top">


      <Container fluid={contained}>
        {console.log('window.globalTS.menu.footerm', window.globalTS.menu.footerm)}
        <Row>

          <Nav>

            {window.globalTS.menu.footerm.items.map((item, idx) => (
              <NavItem key={idx}>
                {item.url && (
                  <NavLink tag={Link} to={item.url}>
                    {t(item.title)}
                  </NavLink>
                )}
                {item.link && (
                  <a className="nav-link" href={item.url}>
                    {t(item.title)}
                  </a>
                )}
                {item.action && (
                  <Button outline size="sm" theme="primary" onClick={item.action}>
                    {t(item.title)}
                  </Button>
                )}
              </NavItem>
            ))}
          </Nav>
          <span className="copyright ml-auto my-auto mr-2">{copyright}</span>
        </Row>
      </Container>


    </footer>
    }</>
);

MainFooter.propTypes = {
  /**
   * Whether the content is contained, or not.
   */
  contained: PropTypes.bool,
  /**
   * The menu items array.
   */
  menuItems: PropTypes.array,
  /**
   * The copyright info.
   */
  copyright: PropTypes.string,
};

MainFooter.defaultProps = {
  contained: false,
  copyright: '',
  menuItems: [],
};

export default withTranslation()(MainFooter);
