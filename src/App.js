
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Auth from "./Auth"
import ForgotPassword from "./ForgotPassword"
import SetPassword from "./SetPassword"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Auth />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/setpassword/:email" element={<SetPassword/>}/>
        <Route
             path="*"
             element={<Navigate to="/" />}
             />
      </Routes>

     
    </BrowserRouter>
  )
}

export default App