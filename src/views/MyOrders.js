import React from 'react';
import { Container, Row, Col, Card, CardBody } from 'shards-react';

import { withTranslation } from 'react-i18next';

import PageTitle from '@/components/common/PageTitle';
import Table from '@/components/table/DataTable';
import { getMyOrders } from '@/functions';

import { dateFormat } from '@/functions/utils';

class MyOrders extends React.Component {
  constructor(props) {
    super(props);
    const { t } = props;
    this.state = {
      data: [],
      redirect: false,
      newText: 'You did not created a post until now! please create one...',
      buttonText: 'add new post',
      headCells: [
        {
          id: 'orderNumber',
          numeric: false,
          disablePadding: true,
          label: t('order number'),
        },
        { id: 'sum', numeric: false, disablePadding: true, label: t('sum') },
        {
          id: 'status',
          numeric: false,
          disablePadding: true,
          label: t('status'),
        },
        {
          id: 'paymentStatus',
          numeric: false,
          disablePadding: true,
          label: t('payment status'),
        },

        // {id: 'views', numeric: false, disablePadding: true, label: t('Views count')},
        // {id: 'getContactData', numeric: false, disablePadding: true, label: t('click count')},
        {
          id: 'createdAt',
          numeric: false,
          disablePadding: true,
          label: t('created at'),
        },
        {
          id: 'updatedAt',
          numeric: false,
          disablePadding: true,
          label: t('updated at'),
        },
        // {
        //   id: 'actions', numeric: false, disablePadding: true, label: t('actions'), edit: true, editAction: function (_id) {
        //     ref.redirectTrue(_id);
        //   }
        // },
      ],
    };
    this.getMyOrdersF();
  }

  redirectTrue(_id) {
    // getMyPost(_id).then((data) => {
    //   console.log('set _id to edit:', data);
    //   savePost(data);
    this.props.history.push('/edit-new-post/' + _id);
    // this.setState({
    //   redirect: true
    // })
    // });
  }

  getMyOrdersF() {
    const { t } = this.props;
    getMyOrders().then((data) => {
      if (data && data.length > 0)
        data.map((post) => {
          if (post.createdAt) post.createdAt = dateFormat(post.createdAt);

          if (post.updatedAt) post.updatedAt = dateFormat(post.updatedAt);
          if (post && post['sum']) {
            post['sum'] =
              post['sum'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
              ' ' +
              t('Rial');
            // link['kind']=t('product');
          }
          if (post && post['status']) {
            switch (post['status']) {
              case 'processing':
                post['status'] = t('waiting to review');
                post['status_cl'] =
                  'bg-warning text-white text-center rounded p-3 iii';
                break;
              case 'published':
                post['status'] = t('confirmed');
                post['status_cl'] =
                  'bg-success text-white text-center rounded p-3 iii';
                break;
              case 'canceled':
                post['status'] = t('canceled');
                post['status_cl'] =
                  'bg-error text-white text-center rounded p-3 iii';
                break;
              case 'deleted':
                post['status'] = t('deleted');
                post['status_cl'] =
                  'bg-error text-white text-center rounded p-3 iii';
                break;
              default:
                break;
            }
          }
          if (post && post['paymentStatus']) {
            switch (post['paymentStatus']) {
              case 'paid':
                post['paymentStatus'] = t('successful');
                post['paymentStatus_cl'] =
                  'bg-success text-white text-center rounded p-3 iii';
                break;
              case 'notpaid':
                post['paymentStatus'] = t('not paid');
                post['paymentStatus_cl'] =
                  'bg-warning text-white text-center rounded p-3 iii';
                break;
              case 'unsuccessful':
                post['paymentStatus'] = t('unsuccessful');
                post['paymentStatus_cl'] =
                  'bg-error text-white text-center rounded p-3 iii';
                break;
              default:
                break;
            }
          }

          return 0;
        });
      this.setState({
        data: data,
      });
    });
  }

  render() {
    var { t } = this.props;
    var { data, headCells, newText, buttonText } = this.state;
    // if (redirect) {
    //   return <Redirect to='/add-new-post'/>;
    // } else {
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="12"
            title={t('my posts')}
            subtitle={t('user account')}
            className="text-sm-left"
          />
        </Row>

        {/* Default Light Table */}
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardBody className="p-0 pb-3">
                <Table
                  data={data}
                  headCells={headCells}
                  newText={newText}
                  buttonText={buttonText}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
    // }
  }
}

export default withTranslation()(MyOrders);
