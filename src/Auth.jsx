
import React, { useState,  useRef, useEffect } from "react"
import { Outlet, Link, useNavigate } from "react-router-dom";
import AlertMessage from "./AlertMessage";
import Config from "./Config";


 function Auth(props) {

  const tokenStr = localStorage.getItem("token");
  var email = "";


    const navigate = useNavigate();

    

    useEffect(() => {
      if(tokenStr){
        var userData = JSON.parse(tokenStr);
        email = userData.email;
        console.log("User Data: "+ email)
        navigate(`/dashboard`,{email:email});
      }
    },[]);

    let [authMode, setAuthMode] = useState("signin")

    const signinEmail = useRef("");
    const signinPassword = useRef("");


    const signupEmail = useRef("");
    const signupName = useRef("");

    let [error, setError] = useState("")
    let [successMessage, setSuccessMessage] = useState("")

    const changeAuthMode = () => {
      setAuthMode(authMode === "signin" ? "signup" : "signin")
        setError("");
        setSuccessMessage("")
    }

    const handleLogin = (event) => {
        event.preventDefault();
        loginApi(event, signinEmail.current?.value, signinPassword.current?.value);
    
      }

      const handleSignup = (event) => {
        event.preventDefault();
        signupApi(event,signupName.current?.value, signupEmail.current?.value)
      }

      function loginApi(event, email, pass){

        const payload = {
            username : email,
            password : pass
        };

        const url = new Config().baseUrl+"auth/signin";

        fetch(url, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json'},
                        body: JSON.stringify(payload),
                     
                    })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.error(responseJson);
                       if(responseJson.hasOwnProperty("status")){
                            setError(responseJson.message)
                            setSuccessMessage("")
                       }else{
                        setSuccessMessage("Login Success!")
                        localStorage.setItem("token", JSON.stringify(responseJson))
                        setTimeout(()=>{
                          navigate(`/dashboard`,{email:email});
                         } , 2000);
                        setError("")
                       }
                       
                        event.target.reset();
                    })
                    .catch((error) => {
                        console.error(error);
                        setError(error);
                        setSuccessMessage("")
                        event.target.reset();
                    });
      }

      function signupApi(event, name, mail){

        const payload = {
            fullName: name,
            username: mail,
            email: mail,
            role: ["mod", "user"]
        };

        const url = new Config().baseUrl+"auth/signup";

        fetch(url, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload),
                    })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.error(responseJson);
                        event.target.reset();
                        if(responseJson.hasOwnProperty("status") || responseJson.message.includes("Error")){
                            setError(responseJson.message)
                            setSuccessMessage("")
                       }else{
                           setSuccessMessage("")
                           setError("")
                           setTimeout(()=>{
                            navigate(`/setpassword/${mail}`,{email:mail});
                           } , 1000);
                           
                       }
                        
                       
                    })
                    .catch((error) => {
                        console.error(error);
                        setError(error)
                        setSuccessMessage("")
                        event.target.reset();
                   
                    });
      }
  
    if (authMode === "signin") {
        
      return (
    
        <>
        
      
    
        <div className="Auth-form-container">
           
          <form className="Auth-form" onSubmit={handleLogin}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              <div className="text-center">
                Not registered yet?{" "}
                <span className="link-primary" onClick={changeAuthMode}>
                  Sign Up
                </span>

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

              <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Password"
                ref={signinPassword}
              />
            </div>
            
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>

              <p className="text-center mt-2">
                Forgot <Link to="/forgotpassword">Password?</Link>
              </p>
            
            </div>
          </form>
        </div>
        </>
      )
    }
    return (
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSignup}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="text-center">
              Already registered?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign In
              </span>


              {successMessage  != "" ?  <AlertMessage message={successMessage} variant="success" heading="Alert!" /> : ""}
              {error != "" ? <AlertMessage message={error} variant="danger" heading="Alert!" /> : ""}
        

            </div>
            <div className="form-group mt-3">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="e.g Shahjahan Samoon"
                ref={signupName}
              />
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Email Address"
                ref={signupEmail}
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
    )

   
}

export default Auth;