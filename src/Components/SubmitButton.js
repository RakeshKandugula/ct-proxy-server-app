import React from 'react';
import { Button } from 'react-bootstrap';

const SubmitButton = ({ onClick }) => {
  return (
    <Button variant="primary" onClick={onClick} className="w-100">
      Upload File
    </Button>
  );
};

export default SubmitButton;
