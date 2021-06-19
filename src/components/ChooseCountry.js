import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
} from 'shards-react';
import { withTranslation } from 'react-i18next';
import { CircularProgress } from '@material-ui/core';
import store from '../functions/store';
import { saveCountryPost, LevelCountriesData } from '@/functions';

class ChooseCountry extends React.Component {
  constructor(props) {
    super(props);
    let st = store.getState().store;
    this.state = {
      countries: st.countries,
      mainCountryList: st.mainCountryList,
      mainCountry: st.mainCountry,
      countryChoosed: st.countryChoosed || [],
    };
    if ((st.countries && st.countries.length === 0) || !st.countries)
      this.getCountries();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.mainCountry !== prevState.mainCountry) {
      console.log('mainCountry', this.state.mainCountry, prevState.mainCountry);
    }
    if (this.state.countries !== prevState.countries) {
      console.log('this countries', this.state.countries);
      console.log('prev countries', prevState.countries);
      saveCountryPost(this.state);
    }
  }

  getCountries(category = '') {
    let { countryChoosed, mainCountry, mainCountryList } = this.state;
    var { onMainCountry } = this.props;
    console.log('this.state.mainCountry', mainCountry);
    console.log('this.state.mainCountryList', mainCountryList);
    if (
      mainCountry &&
      mainCountry._id &&
      mainCountryList &&
      mainCountryList[0]
    ) {
    } else {
      console.log('getting countries...');
      let _id = category._id;
      if (category && category.back)
        if (category.parent) _id = category.parent;
        else {
          _id = '';
          delete category.back;
        }

      LevelCountriesData(_id).then((countries = []) => {
        let mainCountry = {};
        console.log('countries', countries);
        if (countries && !countries.length) {
          mainCountry = category;
          console.log('it is empty...', mainCountry);
        }

        if (category) {
          console.log('countryChoosed', countryChoosed);
          if (countryChoosed) countryChoosed.push(category);
          else countryChoosed = [category];

          //
          countries.reverse();
          countries[countries.length] = { ...category, back: true };
          countries.reverse();
          // }else if(this.state.clicked && this.state.clicked._id){
          //     console.log('add clicked...')
          //     CA[0]=this.state.clicked;
        }

        if (!mainCountryList) mainCountryList = [];

        mainCountryList.push(countries);
        console.log('arr.length', mainCountryList.length);

        let newCont = countries.map((cat) => {
          delete cat.loading;
          delete cat.disabled;
          return cat;
        });
        this.setState({
          countries: newCont,
          mainCountry: mainCountry,
          mainCountryList: mainCountryList,
          countryChoosed: countryChoosed,
        });
        saveCountryPost({
          countries: newCont,
          mainCountry: mainCountry,
          mainCountryList: mainCountryList,
          countryChoosed: countryChoosed,
        });
        if (mainCountry && mainCountry._id) onMainCountry(mainCountry);
      });
    }
  }

  popMainList() {
    let { mainCountryList, countryChoosed } = this.state;
    let { onMainCountry } = this.props;
    mainCountryList.pop();
    countryChoosed.pop();
    console.log('pop main list...', mainCountryList);

    let countries = mainCountryList[mainCountryList.length - 1];
    let newCont = countries.map((cat) => {
      delete cat.loading;
      delete cat.disabled;
      return cat;
    });
    onMainCountry({});
    saveCountryPost({
      mainCountryList: mainCountryList,
      countries: newCont,
      mainCountry: {},
      countryChoosed: countryChoosed,
    });
    this.setState({
      mainCountryList: mainCountryList,
      countries: newCont,
      mainCountry: {},
      countryChoosed: countryChoosed,
    });
  }

  render() {
    var { countries, mainCountry } = this.state;
    var { edit, t } = this.props;
    console.log('edit,mainCountry', edit, mainCountry, countries);
    let classs = '';
    if (edit) {
      classs = 'edit';
      // if(mainCountry!=countries)
      //   countries=mainCountry;
    }
    // if (mainCountry && mainCountry._id) {
    // }
    return (
      <Card small className={'mb-3 ' + classs}>
        <CardHeader className="border-bottom">
          <h6 className="m-0">{t('Change Country')}</h6>
        </CardHeader>
        <CardBody className="p-0">
          <ListGroup flush>
            {countries &&
              countries.map((category, idx) => (
                <ListGroupItem
                  className={'px-3 pb-2 hov dikhdikh ' + category['disabled']}
                  key={idx}
                  onClick={() => {
                    category.loading = true;
                    category.disabled = 'disabled';
                    if (category.back) {
                      this.popMainList();
                      this.setState(countries);
                    } else {
                      this.getCountries(category);
                      this.setState(countries);
                    }
                  }}>
                  <div className="thisIsC">
                    {category.back && category._id !== mainCountry._id && (
                      <span className={'icon' + t('Right')}>
                        <i className="material-icons">
                          keyboard_arrow_{t('right')}
                        </i>
                      </span>
                    )}
                    {category._id === mainCountry._id && (
                      <span className={'icon' + t('Right')}>
                        <i className="material-icons">clear</i>
                      </span>
                    )}
                    <span className="name">{category.name}</span>

                    {!category.back && !category.loading && (
                      <span className={'icon' + t('Left')}>
                        <i className="material-icons">
                          keyboard_arrow_{t('left')}
                        </i>
                      </span>
                    )}
                    {!category.back && category.loading && (
                      <span className={'icon' + t('Left')}>
                        <CircularProgress size={15} />
                      </span>
                    )}
                  </div>
                  {category.back && (
                    <div>
                      <hr className="dds" />
                    </div>
                  )}
                </ListGroupItem>
              ))}
          </ListGroup>
        </CardBody>
      </Card>
    );
  }
}

export default withTranslation()(ChooseCountry);
