import React, { ReactNode, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Setting from './pages/Setting';
import Templates from './pages/Templates';
import CreateTemplate from './pages/CreateTemplate';
import { QueryClient, QueryClientProvider } from 'react-query';
import WifiSetting from './pages/WifiSetting';
import axios from 'axios';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [isLoginRequired, setIsLoginRequired] = useState(false);

  useEffect(() => {
    const fetchPrinterInfo = async () => {
      try {
        const response = await axios.get('/printer/authentication_required');
        setIsLoginRequired(response.data !== 'true');
      } catch (error) {
        console.error('Error fetching printer info', error);
      }
    };

    fetchPrinterInfo();
  }, []);


  function ProtectedRoute({ children } : { children: ReactNode }) {
    const token = localStorage.getItem('aivwa-printer-auth-token');
    console.log(isLoginRequired, token)
    if (isLoginRequired && !token) {
      return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/wifi-setting" element={<ProtectedRoute><WifiSetting /></ProtectedRoute>} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/setting" element={<ProtectedRoute><Setting /></ProtectedRoute>} />
          <Route path="/templates" element={<ProtectedRoute><Templates /></ProtectedRoute>} />
          <Route path="/create-template" element={<ProtectedRoute><CreateTemplate /></ProtectedRoute>} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
