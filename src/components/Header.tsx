import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';

const Header = ({ isLoggedIn }) => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#services">Послуги</Nav.Link>
            <Nav.Link href="#about">Про систему</Nav.Link>
            <Nav.Link href="#contact">Контакти</Nav.Link>
          </Nav>

          {isLoggedIn && <Nav.Link href="/login">Вийти</Nav.Link>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

  export default Header;