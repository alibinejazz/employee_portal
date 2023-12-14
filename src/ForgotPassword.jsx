
import React, { useState,  useRef } from "react"
import { Link, useNavigate } from "react-router-dom";
import AlertMessage from "./AlertMessage";
import Config from "./Config";
 function ForgotPassword(props) {
    

    const signinEmail = useRef("");
   
    let [error, setError] = useState("")
    let [successMessage, setSuccessMessage] = useState("")
    const navigate = useNavigate();

    
    const handleSubmit = (event) => {
        event.preventDefault();
        validateEmail(event, signinEmail.current?.value);
    
      }

      function gotoLogin(){

      }

    
      function validateEmail(event, email){

        const payload = {
            username : email,
        };
        const url = new Config().baseUrl+"auth/resetpassword";
        fetch(url, {
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
                          navigate(`/setpassword/${email}`,{email:email});
                          setError("")
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
              <h3 className="Auth-form-title">Forgot passowrd?</h3>
              <div className="text-center">
                
              <Link to="/">Back to Sign In</Link>
               

                {successMessage  != "" ?  <AlertMessage message={successMessage} variant="success" heading="Alert!" /> : ""}
                {error != "" ? <AlertMessage message={error} variant="danger" heading="Alert!" /> : ""}
        

              </div>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                  ref={signinEmail}
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

export default ForgotPassword;