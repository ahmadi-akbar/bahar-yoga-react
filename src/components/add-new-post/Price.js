import React from 'react';
import { Card, CardBody, FormInput } from 'shards-react';
import { withTranslation } from 'react-i18next';
import store from '@/functions/store';
import { savePost } from '@/functions';
import { PriceFormat } from '@/functions/utils';

class Price extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      price: store.getState().store.price || 1,
    };
  }

  handleState = (e) => {
    let price = e.target.value;
    this.setState({ price });
    savePost({ price });
  };

  render() {
    const { t } = this.props;
    const { price } = this.state;
    let d = PriceFormat(price) + ' ' + t('Rial');

    return (
      <Card small className="mb-3">
        <CardBody>
          <FormInput size="lg" className="mb-3 ertghfrd" value={d} readOnly />
          <FormInput
            size="lg"
            className="mb-3 priceField"
            placeholder={t('enter product price...')}
            value={price}
            type="number"
            pattern="\d*"
            onChange={this.handleState}
            min={0}
          />
        </CardBody>
      </Card>
    );
  }
}

export default withTranslation()(Price);
