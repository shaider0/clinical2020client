import React from 'react'
// import { Link } from 'react-router-dom'

import './Header.scss'
import { Navbar, Nav } from 'react-bootstrap'

const unauthenticatedOptions = (
  <React.Fragment>
    <Nav.Link href="#/sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#/sign-in">Sign In</Nav.Link>
  </React.Fragment>
)

const authenticatedOptions = (
  <React.Fragment>
    <Nav.Link href="#/patients">Patients</Nav.Link>
    <Nav.Link href="#/payments">Payments</Nav.Link>
    <Nav.Link href="#/change-password">Change Password</Nav.Link>
    <Nav.Link href="#/sign-out">Sign Out</Nav.Link>
  </React.Fragment>
)

const Header = ({ user }) => (
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand href="#/">Clinical 2020</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
      </Nav>
      <Nav>
        <Nav.Link href="#/about">About</Nav.Link>
        { user ? authenticatedOptions : unauthenticatedOptions}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)
export default Header
