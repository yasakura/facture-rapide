import JsPDF from 'jspdf-customfonts';
import CustomFonts from '../../assets/default_vfs';

// eslint-disable-next-line consistent-return
const OpenSans = (props) => {
  CustomFonts(JsPDF.API);

  const marginLeft = 15;
  const marginRight = 195;
  const marginTextBottom = 6;
  const colTwo = 142;
  const colThree = 159;
  const footerColOne = 85;
  const footerColTwo = footerColOne;

  const convertFormat = (num) =>
    new Intl.NumberFormat('en-EN', { minimumFractionDigits: 2 }).format(num);

  let topPosition = 0;

  const newLineHeight = (numberMarginTop) => {
    topPosition += numberMarginTop;
    return topPosition;
  };

  function getVatRate() {
    return props.companyVatActive
      ? props.price * props.numberDayOfWork * (props.companyVatRate / 100)
      : 0;
  }

  function getPriceTotal() {
    return convertFormat(props.price * props.numberDayOfWork + getVatRate());
  }

  const doc = new JsPDF({
    orientation: 'p',
    unit: 'mm',
    format: 'a4',
    lineHeight: 1.5,
  });

  function splitTextToSize(text, size) {
    return doc.splitTextToSize(text, size);
  }

  doc.addFileToVFS('../assets/default_vfs.js');
  doc.addFont('OpenSans-Light.ttf', 'OpenSans', 'lighter');
  doc.addFont('OpenSans-Regular.ttf', 'OpenSans', 'normal');
  doc.addFont('OpenSans-SemiBold.ttf', 'OpenSans', 'bold');

  // Page size A4 : 210 x 297
  doc.setFont('OpenSans', 'normal');
  doc.setFontSize(20);
  doc.setTextColor(56, 56, 57);

  newLineHeight(20);
  doc.text(`${props.companyName}`, marginLeft, topPosition);
  doc.setTextColor('#8a8a8a');
  doc.text('FACTURE', marginRight, topPosition, null, null, 'right');

  doc.setFont('OpenSans', 'lighter');
  doc.setTextColor('#383839');
  doc.setFontSize(11);

  newLineHeight(marginTextBottom);
  doc.text(`${props.companyAddress}`, marginLeft, topPosition);

  newLineHeight(marginTextBottom);
  doc.text(`Tel : ${props.companyPhone}`, marginLeft, topPosition);

  newLineHeight(marginTextBottom);
  doc.text(`E-mail : ${props.companyMail}`, marginLeft, topPosition);

  newLineHeight(marginTextBottom * 2);
  doc.text(`Objet : ${props.invoiceObject}`, marginLeft, topPosition);

  doc.setLineWidth(0.3);
  doc.setDrawColor(184, 184, 184);
  newLineHeight(marginTextBottom);
  doc.line(marginLeft, topPosition, marginRight, topPosition); // x, start y, width, end y

  newLineHeight(marginTextBottom + 2);
  doc.setFont('OpenSans', 'bold');
  doc.text('Adressée à :', marginLeft, topPosition);
  doc.text('Facture n° :', marginRight - 28, topPosition, null, null, 'right');
  doc.text(
    `${props.invoiceNumber}`,
    marginRight,
    topPosition,
    null,
    null,
    'right'
  );

  newLineHeight(marginTextBottom);
  doc.setFont('OpenSans', 'lighter');
  doc.text(`${props.clientName}`, marginLeft, topPosition);
  doc.text('Date :', marginRight - 28, topPosition, null, null, 'right');
  doc.text(
    `${props.invoiceDate}`,
    marginRight,
    topPosition,
    null,
    null,
    'right'
  );

  newLineHeight(marginTextBottom);
  doc.text(`${props.clientAddress}`, marginLeft, topPosition);

  newLineHeight(marginTextBottom);
  doc.text(`SIREN : ${props.clientSIREN}`, marginLeft, topPosition);

  newLineHeight(marginTextBottom);
  doc.text(`N° de TVA Intra : ${props.clientVAT}`, marginLeft, topPosition);

  newLineHeight(marginTextBottom);
  doc.setDrawColor(56, 56, 57);
  doc.line(marginLeft, topPosition, marginRight, topPosition); // x, start y, width, end y
  doc.setFont('OpenSans', 'bold');
  doc.text('Description', marginLeft, topPosition + 5);
  doc.text('Tarif unitaire', colTwo, topPosition + 5, null, null, 'right');
  doc.text('Qté', colThree, topPosition + 5, null, null, 'right');
  doc.text('Montant H.T.', marginRight, topPosition + 5, null, null, 'right');

  doc.line(marginLeft, topPosition + 7, marginRight, topPosition + 7); // x, start y, width, end y

  newLineHeight(marginTextBottom + 6);
  doc.setFont('OpenSans', 'lighter');
  // const lines = doc.splitTextToSize(`${props.prestationType}`, 100);
  doc.text(
    splitTextToSize(`${props.prestationType}`, 100),
    marginLeft,
    topPosition
  );
  doc.text(
    `${convertFormat(props.price)} €`,
    colTwo,
    topPosition,
    null,
    null,
    'right'
  );
  doc.text(
    `${props.numberDayOfWork}`,
    colThree,
    topPosition,
    null,
    null,
    'right'
  );
  doc.text(
    `${convertFormat(props.price * props.numberDayOfWork)} €`,
    marginRight,
    topPosition,
    null,
    null,
    'right'
  );

  newLineHeight(marginTextBottom + 10);
  doc.text(
    `Sous-total ${props.companyVatActive ? 'T.T.C' : 'H.T.'}`,
    colThree,
    topPosition,
    null,
    null,
    'right'
  );
  doc.text(
    `${convertFormat(props.price * props.numberDayOfWork)} €`,
    marginRight,
    topPosition,
    null,
    null,
    'right'
  );

  newLineHeight(marginTextBottom);
  if (props.companyVatActive) {
    doc.text(
      `T.V.A. ${props.companyVatRate} %`,
      colThree,
      topPosition,
      null,
      null,
      'right'
    );
    doc.text(
      `${convertFormat(
        props.price * props.numberDayOfWork * (props.companyVatRate / 100)
      )} €`,
      marginRight,
      topPosition,
      null,
      null,
      'right'
    );
  }

  newLineHeight(marginTextBottom);
  doc.setFontSize(14);
  doc.setFont('OpenSans', 'bold');
  doc.text(
    `Total ${props.companyVatActive ? 'T.T.C' : 'H.T.'} à payer`,
    colThree,
    topPosition + 2,
    null,
    null,
    'right'
  );

  doc.text(
    `${getPriceTotal()} €`,
    marginRight,
    topPosition + 2,
    null,
    null,
    'right'
  );

  if (!props.companyVatActive) {
    newLineHeight(marginTextBottom + 1);
    doc.setFont('OpenSans', 'lighter');
    doc.setFontSize(7);
    doc.text(
      splitTextToSize(`${props.companyVatExemptionText}`, 78),
      // props.companyVatExemptionText,
      118,
      topPosition,
      null,
      null,
      'left'
    );
  }

  newLineHeight(marginTextBottom + 81);
  doc.line(marginLeft, topPosition, marginRight, topPosition); // x, start y, width, end y

  newLineHeight(marginTextBottom);
  doc.setFont('OpenSans', 'lighter');
  doc.setFontSize(9);
  doc.text(
    'Date limite de paiement : ',
    footerColOne,
    topPosition,
    null,
    null,
    'right'
  );
  doc.text(`${props.paymentPeriod}`, footerColTwo, topPosition);

  newLineHeight(marginTextBottom);
  doc.text(
    'Mode de paiement : ',
    footerColOne,
    topPosition,
    null,
    null,
    'right'
  );
  // doc.text(
  //   `- si nécessaire, par chèque à l'ordre de ${props.companyName}`,
  //   footerColTwo,
  //   topPosition
  // );

  // newLineHeight(marginTextBottom);
  doc.text(
    'par virement sur le compte bancaire suivant :',
    footerColTwo,
    topPosition
  );

  newLineHeight(marginTextBottom);
  doc.setDrawColor(56, 56, 57);
  doc.line(marginLeft, topPosition, marginRight, topPosition); // x, start y, width, end y
  doc.line(marginLeft, topPosition, marginLeft, topPosition + 16);
  doc.line(marginRight, topPosition, marginRight, topPosition + 16);

  newLineHeight(4);
  doc.text('Banque  : ', footerColOne, topPosition, null, null, 'right');
  doc.text(`${props.bankName}`, footerColTwo, topPosition);

  newLineHeight(5);
  doc.text('IBAN  : ', footerColOne, topPosition, null, null, 'right');
  doc.text(`${props.BankIBAN}`, footerColTwo, topPosition);

  newLineHeight(5);
  doc.text('BIC  : ', footerColOne, topPosition, null, null, 'right');
  doc.text(`${props.BankBIC}`, footerColTwo, topPosition);

  doc.line(marginLeft, topPosition + 2, marginRight, topPosition + 2); // x, start y, width, end y

  newLineHeight(marginTextBottom * 1.7);
  const textEnd =
    "Aucun escompte pour règlement anticipé.\nEn application de la loi n°92-1442 du 31.12.1992, les factures sont payables à l'échéance indiquée.\nTout règlement effectué après expiration de ce délai donnera lieu, à titre de pénalité de retard, à l’application d’un intérêt égal à celui appliqué par la Banque Centrale Européenne à son opération de refinancement la plus récente, majoré de 10 points de pourcentage, ainsi qu'une indemnité forfaitaire de 40 € pour frais de recouvrement.";
  const textLines = doc
    .setFont('OpenSans', 'lighter')
    .setFontSize(6)
    .splitTextToSize(textEnd, 175);
  doc.text(textLines, marginLeft, topPosition);

  newLineHeight(marginTextBottom * 2.5);
  doc.text(
    `${props.companyName}, ${props.companyType}${
      props.companyCapital !== ''
        ? ` au capital de ${props.companyCapital} € - `
        : ''
    }${
      props.companyVatNumber !== ''
        ? `N° TVA intracommunautaire : ${props.companyVatNumber} - `
        : ''
    }SIREN : ${props.companySiren} ${
      props.companyRCS !== '' ? `R.C.S. ${props.companyRCS}` : ''
    }`,
    marginLeft,
    topPosition
  );

  if (window.cordova) {
    // For save iPhone :
    return doc.output('datauri');
  }

  // For save Browser :
  return doc.save('toto.pdf');
};

export default OpenSans;
