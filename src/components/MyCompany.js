import React, { Component } from 'react';
import {
  BlockTitle,
  List,
  ListInput,
  ListItem,
  Navbar,
  Page,
  Toggle,
} from 'framework7-react';
import defaultData from '../conf/default_data';

function getLocalStorage() {
  return JSON.parse(localStorage.getItem('data')) || {};
}

class MyCompany extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  componentWillMount() {
    this.setDefaultData();
  }

  setDefaultData() {
    this.state.data = {
      ...defaultData,
      ...getLocalStorage(),
      ...this.state.data,
    };
  }

  handleInputChange(e) {
    const input = e.target;
    const data = { ...defaultData, ...getLocalStorage() };

    data[input.name] = input.value;

    localStorage.setItem('data', JSON.stringify(data));
    this.setState({ data });
  }

  handleCheckboxChange(status, name) {
    const data = { ...defaultData, ...getLocalStorage() };

    data[name] = status;

    localStorage.setItem('data', JSON.stringify(data));
    this.setState({ data });
  }

  render() {
    const data = { ...defaultData, ...getLocalStorage() };
    return (
      <Page>
        <Navbar title="Facture rapide" backLink="Retour" sliding={false} />

        <BlockTitle>Mon entreprise</BlockTitle>
        <List inlineLabels>
          <ListInput
            defaultValue={data.companyName}
            label="Nom"
            name="companyName"
            onChange={this.handleInputChange}
            placeholder="-"
            type="text"
          />
          <ListInput
            defaultValue={data.companyAddress}
            label="Adresse"
            name="companyAddress"
            onChange={this.handleInputChange}
            placeholder="-"
            type="text"
          />
          <ListInput
            defaultValue={data.companyPhone}
            label="Téléphone"
            name="companyPhone"
            onChange={this.handleInputChange}
            placeholder="-"
            type="number"
          />
          <ListInput
            defaultValue={data.companyMail}
            label="Email"
            name="companyMail"
            onChange={this.handleInputChange}
            placeholder="-"
            type="email"
          />
          <ListInput
            defaultValue={data.companyType}
            label="Statut social"
            name="companyType"
            onChange={this.handleInputChange}
            placeholder="-"
            type="text"
          />
          <ListInput
            defaultValue={data.companyCapital}
            label="Capital"
            name="companyCapital"
            onChange={this.handleInputChange}
            placeholder="-"
            type="number"
          />
          <ListInput
            defaultValue={data.companySiren}
            label="SIREN"
            name="companySiren"
            onChange={this.handleInputChange}
            placeholder="-"
            type="number"
          />
          <ListInput
            defaultValue={data.companyRCS}
            label="RCS"
            name="companyRCS"
            onChange={this.handleInputChange}
            placeholder="-"
            type="text"
          />
        </List>

        <BlockTitle>TVA</BlockTitle>
        <List>
          <ListItem>
            <span>Actif</span>
            <Toggle
              defaultChecked={data.companyVatActive}
              name="companyVatActive"
              onToggleChange={(status) =>
                this.handleCheckboxChange(status, 'companyVatActive')
              }
            />
          </ListItem>
          {this.state.data.companyVatActive === true && (
            <ListInput
              defaultValue={data.companyVatRate}
              inlineLabel
              label="Taux"
              name="companyVatRate"
              onChange={this.handleInputChange}
              placeholder="-"
              type="number"
            />
          )}
          {this.state.data.companyVatActive === true && (
            <ListInput
              defaultValue={data.companyVatNumber}
              inlineLabel
              label="Num. de TVA"
              name="companyVatNumber"
              onChange={this.handleInputChange}
              placeholder="-"
              type="text"
            />
          )}
          {this.state.data.companyVatActive === false && (
            <ListInput
              defaultValue={data.companyVatExemptionText}
              label="Texte d&#039;exonération"
              name="companyVatExemptionText"
              onChange={this.handleInputChange}
              type="textarea"
              inlineLabel={false}
            />
          )}
        </List>

        <BlockTitle>Coordonées bancaire</BlockTitle>
        <List inlineLabels>
          <ListInput
            defaultValue={data.bankName}
            label="Banque"
            name="bankName"
            onChange={this.handleInputChange}
            placeholder="-"
            type="text"
          />
          <ListInput
            defaultValue={data.BankIBAN}
            label="IBAN"
            name="BankIBAN"
            onChange={this.handleInputChange}
            placeholder="-"
            type="text"
          />
          <ListInput
            defaultValue={data.BankBIC}
            label="BIC"
            name="BankBIC"
            onChange={this.handleInputChange}
            placeholder="-"
            type="text"
          />
        </List>
      </Page>
    );
  }
}

export default MyCompany;
