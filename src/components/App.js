import React from 'react';
import { Button, Card, Row, Input, Col } from 'react-materialize';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: JSON.parse(localStorage.getItem('data')) || {},
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.createPDF = this.createPDF.bind(this);
  }

  handleInputChange(e) {
    this.state.data[e.target.id] = e.target.value;
    localStorage.setItem('data', JSON.stringify(this.state.data));
  }

  createPDF() {
    // alert(`PDF : ${JSON.stringify(this.state.data)}`);
    window.cordova.plugins.pdf.htmlToPDF({
      url: 'http://www.google.fr',
      documentSize: 'A4',
      landscape: 'portrait',
      type: 'share',
    }, (success) => this.success, (error) => this.error
    // }, (sucess) => alert('sucess: ' + sucess), (error) => alert('error:' + error)
    );
  }

  render() {
    return (
      <div>
        <h2 className="center-align">Création d&apos;une facture</h2>
        <Row>
          <Col s={12}>

            <div className="center-align">
              <Button onClick={this.createPDF}>Créer la facture</Button>
            </div>
            <Card title="Informations">
              <Row>
                <Input type="date" label="Date" s={12} />
                <Input label="Numéro de facture" s={12} defaultValue={this.state.data.input_1} onChange={this.handleInputChange} />
                <Input label="Objet de la facture" s={12} defaultValue={this.state.data.input_2} onChange={this.handleInputChange} />
              </Row>
            </Card>

            <Card title="Mon entreprise">
              <Row>
                <Input label="Nom" s={12} defaultValue={this.state.data.input_3} onChange={this.handleInputChange} />
                <Input label="Adresse" s={12} defaultValue={this.state.data.input_4} onChange={this.handleInputChange} />
                <Input label="Téléphone" s={12} defaultValue={this.state.data.input_5} onChange={this.handleInputChange} />
                <Input label="Email" s={12} type="email" defaultValue={this.state.data.input_6} onChange={this.handleInputChange} />
                <Input label="SIREN" s={12} defaultValue={this.state.data.input_7} onChange={this.handleInputChange} />
                <Input label="Informations légales" s={12} defaultValue={this.state.data.input_8} onChange={this.handleInputChange} />
              </Row>
            </Card>

            <Card title="Coordonnées bancaire de mon entreprise">
              <Row>
                <Input label="Nom de la banque" s={12} defaultValue={this.state.data.input_9} onChange={this.handleInputChange} />
                <Input label="IBAN" s={12} defaultValue={this.state.data.input_10} onChange={this.handleInputChange} />
                <Input label="BIC" s={12} defaultValue={this.state.data.input_11} onChange={this.handleInputChange} />
              </Row>
            </Card>

            <Card title="Client">
              <Row>
                <Input label="Nom" s={12} defaultValue={this.state.data.input_12} onChange={this.handleInputChange} />
                <Input label="Adresse" s={12} defaultValue={this.state.data.input_13} onChange={this.handleInputChange} />
                <Input label="SIREN" s={12} defaultValue={this.state.data.input_14} onChange={this.handleInputChange} />
                <Input label="Numéro de TVA intracommunautaire" s={12} defaultValue={this.state.data.input_15} onChange={this.handleInputChange} />
              </Row>
            </Card>

            <Card title="Prestation">
              <Row>
                <Input label="Description (ligne 1)" s={12} defaultValue={this.state.data.input_16} onChange={this.handleInputChange} />
                <Input label="Description (ligne 2)" s={12} defaultValue={this.state.data.input_17} onChange={this.handleInputChange} />
                <Input label="Tarif journalier" s={12} defaultValue={this.state.data.input_18} onChange={this.handleInputChange} />
                <Input label="Nombre de jour travaillé" s={12} defaultValue={this.state.data.input_19} onChange={this.handleInputChange} />
                <Input label="Date limite de paiement" s={12} defaultValue={this.state.data.input_20} onChange={this.handleInputChange} />
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
