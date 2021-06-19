import React from 'react';
import {
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput,
} from 'shards-react';
import { withTranslation } from 'react-i18next';

class NavbarSearch extends React.Component {
  constructor(props) {
    super(props);

    var url = new URL(window.location.href);
    var search = url.searchParams.get('search') || '';
    this.state = {
      search: search,
      t: false,
    };
  }

  render() {
    const { onChange, t } = this.props;

    if (this.state.t) {
      // const history = useHistory();
      // history.push("/?"+this.state.search);
    }
    return (
      <Form
        action="/"
        className="main-navbar__search w-100  d-md-flex d-lg-flex posab">
        <InputGroup seamless className="ml-3">
          <InputGroupAddon type="prepend">
            <InputGroupText>
              <i className="material-icons">search</i>
            </InputGroupText>
          </InputGroupAddon>
          <FormInput
            className="navbar-search"
            placeholder={t('search please...')}
            name="search"
            onChange={(e) => onChange(e.target.value)}
          />
        </InputGroup>
      </Form>
    );
  }
}

export default withTranslation()(NavbarSearch);
