import React, { Suspense } from 'react';
import { withTranslation } from 'react-i18next';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink,
} from 'shards-react';
import { setCountry } from '../functions';
import store from './../functions/store';
import { Link } from 'react-router-dom';

class CountrySelector extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      country: store.getState().store.country,
    };
  }

  toggleUserActions = () => {
    // localstorage.getItem('token');
    this.setState({
      visible: !this.state.visible,
    });
  };

  changeCountry = (Country) => {
    setCountry(Country);
    this.setState({
      country: Country,
    });
    console.log('change language');
  };

  render() {
    const { t, i18n } = this.props;
    const { country } = this.state;
    console.log('country', country);
    console.log('i18n', i18n);
    return (
      <Suspense
        fallback={() => {
          console.log('gfdes');
        }}>
        <NavItem
          className={'ytrdf'}
          tag={Dropdown}
          caret
          toggle={this.toggleUserActions}>
          <DropdownToggle
            caret
            tag={NavLink}
            className="text-nowrap px-3 helldone">
            {!country && (
              <span className={'mr-2'}>
                <i className="material-icons ertyu">language</i>
                <span className="d-md-inline-block">{t('Change Country')}</span>
              </span>
            )}

            {country === 'ir' && (
              <span className={'mr-2'}>
                <img
                  className="mr-2 ertyu"
                  src={require('./../images/flags/ir.png')}
                  alt={t('Iran')}
                />
                <span className="d-md-inline-block">{t('Iran')}</span>
              </span>
            )}

            {country === 'tu' && (
              <span className={'mr-2'}>
                <img
                  className="mr-2 ertyu"
                  src={require('./../images/flags/tr.png')}
                  alt={t('Turkey')}
                />
                <span className="d-md-inline-block">{t('Turkey')}</span>
              </span>
            )}
          </DropdownToggle>

          <Collapse tag={DropdownMenu} right small open={this.state.visible}>
            <DropdownItem
              onClick={() => {
                this.changeCountry('');
              }}>
              {t('All Countries')}
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                this.changeCountry('ir');
              }}>
              <img
                className="mr-2"
                src={require('./../images/flags/ir.png')}
                alt={t('Iran')}
              />
              {t('Iran')}
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                this.changeCountry('tu');
              }}>
              <img
                className="mr-2"
                src={require('./../images/flags/tr.png')}
                alt={t('Turkey')}
              />
              {t('Turkey')}
            </DropdownItem>
            <Link to={'/choose-country'}>
              <DropdownItem
                className={'toptoptop'}
                onClick={() => {
                  // this.goToChooseCountry()
                }}>
                {t('Accurate location')}
              </DropdownItem>
            </Link>
          </Collapse>
        </NavItem>
      </Suspense>
    );
  }
}

export default withTranslation()(CountrySelector);
