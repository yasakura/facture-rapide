import React from 'react';
import { Button, Card, Row, Input, Col } from 'react-materialize';

const App = () => (
  <div>
    <h2 className="center-align">Création d&apos;une facture</h2>
    <Row>
      <Col s={12}>
        <Card title="Informations">
          <Row>
            <Input type="date" label="Date" s={12} />
            <Input label="Numéro de facture" s={12} />
            <Input label="Objet de la facture" s={12} />
          </Row>
        </Card>

        <Card title="Mon entreprise">
          <Row>
            <Input label="Nom" s={12} />
            <Input label="Adresse" s={12} />
            <Input label="Téléphone" s={12} />
            <Input label="Email" s={12} type="email" />
            <Input label="SIREN" s={12} />
            <Input label="Informations légales" s={12} />
          </Row>
        </Card>

        <Card title="Coordonnées bancaire de mon entreprise">
          <Row>
            <Input label="Nom de la banque" s={12} />
            <Input label="IBAN" s={12} />
            <Input label="BIC" s={12} />
          </Row>
        </Card>

        <Card title="Client">
          <Row>
            <Input label="Nom" s={12} />
            <Input label="Adresse" s={12} />
            <Input label="SIREN" s={12} />
            <Input label="Numéro de TVA intracommunautaire" s={12} />
          </Row>
        </Card>

        <Card title="Prestation">
          <Row>
            <Input label="Description (ligne 1)" s={12} />
            <Input label="Description (ligne 2)" s={12} />
            <Input label="Tarif journalier" s={12} />
            <Input label="Nombre de jour travaillé" s={12} />
            <Input label="Date limite de paiement" s={12} />
          </Row>
        </Card>

        <div className="center-align">
          <Button>Créer la facture</Button>
        </div>
      </Col>
    </Row>
  </div>
);

export default App;
