import React from 'react';
// import ReactQuill from "react-quill";
import { Card, CardBody, FormCheckbox } from 'shards-react';
import { withTranslation } from 'react-i18next';
// import "react-quill/dist/quill.snow.css";
// import "../../assets/quill.css";
import { savePost } from '../../functions';

class VirtualProduct extends React.Component {
  constructor(props) {
    super(props);

    // if (add) {
    //   this.state = {
    //     title: '',
    //     description: ''
    //   };
    // } else {
    this.state = {
      checked: false,
    };
    // }
  }

  handleChange = () => {
    let { checked } = this.state;
    let { onVirtualProduct } = this.props;
    this.setState({
      checked: !checked,
    });

    if (!checked) {
      savePost({ virtual: true });
      onVirtualProduct(true);
    } else {
      savePost({ virtual: false });
      onVirtualProduct(false);
    }
  };

  render() {
    const { t } = this.props;
    let { checked } = this.state;

    return (
      <Card small className="mb-3">
        <CardBody>
          {/*<FormTextarea className="largeTezt" value={description}*/}
          {/*placeholder={t('enter post description...')} size="large" onChange={(e) => {*/}
          {/*this.handleChange({*/}
          {/*description: e.target.value*/}
          {/*})*/}
          {/*}}/>*/}
          <p>{t('is it a virtual product?')}</p>
          <FormCheckbox toggle checked={checked} onChange={this.handleChange}>
            <span>{t('activate virtual product')}</span>
          </FormCheckbox>
        </CardBody>
      </Card>
    );
  }
}

export default withTranslation()(VirtualProduct);
