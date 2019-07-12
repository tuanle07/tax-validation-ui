import './Home.css';

import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import getAllSubstrings from '../../utils/getAllSubstrings';

const Home = ({ history }) => {
    const [isChecking, setIsChecking] = useState(false);
    const [tfn, setTfn] = useState();
    const [tfnValidityResult, setTfnValidityResult] = useState();
    const [attempts, setAttempts] = useState([]);

    const getLinkedTfns = () => {
        const last30sTFNs = attempts.filter((t) => (new Date() - t.timeStamp) / 1000 <= 30).reduce((acc, v) => acc.concat(v.tfn.toString()), []);
        const foundLinkedTfns = [];
        // find all the linked TFN with the current input
        const tfnStrs = getAllSubstrings(tfn, 4);
        const linkedTfns = last30sTFNs.filter((a) => tfnStrs.some((s) => a.indexOf(s) >= 0));
        foundLinkedTfns.push(...linkedTfns);

        // find all the deeper-linked TFNs
        foundLinkedTfns.forEach((linkedTfn) => {
            const linkedTfnStrs = getAllSubstrings(linkedTfn, 4);
            const deepLinkedTfns = last30sTFNs.filter((t) => !foundLinkedTfns.includes(t) && linkedTfnStrs.some((s) => t.indexOf(s) >= 0));
            foundLinkedTfns.push(...deepLinkedTfns);
        });

        return foundLinkedTfns.length;
    };

    const isValidTfnFormat = () => {
        if (!tfn) {
            return false;
        }
        if (tfn < 0) {
            setTfnValidityResult('TFN cannot be a negative');
            return false;
        }
        if (tfn.toString().length !== 8 && tfn.toString().length !== 9) {
            setTfnValidityResult('TFN must be 8 or 9 digits long');
            return false;
        }
        return true;
    };

    const handleClick = async () => {
        if (!isValidTfnFormat()) {
            return;
        }
        if (getLinkedTfns() >= 2) {
            history.push('/error');
        }
        setAttempts([...attempts, { tfn, timeStamp: new Date() }]);
        setIsChecking(true);
        try {
            const isTfnValid = await axios.get(`http://localhost:5000/api/tax/validity/${tfn}`);
            setTfnValidityResult(isTfnValid?.data ? 'Valid TFN' : 'Invalid TFN');
        } catch (err) {
            setTfnValidityResult(err?.response?.data);
        }
        setIsChecking(false);
    };

    const handleInputChange = (e) => {
        setTfnValidityResult('');
        const { value } = e?.target;
        setTfn(value);
    };

    const getValidityResultClassName = () => {
        if (!tfnValidityResult) return null;
        if (tfnValidityResult === 'Valid TFN') {
            return 'result text-success';
        }
        return 'result text-danger';
    };

    return (
        <>
            <h1 className="display-4">TFN Validation Tool</h1>
            <p className="lead">
                This is a simple TFN validation tool which has been built in order to check if an entered TFN is valid or not based on the Australian
                Tax Office’s (ATO) algorithms.
            </p>
            <div className="mt-5">
                <InputGroup size="lg" className="mb-3">
                    <FormControl
                        onChange={handleInputChange}
                        type="number"
                        min="1"
                        step="1"
                        placeholder="Enter a TFN"
                        aria-label="Enter a TFN"
                        aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                        <Button variant="primary" disabled={isChecking || !tfn} onClick={!isChecking ? handleClick : null}>
                            {isChecking ? (
                                <Spinner className="spinner" as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                            ) : (
                                'Validate'
                            )}
                        </Button>
                    </InputGroup.Append>
                    <div className={getValidityResultClassName()}>{tfnValidityResult}</div>
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
