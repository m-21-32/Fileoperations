import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import MyComponent from './path/to/MyComponent'; // Adjust the path accordingly.
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Route path="/" exact component={App} />
      <Route path="/my-component" component={MyComponent} />
    </Router>
  </React.StrictMode>
);

reportWebVitals();
