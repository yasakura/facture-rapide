import React from 'react';
import moment from 'moment';
import {
  Button,
  ContentBlock,
  ContentBlockTitle,
  FormInput,
  FormLabel,
  List,
  ListItem,
  Page,
} from 'framework7-react';
import Pdf from './Pdf';
import Input from './Input';
import Select from './Select';
import defaultData from '../conf/default_data';

const IS_CUSTOMER = false;

function getLocalStorage() {
  return JSON.parse(localStorage.getItem('data')) || {};
}

export default class Form extends React.Component {
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
        <List>
          <ListItem link="/my-company/" title="Mon entreprise" />
        </List>

        <ContentBlockTitle>Facture</ContentBlockTitle>
        <List form>
          <ListItem>
            <FormLabel>Date</FormLabel>
            <Input
              name="invoiceDate"
              onChange={this.handleInputChange}
              type="date"
            />
          </ListItem>
          <ListItem>
            <FormLabel>Numéro</FormLabel>
            <Input
              defaultValue={data.invoiceNumber}
              name="invoiceNumber"
              onChange={this.handleInputChange}
            />
          </ListItem>
          <ListItem>
            <FormLabel>Objet</FormLabel>
            <Input
              defaultValue={data.invoiceObject}
              name="invoiceObject"
              onChange={this.handleInputChange}
            />
          </ListItem>
          {IS_CUSTOMER && (
            <ListItem>
              <FormLabel>Theme</FormLabel>
              <Select
                value={data.theme}
                name="theme"
                onChange={this.handleInputChange}
              >
                <option value="base">Base</option>
                <option value="openSans">OpenSans</option>
              </Select>
            </ListItem>
          )}
        </List>

        <ContentBlockTitle>Client</ContentBlockTitle>
        <List form>
          <ListItem>
            <FormLabel>Nom</FormLabel>
            <Input
              defaultValue={data.clientName}
              name="clientName"
              onChange={this.handleInputChange}
            />
          </ListItem>
          <ListItem>
            <FormLabel>Adresse</FormLabel>
            <Input
              defaultValue={data.clientAddress}
              name="clientAddress"
              onChange={this.handleInputChange}
            />
          </ListItem>
          <ListItem>
            <FormLabel>SIREN</FormLabel>
            <Input
              defaultValue={data.clientSIREN}
              name="clientSIREN"
              onChange={this.handleInputChange}
            />
          </ListItem>
          <ListItem>
            <FormLabel>TVA intra.</FormLabel>
            <Input
              defaultValue={data.clientVAT}
              name="clientVAT"
              onChange={this.handleInputChange}
            />
          </ListItem>
        </List>
        <ContentBlockTitle>Prestation</ContentBlockTitle>
        <List form>
          <ListItem>
            <FormLabel style={{ alignSelf: 'flex-start' }}>
              Description
            </FormLabel>
            <FormInput
              name="prestationType"
              onChange={this.handleInputChange}
              type="textarea"
              value={data.prestationType}
            />
          </ListItem>
          <ListItem>
            <FormLabel>Tarif/jour</FormLabel>
            <Input
              defaultValue={data.price}
              name="price"
              onChange={this.handleInputChange}
            />
          </ListItem>
          <ListItem>
            <FormLabel>Nb de jour</FormLabel>
            <Input
              defaultValue={data.numberDayOfWork}
              name="numberDayOfWork"
              placeholder="Nombre de jour travaillé"
              onChange={this.handleInputChange}
            />
          </ListItem>
          <ListItem>
            <FormLabel>Paiement</FormLabel>
            <Input
              name="paymentPeriod"
              placeholder="Date limite de paiement"
              onChange={this.handleInputChange}
              type="date"
            />
          </ListItem>
        </List>
        <ContentBlock>
          <Button big fill color="green" onClick={this.createPDF}>
            Créer la facture
          </Button>
        </ContentBlock>
      </Page>
    );
  }
}
