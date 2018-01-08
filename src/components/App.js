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

const MainViews = (props, context) => (
  <Views>
    <View id="main-view" main url="/">
      {context.framework7AppContext.theme.ios ? (
        <Navbar title="Rapide facture" />
      ) : null}
      <Pages>
        <Page>
          <Form />
        </Page>
      </Pages>
    </View>
  </Views>
);

MainViews.contextTypes = {
  framework7AppContext: PropTypes.object,
};

const App = () => (
  <Framework7App themeType="ios">
    <Statusbar />
    <MainViews />
  </Framework7App>
);

export default App;
