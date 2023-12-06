
import React, { useState,  useRef } from "react"
import { Link, useParams, useNavigate, json } from "react-router-dom";

import AlertMessage from "./AlertMessage";
 function Dashboard(props) {
      const navigate = useNavigate();
      const tokenStr = localStorage.getItem("token");
      var name = "";
      var email = "";
      if(tokenStr){
        var userData = JSON.parse(tokenStr);
        name = userData.fullName;
        email = userData.email;
      }

      function logout(){
        localStorage.removeItem("token");
        navigate("/")
      }

      return (

        <div className="container mt-5">
    
        <div className="row d-flex justify-content-center">
            
            <div className="col-md-7">
                
                <div className="card p-3 py-4">
                    
                    <div className="text-center">
                        <img src="https://avatars.githubusercontent.com/u/5007881?v=4" width="100" className="rounded-circle"/>
                    </div>
                    
                    <div className="text-center mt-3">
                        <span className="bg-secondary p-1 px-4 rounded text-white">Pro</span>
                        <h5 className="mt-2 mb-0">{name}</h5>
                        <span>{email}</span>
                        
                        <div className="px-4 mt-1">
                            <p className="fonts">Bank Alfalh Limited</p>
                        
                        </div>
                        
                         <ul className="social-list">
                            <li><i className="fa fa-facebook"></i></li>
                            <li><i className="fa fa-dribbble"></i></li>
                            <li><i className="fa fa-instagram"></i></li>
                            <li><i className="fa fa-linkedin"></i></li>
                            <li><i className="fa fa-google"></i></li>
                        </ul>
                        
                        <div className="buttons">
                            
                            <button className="btn btn-outline-primary px-4">Message</button>
                            <button className="btn btn-danger px-4 ms-3" onClick={logout}>Logout</button>
                        </div>
                        
                        
                    </div>
                    
                   
                    
                    
                </div>
                
            </div>
            
        </div>
        
    </div>
  
      )
   
   
}

export default Dashboard;