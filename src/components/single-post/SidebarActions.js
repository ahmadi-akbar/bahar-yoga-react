import React from 'react';
import { Card, CardBody, ListGroup, ListGroupItem, Button } from 'shards-react';
import { withTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import * as NT from '@/functions/NativeHelper';
import { getContactData, addBookmark } from '@/functions';

import { dFormat, PriceFormat } from '@/functions/utils';
class SidebarActions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      email: '',
    };
  }

  handleGetContactData = () => {
    const { _id } = this.props;
    getContactData(_id).then((d) => {
      this.setState(d.customer);
    });
  };

  bookmark = () => {
    const { t, _id } = this.props;
    addBookmark(_id).then((d) => {
      toast.success(t('successfully done!'));
    });
  };

  render() {
    const { phoneNumber, email } = this.state;
    const { t, updatedAt, countryChoosed, type, _id } = this.props;
    let { price } = this.props;
    if (price) price = PriceFormat(price);
    let ti = dFormat(updatedAt, t);

    return (
      <Card small className="mb-3">
        <CardBody className="p-0">
          <ListGroup flush>
            <ListGroupItem className="p-3">
              {ti && (
                <span className="d-flex mb-2">
                  <i className="material-icons mr-1">query_builder</i>
                  <strong className="mr-1">{ti}</strong>
                </span>
              )}
            </ListGroupItem>
            {countryChoosed && countryChoosed.length > 0 && (
              <ListGroupItem className="p-3">
                <span className="d-flex mb-2">
                  <i className="material-icons mr-1">language</i>
                  {countryChoosed.map((f, idx) => (
                    <strong key={idx} className="mr-1">
                      {f.name} <span>-</span>
                    </strong>
                  ))}
                </span>
              </ListGroupItem>
            )}

            <ListGroupItem className="p-3">
              {phoneNumber && (
                <span className="d-flex mb-2">
                  <i className="material-icons mr-1">phone_iphone</i>
                  <strong className="mr-1">{t('phone number')}:</strong>
                  <a className="ml-auto juytrty"  href={'tel:+' + phoneNumber}>
                    +{phoneNumber}
                  </a>
                </span>
              )}
              {email && (
                <span className="d-flex mb-2">
                  <i className="material-icons mr-1">email</i>
                  <strong className="mr-1">{t('email')}:</strong>
                  <a className="ml-auto" href={'mailto:' + email}>
                    {email}
                  </a>
                </span>
              )}
            </ListGroupItem>
            {type !== 'product' && (
              <ListGroupItem className="d-flex px-3 border-0">
                <Button
                  outline
                  theme="accent"
                  size="sm"
                  onClick={() => this.bookmark()}>
                  <i className="material-icons ddds">bookmark_border</i>
                  {t('bookmark')}
                </Button>
                <Button
                  theme="accent"
                  size="sm"
                  className="ml-auto"
                  onClick={this.handleGetContactData}>
                  <i className="material-icons ddds">phone</i>
                  {t('get contact')}
                </Button>
              </ListGroupItem>
            )}
            {price && (
              <ListGroupItem className="p-3 pdddd">
                <div className="sell_course">
                  {/*<span className="d-inline-block mb-2">*/}
                  {/*<i className="material-icons mr-1">money</i>*/}
                  <strong>{t('price') + ': '}</strong>
                  <p className="price">
                    <span className="psps">
                      {price}
                      <span className={'Rial'}>{t('Rial')}</span>
                    </span>
                  </p>
                  {/*</span>*/}
                </div>
              </ListGroupItem>
            )}
            {type === 'product' && price && (
              <ListGroupItem className="d-flex px-3 border-0">
                <Link
                  to={'/submit-order/' + _id}
                  className={'ml-auto ffgg btn btn-accent btn-lg'}>
                  {/*<Button theme="accent" size="lg" className="ml-auto ffgg" onClick={() => {*/}
                  {/*this.getContactData();*/}
                  {/*}}>*/}
                  <i className="material-icons ddds">shopping_basket</i>
                  {t('buy product')}
                  {/*</Button>*/}
                </Link>
                {/*<Button theme="accent" size="sm" className="ml-auto" onClick={() => {*/}
                {/*this.getContactData();*/}
                {/*}}>*/}
                {/*<i className="material-icons ddds">phone</i>{t('get contact')}*/}
                {/*</Button>*/}
              </ListGroupItem>
            )}
          </ListGroup>
        </CardBody>
      </Card>
    );
  }
}

export default withTranslation()(SidebarActions);
