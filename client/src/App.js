import React from 'react'
import { Container } from 'react-bootstrap'
import { Route, Switch } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import CartPage from './pages/CartPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import OrderPage from './pages/OrderPage'
import PaymentMethodPage from './pages/PaymentMethodPage'
import PlaceOrderPage from './pages/PlaceOrderPage'
import ProductPage from './pages/ProductPage'
import ProfilePage from './pages/ProfilePage'
import RegisterPage from './pages/RegisterPage'
import ShippingPage from './pages/ShippingPage'
import UserListPage from './pages/admin/UserListPage'
import EditUserPage from './pages/admin/EditUserPage'
import ProductListPage from './pages/admin/ProductListPage'
import NewProductPage from './pages/admin/NewProductPage'
import EditProductPage from './pages/admin/EditProductPage'
import OrderListPage from './pages/admin/OrderListPage'
import OrderDetailsPage from './pages/admin/OrderDetailsPage'

const App = () => {
  return (
    <>
      <Header />
      <main className='py-5'>
        <Container>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/search/:query' component={HomePage} />
            <Route
              path='/search/:query/page/:pageNumber'
              component={HomePage}
            />
            <Route path='/page/:pageNumber' component={HomePage} />
            <Route path='/product/:id' component={ProductPage} />
            <Route path='/cart/:id?' component={CartPage} />
            <Route exact path='/profile' component={ProfilePage} />
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/register' component={RegisterPage} />
            <Route path='/shipping' component={ShippingPage} />
            <Route path='/payment' component={PaymentMethodPage} />
            <Route path='/placeorder' component={PlaceOrderPage} />
            <Route path='/order/:id' component={OrderPage} />
            <Route exact path='/admin/users' component={UserListPage} />
            <Route path='/admin/user/:id' component={EditUserPage} />
            <Route exact path='/admin/products' component={ProductListPage} />
            <Route
              path='/admin/products/page/:pageNumber'
              component={ProductListPage}
            />
            <Route path='/admin/product/:id/edit' component={EditProductPage} />
            <Route exact path='/admin/product/new' component={NewProductPage} />
            <Route exact path='/admin/orders' component={OrderListPage} />
            <Route exact path='/admin/order/:id' component={OrderDetailsPage} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
