import JsPDF from 'jspdf';

const marginLeft = 15;
const marginRight = 195;
const marginTextBottom = 6;
const colTwo = 142;
const colThree = 159;
const footerColOne = 75;
const footerColTwo = footerColOne;

const Pdf = (props) => {
  let topPosition = 0;

  const newLineHeight = (numberMarginTop) => {
    topPosition += numberMarginTop;
    return topPosition;
  };

  const doc = new JsPDF({
    orientation: 'p',
    unit: 'mm',
    format: 'a4',
    lineHeight: 1.3,
  });
  // Page size A4 : 210 x 297
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(20);
  doc.setTextColor(56, 56, 57);

  newLineHeight(20);
  doc.text(`Code & Smile`, marginLeft, topPosition);
  // doc.text(`Code & Smile ${props.input_1}!`, marginLeft, 28);
  doc.setTextColor('#8a8a8a');
  doc.text('FACTURE', marginRight, topPosition, null, null, 'right');

  doc.setTextColor('#383839');
  doc.setFontSize(12);

  newLineHeight(marginTextBottom);
  doc.text(`88 Rue de chatillon, 92140 Clamart`, marginLeft, topPosition);

  newLineHeight(marginTextBottom);
  doc.text(`Tel : +33 (0)7 56 93 40 50`, marginLeft, topPosition);

  newLineHeight(marginTextBottom);
  doc.text(`E-mail : freelance@ljamal.net`, marginLeft, topPosition);

  newLineHeight(marginTextBottom * 2);
  doc.text(`Objet : Prestation de développements informatiques`, marginLeft, topPosition);

  doc.setLineWidth(0.3);
  doc.setDrawColor(184, 184, 184);
  newLineHeight(marginTextBottom);
  doc.line(marginLeft, topPosition, marginRight, topPosition); // x, start y, width, end y

  newLineHeight(marginTextBottom + 2);
  doc.setFont('helvetica', 'bold');
  doc.text('Adressée à :', marginLeft, topPosition);
  doc.text('Facture n° :', marginRight - 28, topPosition, null, null, 'right');
  doc.text('CS2017-010', marginRight, topPosition, null, null, 'right');

  newLineHeight(marginTextBottom);
  doc.setFont('helvetica', 'normal');
  doc.text(`CROSSQUANTUM`, marginLeft, topPosition);
  doc.text('Date :', marginRight - 28, topPosition, null, null, 'right');
  doc.text('26/10/2017', marginRight, topPosition, null, null, 'right');

  newLineHeight(marginTextBottom);
  doc.text('7 rue Belgrand, 92300 Levallois-Perret', marginLeft, topPosition);

  newLineHeight(marginTextBottom);
  doc.text('SIREN : 814 770 855 R.C.S. Nanterre', marginLeft, topPosition);

  newLineHeight(marginTextBottom);
  doc.text('N° de TVA Intra : FR71 814770855', marginLeft, topPosition);

  newLineHeight(marginTextBottom * 2);
  doc.setDrawColor(56, 56, 57);
  doc.line(marginLeft, topPosition, marginRight, topPosition); // x, start y, width, end y
  doc.setFont('helvetica', 'bold');
  doc.text('Description', marginLeft, topPosition + 5);
  doc.text('Tarif unitaire', colTwo, topPosition + 5, null, null, 'right');
  doc.text('Qté', colThree, topPosition + 5, null, null, 'right');
  doc.text('Montant H.T.', marginRight, topPosition + 5, null, null, 'right');

  doc.line(marginLeft, topPosition + 7, marginRight, topPosition + 7); // x, start y, width, end y

  newLineHeight(marginTextBottom + 6);
  doc.setFont('helvetica', 'normal');
  doc.text('Mission CROSSQUANTUM - Lionel JAMAL', marginLeft, topPosition);
  doc.text('530.00 €', colTwo, topPosition, null, null, 'right');
  doc.text('16.5', colThree, topPosition, null, null, 'right');
  doc.text('8,745.00 €', marginRight, topPosition, null, null, 'right');

  newLineHeight(marginTextBottom);
  doc.text('Du 01/10/2017 au 31/10/2017', marginLeft, topPosition);

  newLineHeight(marginTextBottom + 10);
  doc.text('Sous-total H.T.', colThree, topPosition, null, null, 'right');
  doc.text('8,745.00 €', marginRight, topPosition, null, null, 'right');

  newLineHeight(marginTextBottom);
  doc.text('T.V.A. 20%', colThree, topPosition, null, null, 'right');
  doc.text('1,749.00 €', marginRight, topPosition, null, null, 'right');

  newLineHeight(marginTextBottom);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Total TTC à payer', colThree, topPosition, null, null, 'right');
  doc.text('10,494.00 €', marginRight, topPosition, null, null, 'right');

  newLineHeight(marginTextBottom + 65);
  doc.line(marginLeft, topPosition, marginRight, topPosition); // x, start y, width, end y

  newLineHeight(marginTextBottom);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('Date limite de paiement : ', footerColOne, topPosition, null, null, 'right');
  doc.text('15/10/2017', footerColTwo, topPosition);

  newLineHeight(marginTextBottom);
  doc.text('Mode de paiement : ', footerColOne, topPosition, null, null, 'right');
  doc.text('- si nécessaire, par chèque à l\'ordre de Code & Smile', footerColTwo, topPosition);

  newLineHeight(marginTextBottom);
  doc.text('- de préférence, par virement sur le compte bancaire suivant :', footerColTwo, topPosition);

  newLineHeight(marginTextBottom);
  doc.setDrawColor(56, 56, 57);
  doc.line(marginLeft, topPosition, marginRight, topPosition); // x, start y, width, end y
  doc.line(marginLeft, topPosition, marginLeft, topPosition + 22);
  doc.line(marginRight, topPosition, marginRight, topPosition + 22);

  newLineHeight(marginTextBottom);
  doc.text('Banque  : ', footerColOne, topPosition, null, null, 'right');
  doc.text('BNPPARB PLESSIS ROBINSON', footerColTwo, topPosition);

  newLineHeight(marginTextBottom);
  doc.text('IBAN  : ', footerColOne, topPosition, null, null, 'right');
  doc.text('FR76 3000 4002 8100 0100 9113 805', footerColTwo, topPosition);

  newLineHeight(marginTextBottom);
  doc.text('BIC  : ', footerColOne, topPosition, null, null, 'right');
  doc.text('BNPA FR PP XXX', footerColTwo, topPosition);

  doc.line(marginLeft, topPosition + 4, marginRight, topPosition + 4); // x, start y, width, end y

  newLineHeight(marginTextBottom * 1.7);
  const textEnd = 'Aucun escompte pour règlement anticipé.\nEn application de la loi n°92-1442 du 31.12.1992, les factures sont payables à l\'échéance indiquée.\nTout règlement effectué après expiration de ce délai donnera lieu, à titre de pénalité de retard, à l’application d’un intérêt égal à celui appliqué par la Banque Centrale Européenne à son opération de refinancement la plus récente, majoré de 10 points de pourcentage, ainsi qu\'une indemnité forfaitaire de 40 € pour frais de recouvrement.';
  const textLines = doc.setFont('helvetica', 'normal').setFontSize(6.5).splitTextToSize(textEnd, 175);
  doc.text(textLines, marginLeft, topPosition);

  newLineHeight(marginTextBottom * 2.5);
  doc.text('Code & Smile, SARL au capital de 1 000 € - N° TVA intracommunautaire : FR 75 822985172 - SIREN : 822 985 172 R.C.S. Nanterre', marginLeft, topPosition);

  if (window.cordova) {
    // For save iPhone :
    return doc.output('datauri');
  }
  // For test browser
  return doc.output('dataurlnewwindow');

  // For save Browser :
  // return doc.save('toto.pdf');
};

export default Pdf;
