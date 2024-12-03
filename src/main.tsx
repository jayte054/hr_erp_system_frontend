import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AdminProvider } from './context/authenticationContext/adminContext.tsx'
import { EmployeeProvider } from './context/authenticationContext/employeeContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AdminProvider>
    <EmployeeProvider>
      <App />
    </EmployeeProvider>
    </AdminProvider>
  </React.StrictMode>,
)
