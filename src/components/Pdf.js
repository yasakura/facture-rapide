import {
  Base,
  OpenSans,
} from './themes';

const Pdf = (props) => {
  let test = null;
  switch (props.theme) {
    case 'openSans':
      test = OpenSans(props);
      break;
    default:
      test = Base(props);
      break;
  }

  return test;
};

export default Pdf;
