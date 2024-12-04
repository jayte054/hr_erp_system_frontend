import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { LandingPage } from './pages/landingPage/landingPage'
import { AuthenticationPage } from './pages/authenticationPage/authenticationPage'
import { AdminPage } from './pages/adminPage/adminPage'
import { EmployeePage } from './pages/employeePage/employeePage'

function App() {

  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/authentication" element={<AuthenticationPage />} />
            <Route path="/adminPage" element={<AdminPage />} />
            <Route path="/employeePage" element={<EmployeePage />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
