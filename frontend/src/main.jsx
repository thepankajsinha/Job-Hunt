import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/AuthContext.jsx'
import { CompanyProvider } from './context/CompanyContext.jsx'
import {  JobProvider } from './context/JobContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <JobProvider>
      <CompanyProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </CompanyProvider>
      </JobProvider>
    </BrowserRouter>
  </StrictMode>
);
