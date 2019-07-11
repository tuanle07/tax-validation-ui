import './App.css';

import React from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Error from './components/Error/Error';
import Home from './components/Home/Home';

const App = () => (
  <Jumbotron className="appContainer">
    <Container>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/error" component={Error} />
        </Switch>
      </Router>
    </Container>
  </Jumbotron>
);

export default App;
