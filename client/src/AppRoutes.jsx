import React from 'react'
import HomePage from './Pages/Home/HomePage'
import {Routes , Route} from "react-router-dom";
import FoodPage from './Pages/Food/FoodPage.jsx';
import CartPage from './Pages/Cart/CartPage';
import Login from './Pages/Login/Login';
import RegisterPage from './Pages/Register/RegisterPage';
import CheckoutPage from "./Pages/Checkout/CheckoutPage.jsx";
import AuthRoute from './components/AuthRoute/AuthRoute.jsx';
import PaymentPage from './Pages/Payment/PaymentPage.jsx';
import OrderTrack from './Pages/OrderTrack/OrderTrack.jsx';
import ProfilePage from './Pages/Profile/ProfilePage.jsx';
import OrdersPage from './Pages/Orders/OrdersPage.jsx';
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import UserEditPage from './Pages/UserEdit/UserEditPage.jsx';
import UsersPage from './Pages/UsersPage/UsersPage.jsx';
import FoodEditPage from './Pages/FoodEdit/FoodEditPage.jsx';
import FoodsAdminPage from './Pages/FoodsAdmin/FoodsAdminPage.jsx';
import AdminRoute from './components/AdminRoute/AdminRoute.jsx';
import EmailVerification from './Pages/EmailVerification/EmailVerification.jsx';
import LandingPage from './Pages/LandingPage/LandingPage.jsx';
import NotFound from './components/NotFound/NotFound.jsx';

export default function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/search/:searchTerm" element={<HomePage/>}/>
        <Route path="/tag/:tag" element={<HomePage />} />
        <Route path="/food/:id" element={<FoodPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/checkout" 
          element={
            <AuthRoute>
              <CheckoutPage />
            </AuthRoute>
          } 
        />
        <Route path="/payment" 
          element={
            <AuthRoute>
              <PaymentPage />
            </AuthRoute>
          } 
        />
        <Route path="/track/:orderId" 
          element={
            <AuthRoute>
              <OrderTrack />
            </AuthRoute>
          } 
        />
        <Route path="/profile" 
          element={
            <AuthRoute>
              <ProfilePage />
            </AuthRoute>
          } 
        />
        <Route path="/orders/:filter?" 
          element={
            <AuthRoute>
              <OrdersPage />
            </AuthRoute>
          } 
        />
        <Route path="/dashboard" 
          element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          } 
        />
        <Route
          path="/admin/foods/:searchTerm?"
        element={
          <AdminRoute>
            <FoodsAdminPage/>
          </AdminRoute>
        }
      />

      <Route
        path="/admin/addFood"
        element={
          <AdminRoute>
            <FoodEditPage/>
          </AdminRoute>
        }
      />
      <Route
        path="/admin/editFood/:foodId"
        element={
          <AdminRoute>
            <FoodEditPage/>
          </AdminRoute>
        }
      />
      <Route
        path="/admin/users/:searchTerm?"
        element={
          <AdminRoute>
            <UsersPage/>
          </AdminRoute>
        }
      />

      <Route
        path="/admin/editUser/:userId"
        element={
          <AdminRoute>
            <UserEditPage/>
          </AdminRoute>
        }
      />
      <Route path="/email_verification" element={<EmailVerification />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
