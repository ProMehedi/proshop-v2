import React from 'react'
import { Container } from 'react-bootstrap'
import { Route, Switch } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import HomePage from './pages/HomePage'

const App = () => {
  return (
    <>
      <Header />
      <main className='py-5'>
        <Container>
          <Switch>
            <Route exact path='/' component={HomePage} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
