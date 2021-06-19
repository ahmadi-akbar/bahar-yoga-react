import React from 'react';
import {
  Card,
  CardBody,
  FormInput,
  FormTextarea,
  Row,
  Col,
  ButtonGroup,
  Button,
} from 'shards-react';
import { withTranslation } from 'react-i18next';

import store from '@/functions/store';
import { savePost } from '@/functions';
import { toast } from 'react-toastify';

class Step2 extends React.Component {
  constructor(props) {
    super(props);
    let st = store.getState().store;
    this.state = {
      title: st.title,
      description: st.description,
    };
  }

  render() {
    const { t } = this.props;
    return (
      <>
        <Row>
          <Col lg="12">
            <Card small className="mb-3">
              <CardBody>
                <FormInput
                  size="lg"
                  className="mb-3"
                  placeholder={t('enter post title...')}
                  value={this.state.title}
                  onChange={(e) => this.setState({ title: e.target.value })}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg="12">
            <Card small className="mb-3">
              <CardBody>
                <FormTextarea
                  className="largeTezt"
                  placeholder={t('enter post description...')}
                  size="large"
                  value={this.state.description}
                  onChange={(e) =>
                    this.setState({ description: e.target.value })
                  }
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg="12">
            <ButtonGroup className="mb-3 left">
              <Button
                theme="primary"
                onClick={() => {
                  const { title, description } = this.state;

                  if (!title) return toast.error(t('please enter title...'));

                  if (!description)
                    return toast.error(t('please enter description...'));

                  this.props.nextStep();

                  savePost({ title, description });
                }}>
                {t('next step')}
                <i className="material-icons">{'chevron_' + t('left')}</i>
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </>
    );
  }
}

export default withTranslation()(Step2);
