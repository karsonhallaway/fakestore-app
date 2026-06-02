import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

export default function ErrorMessage({ message }) {

    const [show, setShow ] = useState(true);
    
    return (
        show && 
        <Alert variant="danger" 
            dismissible show={show} 
            onClose={() => setShow(false)}
        >
            {message}
        </Alert>
    );
}