import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import { ConfigProvider } from 'antd';

const container = document.getElementById('host');
if (container) {
  ReactDOM.createRoot(container).render(
    <ConfigProvider
      theme={{
        components: {
          Input: {
            borderRadius: 0,
          },
          InputNumber: {
            borderRadius: 0,
          },
          Select: {
            borderRadius: 0,
          },
          DatePicker: {
            borderRadius: 0,
          }
        },
      }}
    >
      <StrictMode>
        <App />
      </StrictMode>

    </ConfigProvider>

  );
}