import JsPDF from 'jspdf';

const Pdf = (props) => {
  const doc = new JsPDF({
    orientation: 'p',
    unit: 'mm',
    format: 'a4',
  });
  // Page size A4 : 210 x 297
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(20);
  doc.setTextColor(56, 56, 57);

  doc.text(`Code & Smile`, 15, 20);
  // doc.text(`Code & Smile ${props.input_1}!`, 15, 28);
  doc.setTextColor('#8a8a8a');
  doc.text('FACTURE', 195, 20, null, null, 'right');

  doc.setTextColor('#383839');
  doc.setFontSize(12);
  doc.text(`88 Rue de chatillon, 92140 Clamart`, 15, 26);
  doc.text(`Tel : +33 (0)7 56 93 40 50`, 15, 32);
  doc.text(`E-mail : freelance@ljamal.net`, 15, 38);

  doc.text(`Objet : Prestation de développements informatiques`, 15, 48);

  doc.setLineWidth(0.3);
  doc.setDrawColor(184,184,184);
  doc.line(15, 58, 195, 58); // x, start y, width, end y

  doc.setFont('helvetica', 'bold');
  doc.text('Adressé à :', 15, 65);
  doc.setFont('helvetica', 'normal');
  doc.text(`CROSSQUANTUM`, 15, 71);

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
