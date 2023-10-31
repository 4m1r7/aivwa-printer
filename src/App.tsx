import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Setting from './pages/Setting';
import Templates from './pages/Templates';
import CreateTemplate from './pages/CreateTemplate';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
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
