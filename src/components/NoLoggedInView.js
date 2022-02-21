import React from 'react';
import { Col, Image, Row, Container } from 'react-bootstrap';

import notLoggedInImage from '../assets/undraw_Login_re_4vu2.png'

function NoLoggedInView(props) {
    return (
        <>
            <Container>
                <Row className="align-items-center">
                    <Col>
                        <Image src={`${notLoggedInImage}`} style={{ width: '80%' }} />
                    </Col>
                    <Col>
                        <h1>Login Required</h1>
                        <p>You're not logged in. Please <a href="/login">login</a> first as this access is limited.</p>
                    </Col>
                </Row>
            </Container>

        </>
    );
}

export default NoLoggedInView;