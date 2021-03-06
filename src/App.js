import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import routes from './routes';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-v4-rtl/dist/css/bootstrap-rtl.min.css';
import './assets/styles/shards-dashboards.1.1.0.min.css';
import './assets/styles/global.css';
import './assets/styles/rtl.css';
import './assets/styles/ltr.css';
import 'swiper/css/swiper.min.css';

import { CheckIos } from './IosStyles';
CheckIos();
console.log('window.location.origin', window.location.origin);
var u = '/';
if (window.globalTS.home_url) {
  u = window.globalTS.home_url.replace(window.location.origin, '');
}

const page404 = () => <h1>404</h1>;

export default withTranslation()(({ t }) => (
  <div className={t('languageDir')}>
    <Router basename={u}>
      <Switch>
        {routes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            exact={route.exact}
            component={(props) => (
              <route.layout>
                <route.component {...props} />
              </route.layout>
            )}
          />
        ))}
        <Route component={page404} />
      </Switch>
    </Router>
  </div>
));
