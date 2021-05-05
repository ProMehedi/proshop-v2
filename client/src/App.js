import React from 'react'
import { Container } from 'react-bootstrap'
import { Route, Switch } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import CartPage from './pages/CartPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProductPage from './pages/ProductPage'

const App = () => {
  return (
    <>
      <Header />
      <main className='py-5'>
        <Container>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/product/:id' component={ProductPage} />
            <Route path='/cart/:id?' component={CartPage} />
            <Route path='/login' component={LoginPage} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
