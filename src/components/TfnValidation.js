import React, { useState } from 'react';
import axios from 'axios';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const TfnValidation = () => {
    const [isChecking, setIsChecking] = useState(false);
    const [tfn, setTfn] = useState();
    const [tfnValidityResult, setTfnValidityResult] = useState();
    const handleClick = async () => {
        setIsChecking(true);
        try {
            var isTfnValid = await axios.get(`http://localhost:5000/api/tax/validity/${tfn}`);
            setTfnValidityResult(isTfnValid?.data ? 'Valid' : 'Invalid');
        } catch (err) {
            console.log('TCL: handleClick -> err', err?.response?.data);
        }
        setIsChecking(false);
    };

    const handleInputChange = (e) => {
        const {
            target: { value },
        } = e;
        setTfn(value);
    };

    return (
        <>
            <InputGroup size="lg" className="mb-3">
                <FormControl onChange={handleInputChange} type="number" placeholder="Enter a TFN" aria-label="Enter a TFN" aria-describedby="basic-addon2" />
                <InputGroup.Append>
                    <Button variant="primary" disabled={isChecking} onClick={!isChecking ? handleClick : null}>
                        {isChecking ? 'Checking...' : 'Check'}
                    </Button>
                </InputGroup.Append>
            </InputGroup>
            <p>Result: {tfnValidityResult}</p>
        </>
    );
};

export default TfnValidation;
