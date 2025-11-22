import React from 'react';
import { ConfigProvider } from 'antd';
import EmployeeDashboard from './components/EmployeeDashboard';
import 'antd/dist/reset.css';

const App: React.FC = () => {
  return (
    <ConfigProvider>
      <div className="App">
        <EmployeeDashboard />
      </div>
    </ConfigProvider>
  );
};

export default App;
