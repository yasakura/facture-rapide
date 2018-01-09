import React from 'react';
import moment from 'moment';
import {
  FormLabel,
  ContentBlock,
  Button,
  ContentBlockTitle,
  List,
  ListItem,
} from 'framework7-react';
import Pdf from './Pdf';
import Input from './Input';
import Select from './Select';

const isCustomer = true;

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: JSON.parse(localStorage.getItem('data')) || {},
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.selectTheme = this.selectTheme.bind(this);
    this.setDefaultData = this.setDefaultData.bind(this);
    this.createPDF = this.createPDF.bind(this);
  }

  componentDidMount() {
    this.setDefaultData();
  }

  setDefaultData() {
    const data = this.state.data;

    const defaultData = {
      BankBIC: data.BankBIC || '-',
      BankIBAN: data.BankIBAN || '-',
      bankName: data.bankName || '-',
      clientAdress: data.clientAdress || '-',
      clientName: data.clientName || '-',
      clientSIREN: data.clientSIREN || '-',
      clientVAT: data.clientVAT || '-',
      companyAdress: data.companyAdress || '-',
      companyCapital: data.companyCapital || '-',
      companyMail: data.companyMail || '-',
      companyName: data.companyName || '-',
      companyPhone: data.companyPhone || '-',
      companySiren: data.companySiren || '-',
      companyType: data.companyType || '-',
      companyVatNumber: data.companyVatNumber || '-',
      invoiceDate: data.invoiceDate || '-',
      invoiceNumber: data.invoiceNumber || '-',
      invoiceObject: data.invoiceObject || '-',
      legalInfos: data.legalInfos || '-',
      numberDayOfWork: data.numberDayOfWork || 0,
      paymentPeriod: data.paymentPeriod || '-',
      prestationType1: data.prestationType1 || '-',
      prestationType2: data.prestationType2 || '',
      price: data.price || 0,
      theme: data.theme || 'base',
    };

    this.state.data = defaultData;
  }

  handleInputChange(e) {
    const input = e.target;
    const valueInput = input.type === 'date' ? moment(new Date(input.value)).format('DD/MM/YYYY') : input.value;
    const data = { ...this.state.data };

    data[input.name] = valueInput;

    localStorage.setItem('data', JSON.stringify(data));
    this.setState({ data });
  }

  selectTheme(e) {
    this.setState({ theme: e.target.value });
  }

  createPDF() {
    // alert(`PDF : ${JSON.stringify(this.state.data)}`);

    if (window.cordova) {
      window.cordova.plugins.pdf.htmlToPDF({
        url: Pdf(this.state.data),
        documentSize: 'A4',
        landscape: 'portrait',
        type: 'share',
        fileName: `Facture_${this.state.data.invoiceNumber}.pdf`,
      });
    } else {
      Pdf(this.state.data);
    }
  }

  render() {
    return (
      <div>
        <ContentBlockTitle>Facture</ContentBlockTitle>
        <List form>
          <ListItem>
            <FormLabel>Date</FormLabel>
            <Input name="invoiceDate" onChange={this.handleInputChange} type="date" />
          </ListItem>
          <ListItem>
            <FormLabel>Numéro</FormLabel>
            <Input defaultValue={this.state.data.invoiceNumber} name="invoiceNumber" onChange={this.handleInputChange} />
          </ListItem>
          <ListItem>
            <FormLabel>Objet</FormLabel>
            <Input defaultValue={this.state.data.invoiceObject} name="invoiceObject" onChange={this.handleInputChange} />
          </ListItem>
          <ListItem>
            <FormLabel>Info. légales</FormLabel>
            <Input defaultValue={this.state.data.legalInfos} name="legalInfos" onChange={this.handleInputChange} />
          </ListItem>
          {isCustomer &&
          <ListItem>
            <FormLabel>Theme</FormLabel>
            <Select value={this.state.data.theme} name="theme" onChange={this.handleInputChange} >
              <option value="base">Base</option>
              <option value="openSans">OpenSans</option>
            </Select>
          </ListItem>
          }
        </List>

        <ContentBlockTitle>Mon entreprise</ContentBlockTitle>
        <List form>
          <ListItem>
            <FormLabel>Nom</FormLabel>
            <Input defaultValue={this.state.data.companyName} name="companyName" onChange={this.handleInputChange} />
          </ListItem>
          <ListItem>
            <FormLabel>Adresse</FormLabel>
            <Input defaultValue={this.state.data.companyAdress} name="companyAdress" onChange={this.handleInputChange} />
          </ListItem>
          <ListItem>
            <FormLabel>Téléphone</FormLabel>
            <Input defaultValue={this.state.data.companyPhone} name="companyPhone" onChange={this.handleInputChange} />
          </ListItem>
          <ListItem>
            <FormLabel>Email</FormLabel>
            <Input defaultValue={this.state.data.companyMail} name="companyMail" onChange={this.handleInputChange} />
          </ListItem>
          <ListItem>
            <FormLabel>Statut social</FormLabel>
            <Input defaultValue={this.state.data.companyType} name="companyType" onChange={this.handleInputChange} />
          </ListItem>
          <ListItem>
            <FormLabel>Capital</FormLabel>
            <Input defaultValue={this.state.data.companyCapital} name="companyCapital" onChange={this.handleInputChange} />
          </ListItem>
          <ListItem>
            <FormLabel>Num. de TVA</FormLabel>
            <Input defaultValue={this.state.data.companyVatNumber} name="companyVatNumber" onChange={this.handleInputChange} />
          </ListItem>
          <ListItem>
            <FormLabel>SIREN</FormLabel>
            <Input defaultValue={this.state.data.companySiren} name="companySiren" onChange={this.handleInputChange} />
          </ListItem>
        </List>

        <ContentBlockTitle>Mes coordonées bancaire</ContentBlockTitle>
        <List form>
          <ListItem>
            <FormLabel>Banque</FormLabel>
            <Input defaultValue={this.state.data.bankName} name="bankName" placeholder="Nom de la banque" onChange={this.handleInputChange} />
          </ListItem>
          <ListItem>
            <FormLabel>IBAN</FormLabel>
            <Input defaultValue={this.state.data.BankIBAN} name="BankIBAN" onChange={this.handleInputChange} />
          </ListItem>
          <ListItem>
            <FormLabel>BIC</FormLabel>
            <Input defaultValue={this.state.data.BankBIC} name="BankBIC" onChange={this.handleInputChange} />
          </ListItem>
        </List>

        <ContentBlockTitle>Client</ContentBlockTitle>
        <List form>
          <ListItem>
            <FormLabel>Nom</FormLabel>
            <Input defaultValue={this.state.data.clientName} name="clientName" onChange={this.handleInputChange} />
          </ListItem>
          <ListItem>
            <FormLabel>Adresse</FormLabel>
            <Input defaultValue={this.state.data.clientAdress} name="clientAdress" onChange={this.handleInputChange} />
          </ListItem>
          <ListItem>
            <FormLabel>SIREN</FormLabel>
            <Input defaultValue={this.state.data.clientSIREN} name="clientSIREN" onChange={this.handleInputChange} />
          </ListItem>
          <ListItem>
            <FormLabel>TVA intra.</FormLabel>
            <Input defaultValue={this.state.data.clientVAT} name="clientVAT" onChange={this.handleInputChange} />
          </ListItem>
        </List>

        <ContentBlockTitle>Prestation</ContentBlockTitle>
        <List form>
          <ListItem>
            <FormLabel>Description</FormLabel>
            <Input defaultValue={this.state.data.prestationType1} name="prestationType1" placeholder="Ligne 1" onChange={this.handleInputChange} />
          </ListItem>
          <ListItem>
            <FormLabel />
            <Input defaultValue={this.state.data.prestationType2} name="prestationType2" placeholder="Ligne 2" onChange={this.handleInputChange} />
          </ListItem>
          <ListItem>
            <FormLabel>Tarif/jour</FormLabel>
            <Input defaultValue={this.state.data.price} name="price" onChange={this.handleInputChange} />
          </ListItem>
          <ListItem>
            <FormLabel>Nb de jour</FormLabel>
            <Input defaultValue={this.state.data.numberDayOfWork} name="numberDayOfWork" placeholder="Nombre de jour travaillé" onChange={this.handleInputChange} />
          </ListItem>
          <ListItem>
            <FormLabel>Paiement</FormLabel>
            <Input name="paymentPeriod" placeholder="Date limite de paiement" onChange={this.handleInputChange} type="date" />
          </ListItem>
        </List>

        <ContentBlock>
          <Button big fill color="green" onClick={this.createPDF}>Créer la facture</Button>
        </ContentBlock>
      </div>
    );
  }
}
