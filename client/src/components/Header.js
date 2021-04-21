import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'

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
          <LinkContainer to='/'>
            <Navbar.Brand className='font-weight-bold'>
              PRO<span className='text-primary'>SHOP</span>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto align-items-center'>
              <LinkContainer to='/'>
                <Nav.Link>
                  <i className='fas fa-home'></i> Home
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/login'>
                <Nav.Link>
                  <Button size='sm'>
                    <i className='fas fa-user'></i> Signin
                  </Button>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
