/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from 'react';
import { Container, Row, Col, Card, CardBody, CardFooter } from 'shards-react';
import dataProvider from '../functions/dataProvider';
import PageTitle from '../components/common/PageTitle';
import { defaultImg } from '@/assets';
import { dateFormat } from '@/functions/utils';

class SavedPosts extends React.Component {
  constructor(props) {
    super(props);
    this.getData();
    this.state = {
      PostsListFour: [],
      noImage: defaultImg,
    };
  }

  getData() {
    dataProvider('GET_LIST', 'post', {
      pagination: {
        page: 1,
        perPage: 24,
      },
    }).then((s) => {
      console.log('d is', s['data']);
      this.setState({ PostsListFour: s['data'] });
    });
  }

  render() {
    const { PostsListFour, noImage } = this.state;

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="12"
            title="آگهی های نشان شده"
            subtitle="حساب کاربری"
            className="text-sm-left"
          />
        </Row>
        {/* Fourth Row of posts */}
        <Row>
          {PostsListFour.map((post, idx) => (
            <Col lg="3" md="6" sm="12" className="mb-4" key={idx}>
              <Card small className="card-post h-100">
                <div
                  className="card-post__image"
                  style={{
                    backgroundImage: `url('${
                      post.backgroundImage || noImage
                    }')`,
                  }}
                />
                <CardBody>
                  <h5 className="card-title">
                    <a className="text-fiord-blue" href="#">
                      {post.title}
                    </a>
                  </h5>
                  <p className="card-text">{post.body}</p>
                </CardBody>
                <CardFooter className="text-muted border-top py-3">
                  <span className="d-inline-block sd">
                    {/* {"در "} */}
                    <a className="text-fiord-blue" href={post.categoryUrl}>
                      {post.firstCategory.name}
                    </a>
                    <a className="text-fiord-blue left" href={post.updatedAt}>
                      {dateFormat(post.updatedAt)}
                    </a>{' '}
                  </span>
                </CardFooter>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default SavedPosts;
