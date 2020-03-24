import React, { Component } from 'react';
import moment from 'moment';
import {
  Block,
  BlockTitle,
  Button,
  List,
  ListInput,
  ListItem,
  Navbar,
  Page,
  Preloader,
} from 'framework7-react';
import Pdf from './Pdf';
import defaultData from '../conf/default_data';

function getLocalStorage() {
  return JSON.parse(localStorage.getItem('data')) || {};
}

function getFileName() {
  const data = { ...defaultData, ...getLocalStorage() };
  const invoiceNumber = data.invoiceNumber;
  return invoiceNumber !== '' ? `Facture_${invoiceNumber}.pdf` : 'Facture.pdf';
}

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buildInvoice: false,
    };

    this.buildInvoice = this.buildInvoice.bind(this);
    this.createPDF = this.createPDF.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.selectTheme = this.selectTheme.bind(this);
    this.setDefaultData = this.setDefaultData.bind(this);
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

  selectTheme(event) {
    this.setState({ theme: event.target.value });
  }

  buildInvoice() {
    this.setState((prevState) => ({
      buildInvoice: !prevState.buildInvoice,
    }));
    setTimeout(() => {
      this.createPDF();
    }, 1000);
  }

  createPDF() {
    const isMobileApp = !!window.cordova;
    if (isMobileApp) {
      const options = {
        documentSize: 'A4',
        type: 'share',
        fileName: getFileName(),
      };
      document.addEventListener('deviceready', () => {
        window.cordova.plugins.pdf
          .fromURL(Pdf({ ...defaultData, ...getLocalStorage() }), options)
          .then(() =>
            this.setState((prevState) => ({
              buildInvoice: !prevState.buildInvoice,
            }))
          );
        // .catch((error) => console.log('error', error));
      });
    } else {
      Pdf({ ...defaultData, ...getLocalStorage() });
      this.setState((prevState) => ({
        buildInvoice: !prevState.buildInvoice,
      }));
    }
  }

  handleInputChange(e) {
    const input = e.target;
    const valueInput =
      input.type === 'date'
        ? moment(new Date(input.value)).format('DD/MM/YYYY')
        : input.value;
    const data = { ...defaultData, ...getLocalStorage() };

    data[input.name] = valueInput;

    localStorage.setItem('data', JSON.stringify(data));
    this.setState({ data });
  }

  render() {
    const data = { ...defaultData, ...getLocalStorage() };
    return (
      <Page>
        <Navbar title="Facture rapide" sliding={false} />

        <List>
          <ListItem link="/my-company/" title="Mon entreprise" />
        </List>

        <BlockTitle>Facture</BlockTitle>
        <List inlineLabels>
          <ListInput
            label="Date"
            name="invoiceDate"
            onChange={this.handleInputChange}
            type="date"
          />
          <ListInput
            defaultValue={data.invoiceNumber}
            label="Numéro"
            name="invoiceNumber"
            onChange={this.handleInputChange}
            placeholder="-"
            type="text"
          />
          <ListInput
            defaultValue={data.invoiceObject}
            label="Objet"
            name="invoiceObject"
            onChange={this.handleInputChange}
            placeholder="-"
            type="text"
          />
        </List>

        <BlockTitle>Client</BlockTitle>
        <List inlineLabels>
          <ListInput
            defaultValue={data.clientName}
            label="Nom"
            name="clientName"
            onChange={this.handleInputChange}
            placeholder="-"
            type="text"
          />
          <ListInput
            defaultValue={data.clientAddress}
            label="Adresse"
            name="clientAddress"
            onChange={this.handleInputChange}
            placeholder="-"
            type="text"
          />
          <ListInput
            defaultValue={data.clientSIREN}
            label="SIREN"
            name="clientSIREN"
            onChange={this.handleInputChange}
            placeholder="-"
            type="text"
          />
          <ListInput
            defaultValue={data.clientVAT}
            label="TVA intra."
            name="clientVAT"
            onChange={this.handleInputChange}
            placeholder="-"
            type="text"
          />
        </List>

        <BlockTitle>Prestation</BlockTitle>
        <List>
          <ListInput
            defaultValue={data.prestationType}
            label="Description"
            name="prestationType"
            onChange={this.handleInputChange}
            type="textarea"
          />
          <ListInput
            defaultValue={data.price}
            inlineLabel
            label="Tarif/jour"
            name="price"
            onChange={this.handleInputChange}
            placeholder="-"
            type="number"
          />
          <ListInput
            defaultValue={data.numberDayOfWork}
            inlineLabel
            label="Nb de jour"
            name="numberDayOfWork"
            onChange={this.handleInputChange}
            placeholder="-"
            type="number"
          />
          <ListInput
            defaultValue={data.paymentPeriod}
            inlineLabel
            label="Paiement"
            name="paymentPeriod"
            onChange={this.handleInputChange}
            placeholder="-"
            type="date"
          />
        </List>

        <Block>
          <Button big fill color="green" onClick={this.buildInvoice}>
            {this.state.buildInvoice ? (
              <Preloader color="white" size={30} />
            ) : (
              'Créer la facture'
            )}
          </Button>
        </Block>
      </Page>
    );
  }
}

export default Form;
