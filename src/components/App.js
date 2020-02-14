// https://vectr.com/tmp/crdx4QfuE/a117CmEqx6-> icone

import React from 'react';
import PropTypes from 'prop-types';
import {
  Framework7App,
  Navbar,
  Page,
  Pages,
  Statusbar,
  View,
  Views,
} from 'framework7-react';
import Form from './Form';
import MyCompany from './MyCompany';

const MainViews = (props, context) => (
  <Views>
    <View id="main-view" dynamicNavbar main url="/">
      {context.framework7AppContext.theme.ios ? (
        <Navbar title="Facture rapide" />
      ) : null}
      <Pages>
        <Form />
      </Pages>
    </View>
  </Views>
);

MainViews.contextTypes = {
  framework7AppContext: PropTypes.object,
};

const App = () => (
  <Framework7App
    themeType="ios"
    routes={[
      {
        path: '/my-company/',
        component: MyCompany,
      },
    ]}
  >
    <Statusbar />
    <MainViews />
  </Framework7App>
);

export default App;
