import JsPDF from 'jspdf';

const marginLeft = 15;
const marginRight = 195;
const marginTextBottom = 6;
const colTwo = 142;
const colThree = 159;
const footerColOne = 75;
const footerColTwo = footerColOne;

const convertFormat = num => new Intl.NumberFormat('en-EN', { minimumFractionDigits: 2 }).format(num);

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
  doc.text(`${props.input_3}`, marginLeft, topPosition);
  // doc.text(`Code & Smile ${props.input_1}!`, marginLeft, 28);
  doc.setTextColor('#8a8a8a');
  doc.text('FACTURE', marginRight, topPosition, null, null, 'right');

  doc.setTextColor('#383839');
  doc.setFontSize(12);

  newLineHeight(marginTextBottom);
  doc.text(`${props.input_4}`, marginLeft, topPosition);

  newLineHeight(marginTextBottom);
  doc.text(`Tel : ${props.input_5}`, marginLeft, topPosition);

  newLineHeight(marginTextBottom);
  doc.text(`E-mail : ${props.input_6}`, marginLeft, topPosition);

  newLineHeight(marginTextBottom * 2);
  doc.text(`Objet : ${props.input_2}`, marginLeft, topPosition);

  doc.setLineWidth(0.3);
  doc.setDrawColor(184, 184, 184);
  newLineHeight(marginTextBottom);
  doc.line(marginLeft, topPosition, marginRight, topPosition); // x, start y, width, end y

  newLineHeight(marginTextBottom + 2);
  doc.setFont('helvetica', 'bold');
  doc.text('Adressée à :', marginLeft, topPosition);
  doc.text('Facture n° :', marginRight - 28, topPosition, null, null, 'right');
  doc.text(`${props.input_1}`, marginRight, topPosition, null, null, 'right');

  newLineHeight(marginTextBottom);
  doc.setFont('helvetica', 'normal');
  doc.text(`${props.input_12}`, marginLeft, topPosition);
  doc.text('Date :', marginRight - 28, topPosition, null, null, 'right');
  doc.text(`${props.input_0}`, marginRight, topPosition, null, null, 'right');

  newLineHeight(marginTextBottom);
  doc.text(`${props.input_13}`, marginLeft, topPosition);

  newLineHeight(marginTextBottom);
  doc.text(`SIREN : ${props.input_14}`, marginLeft, topPosition);

  newLineHeight(marginTextBottom);
  doc.text(`N° de TVA Intra : ${props.input_15}`, marginLeft, topPosition);

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
  doc.text(`${props.input_16}`, marginLeft, topPosition);
  doc.text(`${convertFormat(props.input_18)} €`, colTwo, topPosition, null, null, 'right');
  doc.text(`${props.input_19}`, colThree, topPosition, null, null, 'right');
  doc.text(`${convertFormat(props.input_18 * props.input_19)} €`, marginRight, topPosition, null, null, 'right');

  newLineHeight(marginTextBottom);
  doc.text(`${props.input_17}`, marginLeft, topPosition);

  newLineHeight(marginTextBottom + 10);
  doc.text('Sous-total H.T.', colThree, topPosition, null, null, 'right');
  doc.text(`${convertFormat(props.input_18 * props.input_19)} €`, marginRight, topPosition, null, null, 'right');

  newLineHeight(marginTextBottom);
  doc.text('T.V.A. 20%', colThree, topPosition, null, null, 'right');
  doc.text(`${convertFormat((props.input_18 * props.input_19) * 0.20)} €`, marginRight, topPosition, null, null, 'right');

  newLineHeight(marginTextBottom);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Total TTC à payer', colThree, topPosition, null, null, 'right');

  doc.text(`${convertFormat((props.input_18 * props.input_19) + ((props.input_18 * props.input_19) * 0.20))} €`, marginRight, topPosition, null, null, 'right');

  newLineHeight(marginTextBottom + 65);
  doc.line(marginLeft, topPosition, marginRight, topPosition); // x, start y, width, end y

  newLineHeight(marginTextBottom);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('Date limite de paiement : ', footerColOne, topPosition, null, null, 'right');
  doc.text(`${props.input_20}`, footerColTwo, topPosition);

  newLineHeight(marginTextBottom);
  doc.text('Mode de paiement : ', footerColOne, topPosition, null, null, 'right');
  doc.text(`- si nécessaire, par chèque à l'ordre de ${props.input_3}`, footerColTwo, topPosition);

  newLineHeight(marginTextBottom);
  doc.text('- de préférence, par virement sur le compte bancaire suivant :', footerColTwo, topPosition);

  newLineHeight(marginTextBottom);
  doc.setDrawColor(56, 56, 57);
  doc.line(marginLeft, topPosition, marginRight, topPosition); // x, start y, width, end y
  doc.line(marginLeft, topPosition, marginLeft, topPosition + 22);
  doc.line(marginRight, topPosition, marginRight, topPosition + 22);

  newLineHeight(marginTextBottom);
  doc.text('Banque  : ', footerColOne, topPosition, null, null, 'right');
  doc.text(`${props.input_9}`, footerColTwo, topPosition);

  newLineHeight(marginTextBottom);
  doc.text('IBAN  : ', footerColOne, topPosition, null, null, 'right');
  doc.text(`${props.input_10}`, footerColTwo, topPosition);

  newLineHeight(marginTextBottom);
  doc.text('BIC  : ', footerColOne, topPosition, null, null, 'right');
  doc.text(`${props.input_11}`, footerColTwo, topPosition);

  doc.line(marginLeft, topPosition + 4, marginRight, topPosition + 4); // x, start y, width, end y

  newLineHeight(marginTextBottom * 1.7);
  const textEnd = 'Aucun escompte pour règlement anticipé.\nEn application de la loi n°92-1442 du 31.12.1992, les factures sont payables à l\'échéance indiquée.\nTout règlement effectué après expiration de ce délai donnera lieu, à titre de pénalité de retard, à l’application d’un intérêt égal à celui appliqué par la Banque Centrale Européenne à son opération de refinancement la plus récente, majoré de 10 points de pourcentage, ainsi qu\'une indemnité forfaitaire de 40 € pour frais de recouvrement.';
  const textLines = doc.setFont('helvetica', 'normal').setFontSize(6.5).splitTextToSize(textEnd, 175);
  doc.text(textLines, marginLeft, topPosition);

  newLineHeight(marginTextBottom * 2.5);
  doc.text(`${props.input_8}`, marginLeft, topPosition);

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
