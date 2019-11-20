import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavbarBrand from 'react-bootstrap/NavbarBrand'

export default class Navigation extends Component {
  render () {
    return (
      <Navbar fixed='top' expand="sm" collapseOnSelect bg='dark' variant='dark'>
          <NavbarBrand>
            Sanontaharjoitus
          </NavbarBrand>
          <Navbar.Toggle aria-controls='quote-navbar-nav' />
          <Navbar.Collapse id='quote-navbar-nav'>
              <Nav className="mr-auto">
            <Nav.Item>
              <Nav.Link eventKey={1} as={Link} to='/'>
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={2} as={Link} to='/quotes'>
                QuoteList
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={3} as={Link} to='/form'>
                QuoteForm
              </Nav.Link>
            </Nav.Item>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
    )
  }
}
