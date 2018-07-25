import React from 'react' // eslint-disable-line
import { render } from 'react-dom';
import routes from './routes/';

global._babelPolyfill = false;

render(routes, document.getElementById('root'));