import React, { useState, useEffect } from 'react';
import Header from './Header.tsx';
import MenuBar from './MenuBar.tsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Notification = () => {
  return (
    <>
      <Header />
      <Container className="mx-0 px-0 h-100">
      <Row>
        <Col sm={2} className='min-vh-100'>
        <MenuBar />
        </Col>
        <Col sm={8}>
        <div>
        <h1>Нагадування</h1>
        </div>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default Notification;