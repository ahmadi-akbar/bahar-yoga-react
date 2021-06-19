import React from 'react';
import { Card, CardBody, FormInput } from 'shards-react';
import { withTranslation } from 'react-i18next';

import store from '@/functions/store';
import { savePost } from '@/functions';

class Title extends React.Component {
  constructor(props) {
    super(props);
    let st = store.getState().store;
    this.state = {
      title: st.description,
    };
  }

  handleChange = (e) => {
    let title = e.target.value;
    this.setState({ title });
    savePost({ title });
  };

  render() {
    const { t } = this.props;
    return (
      <Card small className="mb-3">
        <CardBody>
          <FormInput
            size="lg"
            className="mb-3"
            placeholder={t('enter post title...')}
            value={this.state.title}
            onChange={this.handleChange}
          />
        </CardBody>
      </Card>
    );
  }
}

export default withTranslation()(Title);
