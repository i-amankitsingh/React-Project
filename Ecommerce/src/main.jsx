import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import Home from './assets/components/Home/Home.jsx'
import Root from './Root.jsx'
import ProductDetails from './assets/components/ProductDatils.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import SignUp from './assets/components/SignUp.jsx'
import Login from './assets/components/Login.jsx'
import Cart from './assets/components/Cart.jsx'
import { fetchProduct } from './assets/components/Cart.jsx'
import Wishlist from './assets/components/Wishlist.jsx'
import AboutUs from './assets/components/About.jsx'
import Shop from './assets/components/Shop.jsx'
import Sales from './assets/components/Sales.jsx'
import ContactUs from './assets/components/ContactUs.jsx'
import Order from './assets/components/OrderPage/Order.jsx'
import Payment from './assets/components/OrderPage/Payment.jsx'
import Account from './assets/components/Account/Account.jsx'




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />} >
      <Route path='' element={<Home />} />
      <Route path='product-details/:id' element={<ProductDetails />} />
      <Route path='wishlist/:uid' element={<Wishlist />} />
      <Route loader={fetchProduct} path='cart/:uid' element={<Cart />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='login' element={<Login />} />
      <Route path='about' element={<AboutUs />} />
      <Route path='shop' element={<Shop />} />
      <Route path='sale' element={<Sales />} />
      <Route path='contact' element={<ContactUs />} />
      <Route path='order' element={<Order />} />
      <Route path='payment' element={<Payment />} />
      <Route path='account' element={<Account />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
