import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Setting from './pages/Setting';
import Templates from './pages/Templates';
import CreateTemplate from './pages/CreateTemplate';
import { QueryClient, QueryClientProvider } from 'react-query';
import WifiSetting from './pages/WifiSetting';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/wifi-setting" element={<WifiSetting />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/create-template" element={<CreateTemplate />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
