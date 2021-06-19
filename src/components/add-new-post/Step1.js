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
import { LevelCategoriesData, savePost } from '@/functions';
import store from '@/functions/store';

class Step1 extends React.Component {
  constructor(props) {
    super(props);
    const st = store.getState().store;
    this.state = {
      categories: st.categories,
      mainList: st.mainList,
      mainCategory: st.mainCategory,
      catChoosed: st.catChoosed || [],
    };
    if ((st.categories && st.categories.length === 0) || !st.categories)
      this.getCategories();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.mainCategory !== prevState.mainCategory) {
      console.log(
        'mainCategory',
        this.state.mainCategory,
        prevState.mainCategory
      );
    }
    if (this.state.categories !== prevState.categories) {
      console.log('this categories', this.state.categories);
      console.log('prev categories', prevState.categories);
      savePost({ mainCategory: this.state.mainCategory });
    }
  }

  getCategories(category = '') {
    let { catChoosed, mainCategory, mainList } = this.state;
    var { onMainCategory, onCatChoosed } = this.props;
    console.log('this.state.mainCategory', mainCategory);
    console.log('this.state.mainList', mainList);
    if (mainCategory && mainCategory._id && mainList && mainList[0]) {
    } else {
      console.log('getting categories...');
      let _id = category['_id'];
      if (category && category['back'])
        if (category['parent']) _id = category['parent'];
        else {
          _id = '';
          delete category['back'];
        }

      console.log('motherfucker id is:', _id);
      LevelCategoriesData(_id).then((categories) => {
        let mainCategory = {};
        if (categories && !categories.length) {
          mainCategory = category;
          console.log('it is empty...', mainCategory);
        }
        if (category) {
          if (catChoosed) {
            console.log('catChoosed', catChoosed);
            catChoosed.push(category);
          } else catChoosed = [category];

          //
          categories.reverse();
          categories[categories.length] = { ...category, back: true };
          categories.reverse();
        }

        if (!mainList) mainList = [];

        mainList.push(categories);

        let newCont = categories.map((cat) => {
          delete cat.loading;
          delete cat.disabled;
          return cat;
        });
        this.setState({
          categories: newCont,
          mainCategory: mainCategory,
          mainList: mainList,
          catChoosed: catChoosed,
        });
        savePost({
          categories: newCont,
          mainCategory: mainCategory,
          mainList: mainList,
          catChoosed: catChoosed,
        });
        if (mainCategory && mainCategory._id) {
          // alert('on main Category')
          onMainCategory(mainCategory);
          onCatChoosed(catChoosed);
        }
        // console.log(this.state.mainList);
      });
    }
  }

  popMainList() {
    let { mainList = [], catChoosed = [] } = this.state;
    let { onMainCategory = () => null, onCatChoosed = () => null } = this.props;
    mainList.pop();
    catChoosed.pop();
    console.log('pop main list...', mainList);

    let categories = mainList[mainList.length - 1];
    let newCat = categories.map((cat, i) => {
      delete cat.loading;
      delete cat.disabled;
      return cat;
    });
    onMainCategory({});
    onCatChoosed({});
    savePost({
      mainList: mainList,
      categories: newCat,
      mainCategory: {},
      catChoosed: catChoosed,
    });
    this.setState({
      mainList: mainList,
      categories: newCat,
      mainCategory: {},
      catChoosed: catChoosed,
    });
  }

  render() {
    var { categories, mainCategory } = this.state;
    var { t } = this.props;
    console.log('edit,mainCategory', mainCategory, categories);

    return (
      <Card small className="mb-3">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{t('categories')}</h6>
        </CardHeader>
        <CardBody className="p-0">
          <ListGroup flush>
            {categories &&
              categories.map((category, idx) => (
                <ListGroupItem
                  className={'px-3 pb-2 hov dikhdikh ' + category['disabled']}
                  key={idx}
                  onClick={() => {
                    categories[idx].loading = true;
                    categories[idx].disabled = 'disabled';
                    if (category.back) {
                      this.popMainList();
                      this.setState(categories);
                    } else {
                      this.getCategories(category);
                      this.setState(categories);
                    }
                  }}>
                  <div className="thisIsC">
                    {category.back && category._id !== mainCategory._id && (
                      <span className={'icon' + t('Right')}>
                        <i className="material-icons">
                          keyboard_arrow_{t('right')}
                        </i>
                      </span>
                    )}
                    {category._id === mainCategory._id && (
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

export default withTranslation()(Step1);
