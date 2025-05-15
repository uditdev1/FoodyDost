import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "./axiosConfig.js";
import { AuthProvider } from './components/Hooks/useAuth.jsx';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from 'react-router-dom'
import CartProvider from './components/Hooks/useCart.jsx'
import { LoadingProvider } from './components/Hooks/useLoading.jsx';
import "./components/Interceptors/AuthInterceptor.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <div className=' min-h-svh pb-2 w-screen bg-gradient-to-tr from-[#eda6a6] via-white'>
    <BrowserRouter >
      <LoadingProvider>
        <AuthProvider>
          <CartProvider>
            <App />
            <ToastContainer
              position='bottom-right' autoClose={5000} hideProgressBar={false}
              newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable 
              pauseOnHover theme='light'
            />
          </CartProvider>
        </AuthProvider>
      </LoadingProvider>
    </BrowserRouter>  
    </div>
  </>,
)
