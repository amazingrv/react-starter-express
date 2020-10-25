import './styles.css';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { HashRouter as Router } from 'react-router-dom';
import Routes from './Routes';

const mountNode = document.querySelector('#app');

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>,
  mountNode
);

// webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept();
}
