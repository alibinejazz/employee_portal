
import React, { useState,  useRef } from "react"
import { Link, useParams, useNavigate } from "react-router-dom";

import AlertMessage from "./AlertMessage";
 function SetPassword(props) {
    
   const navigate = useNavigate();
    const signupPassword = useRef("");
    const signupOTP = useRef("");
    let { email } = useParams();
   
    let [error, setError] = useState("")
    let [successMessage, setSuccessMessage] = useState("")

    
    const handleSubmit = (event) => {
        event.preventDefault();
        validateEmail(event, signupPassword.current?.value, signupOTP.current?.value);
    
      }

      function gotoLogin(){

      }

    
      function validateEmail(event, pass, code){

        const payload = {
            username : email,
            password: pass,
            otp: code
        };

        fetch('http://localhost:8080/api/auth/resetpassword', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload),
                    })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.error(responseJson);
                        if(responseJson.message.includes("Error")){
                          setError(responseJson.message)
                          setSuccessMessage("")
                        }else if(responseJson.hasOwnProperty("error")){
                          setError(responseJson.error)
                          setSuccessMessage("")
                        }else{
                          setSuccessMessage(responseJson.message)
                          setError("")
                          setTimeout(()=>{
                            navigate(`/`,{email:email});
                           } , 3000);
                        }
                       
                    
                    })
                    .catch((error) => {
                        console.error(error);
                        setError(error);
                        setSuccessMessage("")
                
                    });
      }

        
      return (
    
        <>
    
        <div className="Auth-form-container">
           
          <form className="Auth-form" onSubmit={handleSubmit}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Set Passowrd</h3>
              <div className="text-center">
                
              <Link to="/">Back to Sign In</Link>
               

                {successMessage  != "" ?  <AlertMessage message={successMessage} variant="success" heading="Alert!" /> : ""}
                {error != "" ? <AlertMessage message={error} variant="danger" heading="Alert!" /> : ""}
        

              </div>
              <div className="form-group mt-3">
                <label>New Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Password"
                  ref={signupPassword}
                />
              </div>

              <div className="form-group mt-3">
                <label>OTP</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  maxLength="4" 
                  size="4"
                  placeholder="OTP"
                  ref={signupOTP}
                />
              </div>
            
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            
            </div>
          </form>
        </div>
        </>
      )
   
   
}

export default SetPassword;