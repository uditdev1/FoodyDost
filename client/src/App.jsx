import { useEffect } from 'react'
import AppRoutes from './AppRoutes.jsx';
import Header from './components/Header/Header.jsx';
import Loading from './components/Loading/Loading.jsx';
import { useLoading } from './components/Hooks/useLoading.jsx';
import {setLoadingInterceptor }  from "./components/Interceptors/LoadingInterceptor.jsx";
import SmallDisplayTitle from './components/SmallDisplayTitle/SmallDisplayTitle.jsx';
import Footer from './components/Footer/Footer.jsx';
import "./App.css";

function App() {
  const {showLoading , hideLoading} = useLoading();
  useEffect ( () => {
    setLoadingInterceptor({hideLoading, showLoading});
  }, []);
  
  return (
    <>
      <Loading/>
      <SmallDisplayTitle/>
      <Header/>
      <AppRoutes/>
      <Footer/>
    </>
  )
}

export default App
