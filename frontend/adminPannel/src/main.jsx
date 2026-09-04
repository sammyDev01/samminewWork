import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter as Router} from 'react-router-dom'
import AdminContextProvider from './context/adminContext.jsx'
import DoctorContextProvider from './context/doctorContext.jsx'
import AppProviderContext from './context/appContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AdminContextProvider>
        <DoctorContextProvider>
          <AppProviderContext>
            <App />
          </AppProviderContext>
        </DoctorContextProvider>
      </AdminContextProvider>
    </Router>
  </StrictMode>,
)
