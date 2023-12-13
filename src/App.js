
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Auth from "./Auth"
import ForgotPassword from "./ForgotPassword"
import SetPassword from "./SetPassword"
import Dashboard from "./Dashboard"
import EmployeesList from "./EmployeesList"
import NavBar from "./NavBar"
import EmployeeDetails from "./EmployeeDetails"


function App() {
  return (
   
    <BrowserRouter>
     <NavBar />
    
      <Routes>

        <Route path="/" element={<Auth />} />
        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/setpassword/:email" element={<SetPassword/>}/>
        <Route path="/employeeslist" element={<EmployeesList />} />
        <Route path="/employee/:id" element={<EmployeeDetails/>}/>
        <Route
             path="*"
             element={<Navigate to="/" />}
             />
      </Routes>

     
    </BrowserRouter>
  
    
  )
}

export default App