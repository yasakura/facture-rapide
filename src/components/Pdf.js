import {
  Base,
  OpenSans,
} from './themes';

const Pdf = (props) => {
  let pdfBase64 = null;
  switch (props.theme) {
    case 'openSans':
      pdfBase64 = OpenSans(props);
      break;
    default:
      pdfBase64 = Base(props);
      break;
  }

  return pdfBase64;
};

export default Pdf;
