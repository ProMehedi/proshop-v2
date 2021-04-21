import React from 'react'
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'

const Header = () => {
  return (
    <header className='header-wrap'>
      <Navbar
        bg='dark'
        variant='dark'
        expand='lg'
        collapseOnSelect
        className='py-1'
      >
        <Container>
          <Navbar.Brand href='/' className='font-weight-bold'>
            PRO<span className='text-primary'>SHOP</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto align-items-center'>
              <Nav.Link href='/'>
                <i className='fas fa-home'></i> Home
              </Nav.Link>
              <Nav.Link href='/cart'>
                <i className='fas fa-shopping-cart'></i> Cart
              </Nav.Link>
              <Nav.Link href='/login'>
                <Button size='sm'>
                  <i className='fas fa-user'></i> Signin
                </Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
