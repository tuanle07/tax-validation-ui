import React from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import TfnValidation from './components/TfnValidation';
import './App.css';

function App() {
    return (
        <Jumbotron className="appContainer">
            <Container>
                <h1>TFN Validation Tool</h1>
                <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                <div className="mt-5">
                    <TfnValidation />
                </div>
            </Container>
        </Jumbotron>
    );
}

export default App;
