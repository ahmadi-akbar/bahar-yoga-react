import React from 'react';
// import ReactQuill from "react-quill";
import { Card, CardBody, FormCheckbox } from 'shards-react';
import { withTranslation } from 'react-i18next';
// import "react-quill/dist/quill.snow.css";
// import "../../assets/quill.css";
import store from '@/functions/store';
import { savePost } from '@/functions';

class ActivateProduct extends React.Component {
  constructor(props) {
    super(props);

    let type = store.getState().store.type;

    this.state = {
      checked: type === 'product',
    };
  }

  handleChange = () => {
    let { checked } = this.state;
    let { onActivateProduct, reft } = this.props;

    this.setState({
      checked: !checked,
    });
    // console.log('p', this.state.checked);

    // const newState = {};
    // newState[product] = !this.state[product];
    // this.setState({...this.state, ...newState});
    // // this.setState(obj);
    if (!checked) {
      savePost({ type: 'product' });
      onActivateProduct('product', reft);
    } else {
      savePost({ type: 'normal' });
      onActivateProduct('normal', reft);
    }
  };

  render() {
    const { t } = this.props;
    let { checked } = this.state;

    return (
      <Card small className="mb-3">
        <CardBody>
          <p>{t('is it a product?')}</p>
          <FormCheckbox toggle checked={checked} onChange={this.handleChange}>
            <span>{t('Activate product mode & enable price options')}</span>
          </FormCheckbox>
        </CardBody>
      </Card>
    );
  }
}

export default withTranslation()(ActivateProduct);
