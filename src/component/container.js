import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Detail from './Detail';
import Container from '@mui/material/Container';
import './container.css';

export default function FixedContainer() {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container className='mainContainer'>
                <Detail />
            </Container>
        </React.Fragment>
    );
}