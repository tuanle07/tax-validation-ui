import './Home.css';

import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';

const Home = ({ history }) => {
  const [isChecking, setIsChecking] = useState(false);
  const [tfn, setTfn] = useState();
  const [tfnValidityResult, setTfnValidityResult] = useState();
  const [attempts, setAttempts] = useState([]);

  const linkedTfns = (tfn) => {
    attempts.filter((tfn) => (tfn.tfn = 0));
  };

  const handleClick = async () => {
    if (!tfn) {
      return;
    }
    setAttempts([...attempts, { tfn, timeStamp: new Date() }]);
    setIsChecking(true);
    try {
      const isTfnValid = await axios.get(`http://localhost:5000/api/tax/validity/${tfn}`);
      setTfnValidityResult(isTfnValid?.data ? 'Valid TFN' : 'Invalid TFN');
    } catch (err) {
      history.push('/error');
      setTfnValidityResult(err?.response?.data);
    }
    setIsChecking(false);
  };

  const handleInputChange = (e) => {
    const { value } = e?.target;
    setTfn(value);
  };

  return (
    <>
      <h1 className="display-4">TFN Validation Tool</h1>
      <p className="lead">
        This is a simple TFN validation tool which has been built in order to check if an entered
        TFN is valid or not based on the Australian Tax Office’s (ATO) algorithms.
      </p>
      <div className="mt-5">
        <InputGroup size="lg" className="mb-3">
          <FormControl
            onChange={handleInputChange}
            type="number"
            placeholder="Enter a TFN"
            aria-label="Enter a TFN"
            aria-describedby="basic-addon2"
          />
          <InputGroup.Append>
            <Button
              variant="primary"
              disabled={isChecking || !tfn}
              onClick={!isChecking ? handleClick : null}
            >
              {isChecking ? (
                <Spinner
                  className="spinner"
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                'Validate'
              )}
            </Button>
          </InputGroup.Append>
          <div
            className={
              tfnValidityResult === 'Valid TFN' ? 'result text-success' : 'result text-danger'
            }
          >
            {tfnValidityResult}
          </div>
        </InputGroup>
      </div>
    </>
  );
};

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Home);
