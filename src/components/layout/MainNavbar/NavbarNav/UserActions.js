import React from 'react';
import store from '@/functions/store';
import { NavLink as RouteNavLink } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { Dropdown, NavItem, NavLink } from 'shards-react';

class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      token: store.getState().store.token,
      phoneNumber: store.getState().store.phoneNumber,
    };
  }

  toggleUserActions = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  render() {
    const { t } = this.props;

    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        {/*<NavLink*/}
          {/*id="ClickOnMeHe"*/}
          {/*tag={RouteNavLink}*/}
          {/*to="/p/60964c8863eb362f624abad5/course%201"*/}
          {/*className="nav-link-icon text-center">*/}
          {/*<div className="nav-link-icon__wrapper sxdfg">*/}
            {/*{t('Start journey')}*/}
          {/*</div>*/}
        {/*</NavLink>*/}
      </NavItem>
    );
  }
}

export default withTranslation()(UserActions);
