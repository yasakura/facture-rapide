// import React from 'react';
// import ReactDOM from 'react-dom';
import 'framework7/css/framework7.css';
import 'framework7/css/framework7.ios.min.css';
// // import 'framework7/dist/css/framework7.ios.colors.min.css';
import './assets/css/custom.css';
// import App from './components/App';

// ReactDOM.render(<App />, document.getElementById('app'));

// app.js

// Import React
import React from 'react';

// Import ReactDOM
import ReactDOM from 'react-dom';

// Import F7 Bundle
import Framework7 from 'framework7/framework7.esm.bundle';

// Import F7-React Plugin
import Framework7React from 'framework7-react';
import App from './components/App';

// Init F7-React Plugin
Framework7.use(Framework7React);

// Import Main App component

// Mount React App
ReactDOM.render(React.createElement(App), document.getElementById('app'));
