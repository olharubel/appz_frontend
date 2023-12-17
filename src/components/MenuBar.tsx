import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaHome, FaCog, FaPoll, 
    FaBell, FaComment } from 'react-icons/fa'; 

const MenuBar = () => {
  return (
    <div className='h-100 bg-light'>
         <Navbar bg="light" className="flex-column">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="flex-column">
          <Nav.Item>
            <NavLink to="/" className="nav-link">
              <FaHome className="mr-2" /> Кабінет
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/surveys" className="nav-link">
              <FaPoll className="mr-2" /> Опитування
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/notifications" className="nav-link">
              <FaBell className="mr-2" /> Нагадування
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/diagnosis" className="nav-link">
              <FaComment className="mr-2" /> Коментарі лікаря
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/settings" className="nav-link">
              <FaCog className="mr-2" /> Налаштування
            </NavLink>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </div>
   
  );
};

export default MenuBar;
