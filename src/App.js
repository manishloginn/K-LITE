// import logo from './logo.svg';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Flex, Spin } from 'antd';


import './App.css';
import { LoadingOutlined } from '@ant-design/icons';


const Home = lazy(() => import('./component/home/Home.js'))
const Dashboard = lazy(() => import('./component/dashboard/Dashboard.js'))
const SideNavbar = lazy(() => import('./component/sidenavbar/SideNavbar.js'))
const TopNav = lazy(() => import('./component/topnav/TopNav.js'))
const Login = lazy(() => import('./component/login/Login.js'))
const LoginDashboard = lazy(() => import('./component/logindashboard/LoginDashboard.js'))


const LazyLoaderComponent = ({ Component }) => {
  return (
    <Suspense
      fallback={
        <Flex
          style={{ display: 'flex', width: '100vw', height: '100vh', justifyContent: 'center' }}
          align="center"
          gap="middle"
        >
          <Spin indicator={<LoadingOutlined style={{ fontSize: 70 }} spin />} />
        </Flex>
      }
    >
      <Component />
    </Suspense>
  );
};


const NotFound = () => {
  return <div>Page Not Found - 404</div>;
};

const AppContent = () => {

  const location = useLocation();
  const isLoginPath = location.pathname === '/login' || location.pathname === "/" || location.pathname === "/sellers" || location.pathname === "/products" ;

  // console.log(isLoginPath)
  // console.log(location.pathname)

  return (
    <div className="main-container">
      {!isLoginPath && <SideNavbar />}
      <div className='content-container'>
      {!isLoginPath && <TopNav />}
        <div className="dashboard-content">
          <Routes>
            <Route path="/" element={<LazyLoaderComponent Component={Home} />} />
            <Route path="/seller/dashboard" element={<LazyLoaderComponent Component={Dashboard} />} />
            <Route path="/login" element={<LazyLoaderComponent Component={Login} />} />
            <Route
              path="/user/logindashboard"
              element={<LazyLoaderComponent Component={LoginDashboard} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>

    </div>
  );
};




function App() {
  return (
    <div className="App ">
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  );
}

export default App;
