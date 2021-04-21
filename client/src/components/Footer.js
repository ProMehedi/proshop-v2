import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className='footer-wrap bg-dark text-light'>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            Copyright &copy; 2021. All right reserverd PROSHOP. Developed by{' '}
            <a href='http://promehedi.com' target='_blank' rel='noreferrer'>
              Mehedi Hasan
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
