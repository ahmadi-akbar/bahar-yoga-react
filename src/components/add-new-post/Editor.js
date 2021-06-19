import React from 'react';
import { Card, CardBody, FormTextarea } from 'shards-react';
import { withTranslation } from 'react-i18next';

import store from '@/functions/store';
import { savePost } from '@/functions';

class Editor extends React.Component {
  constructor(props) {
    super(props);

    let st = store.getState().store;
    this.state = {
      description: st.description,
    };
  }

  handleChange = (e) => {
    let description = e.target.value;
    this.setState({ description });
    savePost({ description });
  };

  render() {
    const { t } = this.props;

    return (
      <Card small className="mb-3">
        <CardBody>
          <FormTextarea
            className="largeTezt"
            value={this.state.description}
            placeholder={t('enter post description...')}
            size="large"
            onChange={this.handleChange}
          />
        </CardBody>
      </Card>
    );
  }
}

export default withTranslation()(Editor);
