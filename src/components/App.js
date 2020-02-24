// https://vectr.com/tmp/crdx4QfuE/a117CmEqx6-> icone

import React from 'react';
import { App, View, Statusbar } from 'framework7-react';
import Form from './Form';
import MyCompany from './MyCompany';

const f7params = {
  routes: [
    {
      path: '/my-company/',
      component: MyCompany,
    },
  ],
  // App Name
  name: 'Facture rapide',
  // App id
  // id: 'com.myapp.test',
  // ...
};

export default () => (
  <App params={f7params}>
    <Statusbar />

    <View main url="/">
      <Form />
    </View>
  </App>
);
