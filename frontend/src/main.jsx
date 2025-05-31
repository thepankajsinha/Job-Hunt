import App from './App.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/AuthContext.jsx'
import { CompanyProvider } from './context/CompanyContext.jsx'
import {  JobProvider } from './context/JobContext.jsx'
import { ApplicationProvider } from './context/ApplicationContext.jsx';
import { ApplicantProvider } from './context/ApplicantContext.jsx';
import './index.css'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ApplicantProvider>
        <ApplicationProvider>
          <JobProvider>
            <CompanyProvider>
              <AuthProvider>
                <App />
              </AuthProvider>
            </CompanyProvider>
          </JobProvider>
        </ApplicationProvider>
      </ApplicantProvider>
    </BrowserRouter>
  </StrictMode>
);
