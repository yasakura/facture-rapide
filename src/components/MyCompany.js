import React, { Component } from 'react';
import {
  FormInput,
  FormLabel,
  ContentBlockTitle,
  List,
  ListItem,
  Page,
  Navbar,
} from 'framework7-react';
import Input from './Input';
import Checkbox from './Checkbox';
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

  handleCheckboxChange(e) {
    const input = e.target;
    const inputName = input.attributes['data-name'].value;
    const data = { ...defaultData, ...getLocalStorage() };
    const newCheckedStatus = !data[inputName];

    data[inputName] = newCheckedStatus;

    localStorage.setItem('data', JSON.stringify(data));
    this.setState({ data });
  }

  render() {
    const data = { ...defaultData, ...getLocalStorage() };
    return (
      <Page>
        <Navbar title="Facture rapide" backLink="Retour" />

        <ContentBlockTitle>Mon entreprise</ContentBlockTitle>
        <List form>
          <ListItem>
            <FormLabel>Nom</FormLabel>
            <Input
              defaultValue={data.companyName}
              name="companyName"
              onChange={this.handleInputChange}
            />
          </ListItem>
          <ListItem>
            <FormLabel>Adresse</FormLabel>
            <Input
              defaultValue={data.companyAddress}
              name="companyAddress"
              onChange={this.handleInputChange}
            />
          </ListItem>
          <ListItem>
            <FormLabel>Téléphone</FormLabel>
            <Input
              defaultValue={data.companyPhone}
              name="companyPhone"
              onChange={this.handleInputChange}
            />
          </ListItem>
          <ListItem>
            <FormLabel>Email</FormLabel>
            <Input
              defaultValue={data.companyMail}
              name="companyMail"
              onChange={this.handleInputChange}
              type="email"
            />
          </ListItem>
          <ListItem>
            <FormLabel>Statut social</FormLabel>
            <Input
              defaultValue={data.companyType}
              name="companyType"
              onChange={this.handleInputChange}
            />
          </ListItem>
          <ListItem>
            <FormLabel>Capital</FormLabel>
            <Input
              defaultValue={data.companyCapital}
              name="companyCapital"
              onChange={this.handleInputChange}
              type="number"
            />
          </ListItem>
          <ListItem>
            <FormLabel>SIREN</FormLabel>
            <Input
              defaultValue={data.companySiren}
              name="companySiren"
              onChange={this.handleInputChange}
            />
          </ListItem>
          <ListItem>
            <FormLabel>RCS</FormLabel>
            <Input
              defaultValue={data.companyRCS}
              name="companyRCS"
              onChange={this.handleInputChange}
            />
          </ListItem>
        </List>

        <ContentBlockTitle>TVA</ContentBlockTitle>
        <List form>
          <ListItem>
            <FormLabel>Actif</FormLabel>
            <Checkbox
              isChecked={data.companyVatActive}
              name="companyVatActive"
              onClick={this.handleCheckboxChange}
            />
          </ListItem>

          {this.state.data.companyVatActive === true && (
            <ListItem>
              <FormLabel>Taux</FormLabel>
              <Input
                defaultValue={data.companyVatRate}
                name="companyVatRate"
                onChange={this.handleInputChange}
                type="number"
              />
            </ListItem>
          )}

          {this.state.data.companyVatActive === true && (
            <ListItem>
              <FormLabel>Num. de TVA</FormLabel>
              <Input
                defaultValue={data.companyVatNumber}
                name="companyVatNumber"
                onChange={this.handleInputChange}
              />
            </ListItem>
          )}

          {this.state.data.companyVatActive === false && (
            <ListItem>
              <FormLabel style={{ alignSelf: 'flex-start' }}>
                Texte d&#039;exonération
              </FormLabel>
              <FormInput
                name="companyVatExemptionText"
                onChange={this.handleInputChange}
                type="textarea"
                value={data.companyVatExemptionText}
              />
            </ListItem>
          )}
        </List>
        <ContentBlockTitle>Coordonées bancaire</ContentBlockTitle>
        <List form>
          <ListItem>
            <FormLabel>Banque</FormLabel>
            <Input
              defaultValue={data.bankName}
              name="bankName"
              placeholder="Nom de la banque"
              onChange={this.handleInputChange}
            />
          </ListItem>
          <ListItem>
            <FormLabel>IBAN</FormLabel>
            <Input
              defaultValue={data.BankIBAN}
              name="BankIBAN"
              onChange={this.handleInputChange}
            />
          </ListItem>
          <ListItem>
            <FormLabel>BIC</FormLabel>
            <Input
              defaultValue={data.BankBIC}
              name="BankBIC"
              onChange={this.handleInputChange}
            />
          </ListItem>
        </List>
      </Page>
    );
  }
}

export default MyCompany;
