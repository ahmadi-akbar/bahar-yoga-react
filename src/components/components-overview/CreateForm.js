import React from 'react';

import {
  Button,
  Col,
  FormCheckbox,
  FormInput,
  FormSelect,
  FormTextarea,
} from 'shards-react';
import store from '@/functions/store';
import { withTranslation } from 'react-i18next';

class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    var { fields, id } = this.props;
    this.state = {
      fieldsx: fields,
      idx: id,
    };
  }

  changeEveryThing(fields, index, event) {
    fields[index].value = event.target.value;
    this.setState({ fields: fields });
  }

  render() {
    var { buttons, t, data, id, fields } = this.props;

    console.log('fields tx', fields);
    return [
      fields &&
        fields.map((field, index) => {
          if (field.type && field.type === 'input') {
            return (
              <Col
                key={index}
                sm={field.size.sm}
                lg={field.size.lg}
                className={'MGD ' + field.className}>
                <label htmlFor="feLastName">{field.label}</label>

                <FormInput
                  onChange={(event) => {
                    field.onChange(event.target.value);
                    this.changeEveryThing(fields, index, event);
                  }}
                  value={field.value}
                  placeholder={field.placeholder}
                  className="mb-2"
                />
              </Col>
            );
          }
          if (field.type && field.type === 'email') {
            return (
              <Col
                key={index}
                sm={field.size.sm}
                lg={field.size.lg}
                className={'MGD'}>
                <label htmlFor="feLastName">{field.label}</label>

                <FormInput
                  type="email"
                  onChange={(event) => {
                    field.onChange(event.target.value);
                    this.changeEveryThing(fields, index, event);
                  }}
                  value={field.value}
                  placeholder={field.placeholder}
                  className="mb-2 ltr"
                />
              </Col>
            );
          }
          if (field.type && field.type === 'button') {
            return (
              <Col
                key={index}
                sm={field.size.sm}
                lg={field.size.lg}
                className={'MGD'}>
                <Button
                  onClick={(event) => field.onClick(event.target.value)}
                  className="form-control mb-2 button-field">
                  {field.title}
                </Button>
              </Col>
            );
          }
          if (field.type && field.type === 'textarea') {
            return (
              <Col key={index} sm={field.size.sm} lg={field.size.lg}>
                <FormTextarea
                  onChange={(event) => {
                    field.onChange(event.target.value);
                    this.changeEveryThing(fields, index, event);
                  }}
                  value={field.value}
                  placeholder={field.placeholder}
                  className="mb-2"
                />
              </Col>
            );
          }
          if (field.type && field.type === 'title') {
            return (
              <Col key={index} sm={field.size.sm} lg={field.size.lg}>
                <span class="kjhghjk">{field.title}</span>
                <div>
                  <div
                    id={'defvgbnb'}
                    className="d-inline-block item-icon-wrapper ytrerty gv"
                    dangerouslySetInnerHTML={{ __html: field.html }}
                  />
                </div>
              </Col>
            );
          }
          if (field.type && field.type === 'number') {
            return (
              <Col key={index} sm={field.size.sm} lg={field.size.lg}>
                <FormInput
                  onChange={(event) => {
                    field.onChange(event.target.value);
                    this.changeEveryThing(fields, index, event);
                  }}
                  value={field.value}
                  placeholder={field.placeholder}
                  className="mb-2"
                />
              </Col>
            );
          }
          if (field.type && field.type === 'checkbox') {
            let allPostData = store.getState().store.allPostData || {};
            let thearr = allPostData[field.label];
            console.log('thearr', thearr);
            return (
              <Col key={index} sm={field.size.sm} lg={field.size.lg}>
                <label>{field.label}</label>
                {field.children &&
                  field.children.map((child) => {
                    let thebool;
                    if (allPostData[field.label] instanceof Array) {
                      thebool = allPostData[field.label].indexOf(child.value);
                      if (thebool > -1) {
                        thebool = true;
                      } else {
                        thebool = false;
                      }
                    }
                    return (
                      <FormCheckbox
                        defaultChecked={thebool}
                        onChange={(event) => {
                          // console.log('event.target.value',event.target.value);
                          field.onChange(child.value);
                          // this.changeEveryThing(fields, index, event);
                        }}
                        className="mb-2">
                        {child.name}
                      </FormCheckbox>
                    );
                  })}
              </Col>
            );
          }
          if (field.type && field.type === 'radioButton') {
            return (
              <Col key={index} sm={field.size.sm} lg={field.size.lg}>
                <FormInput
                  onChange={(event) => field.onChange(event.target.value)}
                  value={field.value}
                  placeholder={field.placeholder}
                  className="mb-2"
                />
              </Col>
            );
          }
          if (field.type && field.type === 'empty') {
            return (
              <Col
                key={index}
                className={'empty ' + field.className}
                sm={field.size.sm}
                lg={field.size.lg}></Col>
            );
          }
          if (field.type && field.type === 'selectOption') {
            return (
              <Col
                key={index}
                className={'select-col MGD'}
                sm={field.size.sm}
                lg={field.size.lg}>
                <label htmlFor="feLastName">{field.label}</label>

                <FormSelect
                  onChange={(event) => {
                    field.onChange(event.target.value);
                    this.changeEveryThing(fields, index, event);
                  }}>
                  <option value="0">{field.selectOptionText}</option>
                  {field.children.map((item, index) => {
                    return (
                      <option key={index} value={item.value}>
                        {item.name}
                      </option>
                    );
                  })}
                </FormSelect>
              </Col>
            );
          }
          if (field.type && field.type === 'selectOption-dynamic') {
            return (
              <Col
                key={index}
                className="select-col"
                sm={field.size.sm}
                lg={field.size.lg}>
                <FormSelect
                  onChange={(event) => field.onChange(event.target.value)}>
                  <option value="0">{field.selectOptionText}</option>
                  {data.map((item, index) => {
                    return (
                      <option key={index} value={item.value}>
                        {item.name}
                      </option>
                    );
                  })}
                </FormSelect>
                {/* <se onChange={(event)=> field.onChange( event.target.value)} value={field.value} placeholder={field.placeholder} className="mb-2" /> */}
              </Col>
            );
          }
          return 0;
        }),
      buttons &&
        buttons.map((button, index) => {
          return (
            <Col
              key={index}
              sm={button.size.sm}
              className={'buttons-parent-col'}
              lg={button.size.lg}>
              <Button
                onClick={(event) => button.onClick(event.target.value)}
                className={'button-small' + button.className}
                theme="success">
                {t(button.name)}
              </Button>
            </Col>
          );
        }),
    ];
  }
}

export default withTranslation()(CreateForm);
