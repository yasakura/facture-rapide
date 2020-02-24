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
} from 'framework7-react';
import Pdf from './Pdf';
import defaultData from '../conf/default_data';

function getLocalStorage() {
  return JSON.parse(localStorage.getItem('data')) || {};
}

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.getFileName = this.getFileName.bind(this);
    this.selectTheme = this.selectTheme.bind(this);
    this.setDefaultData = this.setDefaultData.bind(this);
    this.createPDF = this.createPDF.bind(this);
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

  getFileName() {
    const invoiceNumber = this.state.data.invoiceNumber;
    return invoiceNumber ? `_${invoiceNumber}` : '';
  }

  createPDF() {
    if (window.cordova) {
      window.cordova.plugins.pdf.htmlToPDF({
        url: Pdf(getLocalStorage()),
        documentSize: 'A4',
        landscape: 'portrait',
        type: 'share',
        fileName: `Facture${this.getFileName()}.pdf`,
      });
    } else {
      Pdf(getLocalStorage());
    }
  }

  selectTheme(e) {
    this.setState({ theme: e.target.value });
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
    const data = getLocalStorage();
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
            type="text"
          />
          <ListInput
            defaultValue={data.numberDayOfWork}
            inlineLabel
            label="Nb de jour"
            name="numberDayOfWork"
            onChange={this.handleInputChange}
            placeholder="-"
            type="text"
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
          <Button big fill color="green" onClick={this.createPDF}>
            Créer la facture
          </Button>
        </Block>
      </Page>
    );
  }
}

export default Form;
